import AssetPool from './asset-pool';

'use strict'

class ModelPool extends AssetPool {

    /** 
     * @class
     * Load model files for custom geometry.
     * Geometry prebuilt
     * http://paulbourke.net/geometry/roundcube/
     * @constructor
     * @param {Boolean} init if true, initialize immediately.
     * @param {Util} util reference to utility methods.
     * @param {WebGL} webgl reference to WebGL object.
     * @param {TexturePool} texture loader and asset pool.
     * @param {MaterialPool} material loader and asset pool.
     */
    constructor ( init, util, webgl, texturePool, materialPool ) {

        console.log( 'in ModelPool' );

        // Initialize superclass.

        super( util );

        this.util = util,

        this.webgl = webgl,

        this.textuerPool = texturePool,

        this.materialPool = materialPool,

        this.modelMimeTypes = {

            'obj': 'text/plain',

            'mtl': 'text/plain',

            'html': 'text/html',      // A-Frame?

            'x3d': 'model/x3d+xml',   // X3DOM

            'x3dv': 'model/x3d-vrml'  // VRML

        };

        if ( init ) {

            // do something

        }

    }

    /** 
     * Extract 3d vertex data (vertices, normals) from a string.
     * @param {String} data string to be parsed for 3d coordinate values.
     * @param {Array} arr the array to add the coordinate values to.
     * @param {Number} lineNum the current line in the file.
     */
    computeObj3d ( data, arr, lineNum ) {

        let vs = data.match( /^(-?\d+(\.\d+)?)\s*(-?\d+(\.\d+)?)\s*(-?\d+(\.\d+)?)/ );

        arr.push( parseFloat( vs[ 1 ] ), parseFloat( vs[ 3 ] ), parseFloat( vs[ 5 ] ) );

    }

    /** 
     * Extract 2 vertex data (texture coordinates) from a string.
     * @param {String} data string to be parsed for 3d coordinate values.
     * @param {Array} arr the array to add the coordinate values to.
     * @param {Number} lineNum the current line in the file.
     */
    computeObj2d ( data, arr, lineNum ) {

        let uvs = data.match( /^(-?\d+(\.\d+)?)\s+(-?\d+(\.\d+)?)$/ );
        
        arr.push( parseFloat( uvs[ 1 ] ), parseFloat( uvs[ 3 ] ) );

    }


    /** 
     * Extract index data from a string. At present, indexing of vertices, 
     * texture coordinates, normals is assumed to be the same, so only one 
     * index array is constructed.
     * @param {String} data string to be parsed for indices (integer).
     * @param {Array} indices array for indices into vertex array.
     * @param {Array} lineNum array for vertices (optional).
     * @param {Array} texCoords array for texture coordinates (optional).
     * @param {Array} normals array for normals coordinates (optional).
     */
    computeObjIndices ( data, indices, lineNum, texCoords = [], normals = [] ) {

        let parts = data.match( /[^\s]+/g );

        let idxs, idx, texCoord, normal;

        let NOT_IN_STRING = this.NOT_IN_LIST;

        parts.map( ( fs ) => {

            ///console.log("fs:" + fs)

            // Split indices with and without normals and texture coordinates.

            if ( fs.indexOf( '//' ) !== NOT_IN_STRING ) {

                idxs = fs.split( '//' );

                idx = parseInt( idxs[ 0 ] ) - 1; // NOTE: OBJ first index = 1, our arrays index = 0

                texCoord = 0.0; // NO TEXTURE COORDINATES PROVIDED

                normal = parseInt( idxs[ 1 ] ) - 1;

                ///console.log( '//:' + idx, texCoord, normal );

            } else if ( fs.indexOf ( '/' ) !== NOT_IN_STRING ) {

                idxs = fs.split( '/')

                idx = parseInt( idxs[ 0 ] ) - 1;

                texCoord = parseFloat( idx[ 1 ] ) - 1;

                normal = parseFloat( idx[ 2 ] ) - 1;

                ////console.log( '/:', idx, texCoord, normal );

            } else {

                console.error( 'ModelPool()::computeObjIndices(): illegal index object index statement at line:' + lineNum );

                return false;

            }

            indices.push( idx );

            texCoords.push ( texCoord );

            normals.push( normal );

        } );

    }


    /** 
     * Parse the .obj file into flattened object data
     * @link http://paulbourke.net/dataformats/obj/
     * 
     * @param {String} data the incoming data from the file.
     * @param {Prim} prim the Prim object defined in prim.es6
     * @param {String} path the path to the file. MTL files may reference other files in their directory.
     */
    computeObjMesh ( data, prim, path ) {

        console.log( 'ModelPool::computeObjMesh(): loading a new file:' + path + ' for ' + prim.name );

        let isWhitespace = this.util.isWhitespace,

        vertices = [],

        indices = [],

        texCoords = [],

        normals = [];

        let dir = this.util.getFilePath( path );

        // Get the lines of the file.

        let lineNum = 0;

        let lines = data.split( '\n' );

        let iTexCords = [];

        let iNormals = [];

        lines.forEach( ( line ) => {

            //line = line.trim();

            let type = line.split( ' ' )[ 0 ].trim();

            let data = line.substr( type.length ).trim();

            switch ( type ) {

                case 'o': // object name

                    if ( ! prim.name ) {

                        prim.name = data;

                    }

                    break;

                case 'g': // group name, store hierarchy

                    if ( ! prim.group ) {

                        prim.group = [];

                    }

                    prim.group[ data ] = lineNum;

                    break;

                case 'v': // vertices

                    this.computeObj3d( data, vertices, lineNum );

                    break;

                case 'f': // face, indices

                    this.computeObjIndices( data, indices, lineNum, iTexCords, iNormals );

                    break;

                case 'vn': // normals

                    this.computeObj3d( data, normals, lineNum );

                    break;

                case 'vt': // texture uvs

                    this.computeObj2d( data, texCoords, lineNum );

                    break;

                case 's': // smoothing group (related to 'g')

                    if ( ! prim.smoothingGroup ) {

                        prim.smoothingGroup = []; // TODO: DO STUFF!!!!!!!!!!!!!!!!!!!!!!

                    }

                    if ( data )

                    break;

                case '#': // comment

                    break;

                case 'mtllib': // materials library data

                    // TODO: Load material file data.

                    console.log(":::::::::::::GOTTA MATERIAL FILE IN OBJ FILE: " + data );

                    this.materialPool.getMaterials( prim, [ dir + data ], true );

                    break;

                case 'usemtl': // use material (by name, loaded as .mtl file elsewhere)

                    // TODO: define how to usemtl (keep coordinate start position??????/)

                     console.log("::::::::::::GOTTA USEMTL in OBJ file: " + data );

                    break;

                case 'g': // group name (collection of vertices forming face)

                    // TODO: assign faces (sides in our internal language).

                    // @link https://people.cs.clemson.edu/~dhouse/courses/405/docs/brief-obj-file-format.html

                    break;

                case 'vp': // parameter vertices
                case 'p': // point
                case 'l': // line
                case 'curv': // 2d curve
                case 'surf': //surface
                case 'parm': // parameter values
                case 'trim': // outer trimming loop
                case 'hole': // inner trimming loop
                case 'scrv': //special curve
                case 'sp': // special point
                case 'end': // end statment
                case 'con': // connectivity between free-form surfaces

                case 's': // smoothing group
                case 'mg': // merging group
                case 'bevel': // bevel interpolation
                case 'c_interp': // color interpolation
                case 'd_interp': // dissolve interpolation
                case 'lod': // level of detail
                case 'shadow_obj': // shadow casting
                case 'trace_obj': // ray tracing
                case 'ctech': // curve approximation
                case 'stech': // surface approximation
                case 'mtllib': // materials library data

                    console.warn( 'ModelPool::computeObjMesh(): OBJ data type: ' + type + ' in .obj file not supported' );

                    break;

                default:

                    // If it's not a pure whitespace line, report.

                    if( ! isWhitespace( data ) ) {

                        console.error( 'ModelPool::computeObjMesh(): unknown line data: ' + line + ' in .obj file at line:' + lineNum );

                    }

                    break;

            }

            lineNum++;

        } );


        // NOTE: Colors and tangents are not part of the Wavefront .obj format

        console.log("ModelPool::computeObjMesh(): v:" + (vertices.length /3) + " i:" + (indices.length /3 )+ " t:" + (texCoords.length /2) + " n:" + (normals.length /3))

        // Model object format.

        return {

            vertices: vertices,

            indices: indices,

            texCoords: texCoords,

            normals: normals

        }

    }

    /** 
     * Add a model
     * @param {Prim} prim the requesting Prim object.
     * @param {Object} data data to construct the Prim GeometryBuffer.
     * @param {String} path the file path to the object.
     * @param {Number} pos the index of the object in the calling Prim's array.
     * @param {String} mimeType the MIME type of the file.
     * @param {String} type the GeometryPool.typeList type of the object, e.g. MESH, SPHERE...
     */
    addModel ( prim, data, path, pos, mimeType, type ) {

        let d;

        if ( pos === undefined ) {

            console.error( 'TextureObj::addTexture(): undefined pos' );

            return null;

        }

        let fType = this.util.getFileExtension( path );

        switch ( fType ) {

            case 'obj':

                // Return a Model object.

                d = this.computeObjMesh( data, prim, path );

                // Not supplied by OBJ format.

                d.tangents = [];

                d.colors = [];

                break;

            case 'html': // A-Frame?

                break;

            case 'x3d': // X3DOM

                break;

            case 'x3dv': // VRML

                break;

            default:

                console.warn( 'ModelPool::addModel(): unknown model file:' + path + ' MIME type:' + mimeType );

                break;

        }

        // If we got a valid model, construct the output object for JS.

        if ( d ) {

            /*
             * Model format:
             * {
             *   vertices: vertices,
             *   indices: indices,
             *   texCoords: texCoords,
             *   normals: normals
             * }
            */

            d.type = type,

            d.path = path,

            // Emit the GEOMETRY_READY event with (Mesh) arguments.
            // We don't just return the data since it has to be processed by Prim into a GeometryBuffer.

            this.util.emitter.emit( this.util.emitter.events.GEOMETRY_READY, prim, pos, d );

        } else {

             console.warn( 'TexturePool::addTexture(): no texture returned by createTexture() + ' + mimeType + ' function' );

        }

        return this.addAsset( d );

    }

    /** 
     * Load models, using a list of paths. If a Model already exists, 
     * just return it. Otherwise, do the load.
     * @param {Array[String]} pathList a list of URL paths to load.
     * @param {Boolean} cacheBust if true, add a http://url?random query string to request.
     */
    getModels ( prim, pathList, cacheBust = true ) {

        for ( let i = 0; i < pathList.length; i++ ) {

            let path = pathList[ i ];

            let poolModel = this.pathInList( path );

            if ( poolModel ) {

                prim.models.push( poolModel ); // just reference an existing texture in this pool.

            } else {

                 // Get the image mimeType.

                let mimeType = this.modelMimeTypes[ this.util.getFileExtension( path ) ];

                // check if mimeType is OK.

                if( mimeType ) {

                    this.doRequest( path, i, 

                        ( updateObj ) => {

                            /* 
                             * updateObj returned from GetAssets has the following structure:
                             * { 
                             *   pos: pos, 
                             *   path: requestURL, 
                             *   data: null|response, (Blob, Text, JSON, FormData, ArrayBuffer)
                             *   error: false|response 
                             * } 
                             */

                             if ( updateObj.data ) {

                                this.addModel( prim, updateObj.data, updateObj.path, updateObj.pos, mimeType, prim.type );

                             } else {

                                console.error( 'MaterialPool::getMaterials(): no data found for:' + updateObj.path );

                             }

                        }, cacheBust, mimeType, 0 ); // end of this.doRequest(), initial request at 0 tries

                } else {

                    console.error( 'ModelPool::getModels(): file type "' + this.util.getFileExtension( path ) + ' not supported, not loading' );

                }

            }

        } // end of loop

    }

}

export default ModelPool;