import AssetPool from './asset-pool';

'use strict'

class ModelPool extends AssetPool {

    /** 
     * @class
     * Load model files for custom geometry.
     * Geometry prebuilt
     * http://paulbourke.net/geometry/roundcube/
     * NOTE: GeometryPool adds its geometry objects to this pool, doesn't have its own!
     *
     * @constructor
     * @param {Boolean} init if true, initialize immediately.
     * @param {Util} util reference to utility methods.
     * @param {WebGL} webgl reference to WebGL object.
     * @param {TexturePool} texture loader and asset pool.
     * @param {MaterialPool} material loader and asset pool.
     * @param {PrimFactory} the Prim creation and ''
     */
    constructor ( init, util, webgl, texturePool, materialPool ) {

        console.log( 'in ModelPool' );

        // Initialize superclass.

        super( util );

        this.util = util,

        this.webgl = webgl,

        this.texturePool = texturePool,

        this.materialPool = materialPool,

        this.modelMimeTypes = {

            'obj': 'text/plain',

            'mtl': 'text/plain',

            'html': 'text/html',      // A-Frame?

            'x3d': 'model/x3d+xml',   // X3DOM

            'x3dv': 'model/x3d-vrml'  // VRML

        };

        if ( init ) {

            // Create and store a default Model.

           this.defaultKey = this.addAsset( this.default() ).key;

        }

    }

    /** 
     * Create the default ModelPool object.
     * @param {glMatrix.vec3[]} vertices flattened vertex array.
     * @param {Array} indices index array.
     * @param {glMatrix.vec2[]} texCoords texture coordinates (2D).
     * @param {glMatrix.vec3[]} normals normals array.
     * @param {Array[Number]} objects a list of starts in the index array for new sub-objects.
     * @param {Array[Number]} groups a list of starts in the index array for new groups.
     * @param {Array[Number]} smoothingGroups a list of starts in the index array for smoothing groups.
     * @param {Array[Number]} materials a list of starts for materials in the index array.
     */
    default ( vertices = [], indices = [], texCoords = [], normals = [], objects = [ 0 ], 

        groups = [ 0 ], smoothingGroups = [ 0 ], materials = [] ) {

        return {

            vertices: vertices,

            indices: indices,

            texCoords: texCoords,

            normals: normals,

            tangents: [],  // not supplied by OBJ file format

            // References to sub-regions in the obj file, number = position in vertices.

            options : {

                objects: objects, 

                groups: groups, 

                smoothingGroups: smoothingGroups, 

                materials: materials

            }

        }

    }

    /** 
     * Extract 3d vertex data (vertices, normals) from a string.
     * @param {String} data string to be parsed for 3d coordinate values.
     * @param {Array} arr the array to add the coordinate values to.
     * @param {Number} lineNum the current line in the file.
     * @param {Number} numReturned number of values to returned. In some 
     *                 OBJ files, 3 numbers are written for 2d texture.
     */
    computeObj3d ( data, arr, lineNum ) {

        // TODO: replace with .split() and .parseFloat()????

        let vs = data.match( /^(-?\d+(\.\d+)?)\s*(-?\d+(\.\d+)?)\s*(-?\d+(\.\d+)?)/ );

        if ( vs ) {

                arr.push( parseFloat( vs[ 1 ] ), parseFloat( vs[ 3 ] ), parseFloat( vs[ 5 ] ) );

            return true;

        }

        return false;

    }

    /** 
     * Extract 2 vertex data (texture coordinates) from a string. For some routines, 
     * use the 'return' while others do not.
     * @param {String} data string to be parsed for 3d coordinate values.
     * @param {Array} arr the array to add the coordinate values to.
     * @param {Number} lineNum the current line in the file.
     */
    computeObj2d ( data, arr, lineNum ) {

        let uvs = data.match( /^(-?\d+(\.\d+)?)\s+(-?\d+(\.\d+)?)$/ );

        if ( uvs ) {

            arr.push( parseFloat( uvs[ 1 ] ), parseFloat( uvs[ 3 ] ) );

            return true;

        } else { // check if 2d texture written in 3d(!)

            let uv2 = [];

            if ( this.computeObj3d( data, uv2, lineNum ) ) {

                arr.push( uv2[ 0 ], uv2[ 1 ] );  // only copy the first 2 coordinates          

                return true;

            }

        }

        return false;

    }

    /** 
     * Compute index, with fallback for missing index.
     * @param {Number} num the number to test.
     * @returns {Number} the number, or an error number (-1).
     */
    computeFaceIndex ( num ) {

        if ( ! Number.isFinite( num ) ) {

            console.warn("WEIRD NUM:" + num)

            return this.NOT_IN_STRING;

        }

        return num;

    }

    /** 
     * Compute triangles for Quads and higher polygons (all triangles share the 1st position).
     * Use when the number of faces on a line is > 3 (usually a quad).
     * @param {Array} idxs an array of single numbers, representing start positions in another Array.
     * @returns {Array} an Array, augmented with additional positions converting polygons to a set of triangles.
     */
    computeFaceFan ( idxs ) {

        if ( idxs.length ) {

            let nIdxs = [];

            // For quad, this gives 0, 1, 2, 0, 2, 3.

            for ( let i = 1; i < idxs.length - 1; i++ ) {

                nIdxs.push( idxs[ 0 ], idxs[ i ], idxs[ i + 1 ] );
    
            }

            return nIdxs;

        }

        return idxs;

    }

    /** 
     * Convert the faces xx/xx/xx listing in OBJ files to vertex, texCoord, normal positions in 
     * the other arrays loaded by the OBJ file.
     * f 20/30/22 --> faces[ i ] = [ 20, 30, 22 ]
     * If the face is NOT a triangle, convert higher-order polygon to a set of triangles.
     *
     * @param {String} data the data for an individual face.
     * @param {Array} the face array to append the data to.
     * @param {Number} lineNum the current line number in the OBJ file.
     */
    computeObjFaces ( data, faces, lineNum ) {

        let parts = data.match( /[^\s]+/g );

        let NOT_IN_STRING = this.NOT_IN_LIST;

        let idxs, iVert, iTexCoord, iNormal, iVerts = [], iTexCoords = [], iNormals = [];

        // Each map should refer to one point.

        parts.map( ( fs ) => {

            //console.log("fs:" + fs)

            // Split indices, normals and texture coordinates if they are present.

            if ( fs.indexOf( '//' ) !== NOT_IN_STRING ) { // normals, no texture coordinates

                idxs = fs.split( '//' );

                iVerts.push( parseFloat( idxs[ 0 ] ) - 1 );

                iTexCoords.push( null );

                iNormals.push( parseFloat( idxs[ 1 ] ) - 1 );

            } else if ( fs.indexOf ( '/' ) !== NOT_IN_STRING ) {

                idxs = fs.split( '/' );

                iVerts.push( parseFloat( idxs[ 0 ] ) - 1 );

                if ( idxs.length == 2 ) { // texCoords present

                    iTexCoords.push( parseFloat( idxs[ 1 ] ) - 1 );

                    iNormals.push( null );

                } else if ( idxs.length === 3 ) { // both texCoords and normals present

                    iTexCoords.push( parseFloat( idxs[ 1 ] ) - 1 );

                    iNormals.push( parseFloat( idxs[ 2 ] ) - 1 );

                } 

            } else { // Has indices only

                iVerts.push( parseFloat( fs ) - 1 ); 

            }

        } );

        // Now, convert quads and higher polygons to a set of triangles.

        iVerts = this.computeFaceFan( iVerts );

        iTexCoords = this.computeFaceFan( iTexCoords );

        iNormals = this.computeFaceFan( iNormals );

        // Append to faces array.

        for ( let i = 0; i < iVerts.length; i++ ) {

             faces.push( [ iVerts[ i ], iTexCoords[ i ], iNormals[ i ] ] );

        }

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

        let m = this.default();

        let isWhitespace = this.util.isWhitespace,

        vertices = m.vertices,

        indices = m.indices,

        texCoords = m.texCoords,

        normals = m.normals,

        objMtl = this.util.DEFAULT_KEY,

        objects = m.options.objects, 

        groups = m.options.groups, 

        smoothingGroups = m.options.smoothingGroups, 

        materials = m.options.materials,

        // temp arrays needed to flatten OBJ multi-index format to WebGL format.

        tIndices = [],

        tVertices = [],

        tNormals = [],

        tTexCoords = [],

        iIndices = [],

        iTexCoords = [],

        iNormals = [],

        iHash = [], // associative lookup table for faces (vertices, indices, texCoords);

        faces = [];

        let dir = this.util.getFilePath( path );

        // Get the lines of the file.

        let lineNum = 0,

        lines = data.split( '\n' );

        lines.forEach( ( line ) => {

            // First value in string.

            let type = line.split( ' ' )[ 0 ].trim();

            // All other values as a string.

            let data = line.substr( type.length ).trim();

            // If there's no data, don't process.

            if ( data !== '' ) {

                switch ( type ) {

                    case 'o': // object name (could be several in file)

                        if ( ! prim.name ) {

                            prim.name = data;

                        }

                        objects[ data ] = faces.length; // start position in final flattened array

                        console.log('objects[' + data + '] = ' + faces.length)

                        break;

                    case 'v': // vertices

                        this.computeObj3d( data, tVertices, lineNum );

                        break;

                    case 'f': // face, indices, convert polygons to triangles

                        this.computeObjFaces( data, faces, lineNum );

                        break;

                    case 'vn': // normals

                        this.computeObj3d( data, tNormals, lineNum );

                        break;

                    case 'vt': // texture uvs

                        if ( ! this.computeObj2d( data, tTexCoords, lineNum ) ) {

                            //console.warn( '3D texture encountered:'+ data );

                            this.computeObj3d( data, tTexCoords, lineNum, 2 );

                        }

                        break;

                    case 'mtllib': // materials library data

                        // Multiple files may be specified here, and each file may have multiple materials.

                        let mtls = data.split( ' ' );

                        for ( let i = 0; i < mtls.length; i++ ) {

                            this.materialPool.getMaterials( prim, [ dir + data ], true );

                        }

                        break;

                    case 'usemtl': // use material (by name, loaded as .mtl file elsewhere)

                        if ( ! materials[ data ] ) {

                            materials[ data ] = [];

                        }

                        materials[ data ].push( faces.length );

                        console.log('materials[' + data + '] = ' + faces.length)

                        break;


                    case 'g': // group name, store hierarchy

                        groups[ data ] = faces.length; // starting position in final flattened array

                        console.log('groups[' + data + '] = ' + faces.length );

                        break;

                    case 's': // smoothing group (related to 'g')

                        smoothingGroups[ data ] = faces.length; // starting position in final flattened array

                        console.log('smoothingGroups[' + data + '] = ' + faces.length );

                        // @link https://people.cs.clemson.edu/~dhouse/courses/405/docs/brief-obj-file-format.html

                        break;

                    case '#': // comments are ignored

                        break;

                    case 'maplib': // poorly documented
                    case 'usemap': // ditto
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
                    case 'mg': // merging group
                    case 'bevel': // bevel interpolation
                    case 'c_interp': // color interpolation
                    case 'd_interp': // dissolve interpolation
                    case 'lod': // level of detail
                    case 'shadow_obj': // shadow casting
                    case 'trace_obj': // ray tracing
                    case 'ctech': // curve approximation
                    case 'stech': // surface approximation
                    case '': // no parameter

                        console.warn( 'ModelPool::computeObjMesh(): OBJ data type: ' + type + ' in .obj file not supported' );

                        break;

                    default:

                        // If it's not a pure whitespace line, report.

                        if( ! isWhitespace( data ) ) {

                            console.error( 'ModelPool::computeObjMesh(): unknown line data: ' + line + ' in .obj file at line:' + lineNum );

                        }

                        break;

                } // end of switch

            } // end of data !== ''

            lineNum++;

        } );


        // Rewrite indices to fold texCoords and normals under the same index as the vertices (needed for WebGL).

        if ( faces.length ) {

            let nIndices = [], nVertices = [], nTexCoords = [], nNormals = [];

            for ( let i = 0; i < faces.length; i++ ) {

                let f = faces[ i ];

                let key = f[ 0 ] + '_' + f[ 1 ] + '_' + f[ 2 ];

                if ( iHash[ key ] !== undefined ) {

                    nIndices.push( iHash[ key ] );

                } else {

                    let vIdx = f[ 0 ]; // old face index

                    let tIdx, nIdx, iIdx = parseInt( nVertices.length / 3 );

                    // Push the new Index.

                    nIndices.push( iIdx );

                    iHash[ key ] = iIdx; // new index

                    // If vIdx !== iIdx, we need to adjust our positioning data for materials, groups, etc.

                    if ( vIdx !== iIdx ) {

                        for ( let i in objects ) {

                            if ( objects[ i ] === i ) {

                                objects[ i ] = iIdx;

                                console.log('object index:' + vIdx + ' changed to:' + iIdx );

                            }

                        }

                        for ( let i in materials ) {

                            //console.log('testing materials[' + i + '] =' + materials[ i ] + ' vIdx:' + vIdx + ' iIdx:' + iIdx )

                            if ( materials[ i ] === i ) {

                                materials[ i ] = iIdx;

                                console.log('materials index:' + vIdx + ' changed to:' + iIdx );

                            }

                        }

                        for ( let i in groups ) {

                            if ( groups[ i ] === i ) {

                                groups[ i ] = iIdx;

                                console.log('groups index:' + vIdx + ' changed to:' + iIdx );

                            }

                        }

                    }
 
                    // Push the flattened vertex, texCoord, normal values.

                    vIdx *= 3;

                    nVertices.push( tVertices[ vIdx ], tVertices[ vIdx + 1 ], tVertices[ vIdx + 2 ] );

                    if ( f[ 1 ] !== null ) { 

                        tIdx = f[ 1 ] * 2;

                        nTexCoords.push( tTexCoords[ tIdx ], tTexCoords[ tIdx + 1 ] );

                    } else {

                        nTexCoords.push( 0, 0 );

                    }

                    if ( f[ 2 ] !== null ) { 

                        nIdx = f[ 2 ] * 3;

                        nNormals.push( tNormals[ nIdx ], tNormals[ nIdx + 1 ], tNormals[ nIdx + 2 ] );

                    } else {

                        nNormals.push( 0, 0, 0 );

                    }

                }

            }

            // Replace raw vertex, index, texCoord, normal data with face-adjusted data.

            tVertices = nVertices,

            tIndices = nIndices,

            tTexCoords = nTexCoords,

            tNormals = nNormals;

        } else {

            console.error( 'ModelPool::computeObjMesh(): no faces data in file!' );

            return m; // return an empty object

        }

        // If there was no faces in the OBJ file, use the raw data.

        m.vertices = tVertices,

        m.indices = tIndices,

        m.texCoords = tTexCoords,

        m.normals = tNormals,

        m.objects = objects,

        m.groups = groups,

        m.materials = materials,

        m.smoothingGroups = smoothingGroups;

        // NOTE: Color arrays and tangents are not part of the Wavefront .obj format (in .mtl data).

        return m;

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

        //let d;

        if ( pos === undefined ) {

            console.error( 'ModelPool::addModel(): undefined pos' );

            return null;

        }

        let fType = this.util.getFileExtension( path );

        let d = null,

        emitEvent = '';

        switch ( fType ) {

            case 'obj':

                // Return a Model object.

                d = this.computeObjMesh( data, prim, path );

                // Not supplied by OBJ format.

                d.tangents = [];

                d.colors = [];

                emitEvent = this.util.emitter.events.GEOMETRY_READY;

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


        /* 
         * We save references to the model object in ModelPool.
         * NOTE: .addAsset() puts the assigned key by ModelPool into our object.
         */

        if ( d ) {

            d.type = type,

            d.path = path,

            d.emits = emitEvent;

            /*
             * Model format which must be returned by Mesh or procedural geometry creation.
             * {
             *   vertices: vertices,
             *   indices: indices,
             *   texCoords: texCoords,
             *   normals: normals,
             *   options: options (start points for objects, groups, smoothingGroups, etc),
             *   type: type,
             *   path: file path
             * }
            */

        } else {

             console.warn( 'TexturePool::addTexture(): no texture returned by createTexture() + ' + mimeType + ' function' );

        }

        return this.addAsset( d );

    }

    /** 
     * Load models, using a list of paths. If a Model already exists, 
     * just return it. Otherwise, do the load.
     * @param {Array[String]} pathList a list of URL paths to load, or keys referencing our pool.
     * @param {Boolean} cacheBust if true, add a http://url?random query string to request.
     */
    getModels ( prim, pathList, cacheBust = true ) {

        // Wrap single strings in an Array.

        if ( this.util.isString( pathList ) ) {

            pathList = [ pathList ];

        }

        for ( let i = 0; i < pathList.length; i++ ) {

            let path = pathList[ i ];

            // Could have an empty path.

            if ( ! this.util.isWhitespace( path ) ) {

                // See if the 'path' is actually a key for our ModelPool.

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

                                // load a Model file. Only the first object in the file will be read.

                                if ( updateObj.data ) {

                                    let modelObj = this.addModel( prim, updateObj.data, updateObj.path, updateObj.pos, mimeType, prim.type );

                                    if ( modelObj ) {

                                        /* 
                                         * GEOMETRY_READY event, with additional data referencing sub-groups of the model.
                                         * NOTE: options (e.g. starts of groups, materials, smoothing groups) are attached to modelObj.
                                         * NOTE: we recover the modelObj by its key in PrimFactory.
                                         * See this.addModel() above for more information.
                                         */

                                        this.util.emitter.emit( modelObj.emits, prim, modelObj.key, modelObj.pos );

                                    } else {

                                        console.error( 'TexturePool::getModels(): file:' + path + ' could not be parsed' );

                                    }

                                } else {

                                    console.error( 'ModelPool::getModels(): no data found for:' + updateObj.path );

                                }

                            }, cacheBust, mimeType, 0 ); // end of this.doRequest(), initial request at 0 tries

                    } else {

                        console.error( 'ModelPool::getModels(): file type "' + this.util.getFileExtension( path ) + '" in:' + path + ' not supported, not loading' );

                    }

                }

            } else {

                console.warn( 'ModelPool::getModels(): no path supplied for position ' + i );

            } // end of valid path

        } // end of for loop

    }

}

export default ModelPool;