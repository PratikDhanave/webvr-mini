import AssetPool from './asset-pool';

'use strict'

class MaterialPool extends AssetPool {

    constructor ( init, util, webgl, texturePool ) {

        console.log( 'in MaterialPool' );

        // Initialize superclass.

        super( util );

        this.util = util,

        this.webgl = webgl,

        this.texturePool = texturePool;

        this.materialMimeTypes = {

            'mtl': 'text/plain',

        };

        if ( init ) {

            // do something

        }

    }

    /** 
     * extract additional options for texture maps in OBJ format. Assumes that 
     * a texture file was specified as the last data item in the line. Only the 
     * options specified in the file are added (so calling program must test for them).
     * @param {Array} data the line of the file for a texture map.
     */
    computeTextureMapOptions( data ) {

        let options = {};

         console.log('computeTextureMapOptions data:' + data + ' length:' + data.length )

        // If there there are no options, return an empty object.

        if ( data.length < 4 ) {

            return options;

        }

        console.log('...analyzing TextureMapOptions:' + data);

        /* 
         * Texturemap format:
         * -s 1 1 1 -o 0 0 0 -mm 0 1 filename.png
         * 
         * Copy the data string, sans filename.
         */

        let p = [];

        for ( let i = 0; i < data.length - 1; i++ ) {

            p[ i ] = data[ i ]

        }

        let pp = p.join( ' ' ).split( '-' );

        for ( let i = 0; i < pp.length; i++ ) {

            let ppp = pp[ i ].split( ' ' );

            if ( ppp.length > 1 ) {

                console.log( 'ppp[0]:' + ppp[0] )

                let d = ppp[ 0 ],

                d1 = ppp[ 1 ];

                switch ( d ) {

                    case 'blenu':  // texture blends in horizontal direction
                    case 'blenv': // texture blends in vertical direction
                    case 'cc': // color correction, only with color maps (map_Ka, map_Kd, and map_Ks)
                    case 'clamp': // restrict textures to 0-1 range

                    if ( d1 === 'off' ) options[ d ] = false; else options[ d ] = true;

                        break;

                    case 'bm': // bump map multiplier, should be 0-1
                    case 'mm': // base gain multiplier (makes brighter)

                        if ( Number.isFinite( parseFloat( d1 ) ) ) {

                            options[ d ] = parseFloat( d1 );

                        }

                        break;

                    case 'boost': // sharpen, any non-negative number

                        if ( Number.isFinite( parseFloat( d1 ) ) && d1 >= 0 ) {

                            options[ d ] = parseFloat( d1 );

                        }

                        break;

                    case 'imfchan': // channel used to create scalar or bump texture, (r | g | b | m | l | z)
                    case 'texres':

                        options[ d ] = d1;

                        break;

                    case 'o': // offset texture map origin x, y z
                    case 's': // scales the size of the texture pattern, default 1,1,1
                    case 't': // turn on texture turbulence (u, v, w )

                        if ( ppp.length > 3 ) {

                            //this.util.removeByValue( ppp, ' ', '' );

                            options[ d ] = [ parseFloat[ ppp[ 1 ] ], parseFloat[ ppp[ 2 ] ], parseFloat[ ppp[ 3 ] ] ];

                            if ( ! Number.isFinite( options[ d ][ 0 ] ) ) options[ d ][ 0 ] = 0;

                            if ( ! Number.isFinite( options[ d ][ 1 ] ) ) options[ d ][ 1 ] = 0;

                            if ( ! Number.isFinite( options[ d ][ 2 ] ) ) options[ d ][ 2 ] = 0;

                        }

                        break;

                    default: 

                        console.error( 'unknown texture map option: ' + data );

                        break;

                }

            }

        }

        // Options could be empty.

        return options;

    }

    /** 
     * Compute material properties for a model.
     * Similar to:
     * @link https://github.com/tiansijie/ObjLoader/blob/master/src/objLoader.js
     * 
     * Reference:
     * @link http://paulbourke.net/dataformats/mtl/
     * 
     * @param {String} data the incoming data from the file.
     * @param {Prim} prim the Prim object defined in prim.es6
     * @param {String} path the path to the file. MTL files may reference other files in their directory.
     */
    computeObjMaterials ( data, prim, path ) {

        console.log( 'MaterialPool::computeObjMaterials(): loading model:' + path + ' for:' + prim.name );

        let lineNum = 0;

        let materials = [];

        let currName = null;

        let dir = this.util.getFilePath( path );

        let lines = data.split( '\n' );

        lines.forEach( ( line ) => {

            line = line.trim();

            // First value, the directive.

            let type = line.split( ' ' )[ 0 ].trim();

            // All other values as an array.

            let data = line.substr( type.length ).trim().split( ' ' );

             switch ( type ) {

                case 'newmtl': // name of material.

                    currName = data[ 0 ].trim();

                    materials[ currName ] = { name: currName };

                    break;

                case 'Ka': // ambient

                    if ( data.length < 3 ) {

                        console.error( 'MaterialPool::computeObjMaterials(): error in ambient material array at line:' + lineNum );

                    } else {

                        data[ 0 ] = parseFloat( data[ 0 ] ),

                        data[ 1 ] = parseFloat( data[ 1 ] ),

                        data[ 2 ] = parseFloat( data[ 2 ] );

                        if ( currName && Number.isFinite( data[ 0 ] ) && Number.isFinite( data[ 1 ] ) && Number.isFinite( data[ 2 ] ) ) {

                            materials[ currName ].ambient = [ data[ 0 ], data[ 1 ], data[ 2 ] ];  

                        } else {

                            console.error( 'MaterialPool::computerObjMaterials(): invalid ambient data at line:' + lineNum );

                        }

                    }

                    break;

                case 'Kd': // diffuse

                    if ( data.length < 3 ) {

                        console.error( 'MaterialPool::computeObjMaterials(): error in diffuse material array at line:' + lineNum );


                    } else {

                        data[ 0 ] = parseFloat( data[ 0 ] ),

                        data[ 1 ] = parseFloat( data[ 1 ] ),

                        data[ 2 ] = parseFloat( data[ 2 ] );

                        if ( currName && Number.isFinite( data[ 0 ] ) && Number.isFinite( data[ 1 ] ) && Number.isFinite( data[ 2 ] ) ) {

                            materials[ currName ].diffuse = [ data[ 0 ], data[ 1 ], data[ 2 ] ];

                        } else {

                            console.error( 'MaterialPool::computeObjMaterials(): invalid diffuse array at line:' + lineNum );

                        }

                    }

                    break;

                case 'Ks': // specular

                    if ( data.length < 3 ) {

                        console.error( 'MaterialPool::computeObjMaterials(): error in specular array at line:' + lineNum );

                    } else {

                        data[ 0 ] = parseFloat( data[ 0 ] ),

                        data[ 1 ] = parseFloat( data[ 1 ] ),

                        data[ 2 ] = parseFloat( data[ 2 ] );

                        if ( currName && Number.isFinite( data[ 0 ] ) && Number.isFinite( data[ 1 ] ) && Number.isFinite( data[ 2 ] ) ) {

                            materials[ currName ].specular = [ data[ 0 ], data[ 1 ], data[ 2 ] ];

                        } else {

                            console.error( 'MaterialPool::computeObjMaterials(): invalid specular array at line:' + lineNum );

                        }

                    }

                    break;

                case 'Ns': // specular exponent

                    if ( data.length < 1 ) {

                        console.error( 'MaterialPool::computeObjMaterials(): error in specular exponent array at line:' + lineNum );

                    } else {

                        data[ 0 ] = parseFloat( data[ 0 ] );

                        if ( currName && Number.isFinite( data[ 0 ] ) ) {

                            materials[ currName].specularFactor = data[ 0 ];    

                        } else {

                            console.error( 'MaterialPool::computeObjMaterials(): invalid specular exponent array at line:' + lineNum );

                        }

                    }

                    break;

                case 'd':
                case 'Tr': // transparent

                    if ( data.length <  1 ) {

                        console.error( 'MaterialPool::computeObjMaterials(): error in transparency value at line:' + lineNum );

                    } else {

                        data[ 0 ] = parseFloat( data[ 0 ] );

                        if ( currName && Number.isFinite( data[ 0 ] ) ) {

                            materials[ currName ].transparency = parseFloat( data[ 0 ] ); // single value, 0.0 - 1.0

                        } else {

                            console.error( 'MaterialPool::computeObjMaterials(): invalid transparency value at line:' + lineNum );

                        }

                    }

                    break;

                case 'illum':    // illumination mode

                    if ( data.length < 1 ) {

                        console.error( 'MaterialPool::computeObjMaterials(): error in illumination value at line:' + lineNum );

                    } else {

                        data[ 0 ] = parseInt( data[ 0 ] );

                        if ( currName && Number.isFinite( data[ 0 ] ) && data[ 0 ] > 0 && data[ 0 ] < 11 ) {

                            materials[ currName ].illum = data[ 0 ];

                        }

                    }

                    break;

                case 'map_Kd':   // diffuse map, an image file (e.g. file.jpg)
                case 'map_Ks':   // specular map
                case 'map_Ka':   // ambient map
                case 'map_d':    // alpha map
                case 'bump':     // bumpmap
                case 'map_bump': // bumpmap
                case 'disp':     // displacement map

                    /* 
                     * These commands all load single image files, and append to Prim texture list 
                     * after being emitted with a TEXTURE_2D_READY in PrimFactory.
                     * @link  "filename" is the name of a color texture or image file.
                     * @link http://paulbourke.net/dataformats/mtl/
                     * map_Ka -s 1 1 1 -o 0 0 0 -mm 0 1 file.png
                     */

                    let tPath = data[ data.length - 1 ].trim();

                    console.log('path:' + path + ' data:' + data + ' tPath:' + tPath)

                    if ( currName ) {

                        /* 
                         * get hyphenated options, if present, and add them to the getTextures() call.
                         */

                        let options = this.computeTextureMapOptions( data );

                        /*
                         * NOTE: the texture attaches to prim.textures, so the fourth parmeter is the texture type (map_Kd, map_Ks...).
                         * NOTE: the sixth paramater, is NULL since it defines a specific WebGL texture type (we want the default).
                         * NOTE: if options are present, we pass those in as well.
                         */

                        this.texturePool.getTextures( prim, [ dir + tPath ], true, false, type, null, options );

                    }

                    break;

                default:

                    break;

            }

            lineNum++;

        } );

        return materials;

    }

    /** 
     * Add a model
     * @param {Prim} prim the requesting Prim object.
     * @param {Object} data data to construct the Prim GeoBuffer.
     * @param {String} path the file path to the object.
     * @param {Number} pos the index of the object in the calling Prim's array.
     * @param {String} mimeType the MIME type of the file.
     * @param {String} type the GeometryPool.typeList type of the object, e.g. MESH, SPHERE...
     */
    addMaterial ( prim, data, path, pos, mimeType, type ) {

        if ( pos === undefined ) {

            console.error( 'TextureObj::addTexture(): undefined pos' );

            return null;

        }

        let m;

        let fType = this.util.getFileExtension( path );

        switch ( fType ) {

            case 'mtl':

                console.log("MTL file for prim:" + prim.name + " loaded, parsing....")

                // Returns an array with one or more materials.

                m = this.computeObjMaterials( data, prim, path );

                break;

            default:

                console.warn( 'MaterialPool::addModel(): unknown material file:' + path + ' MIME type:' + mimeType );

                break;

        }

        // Set up the Material object(s).

        if ( m ) {

            for ( let i in m ) {

                let mi = m[ i ];

                mi.type = type,

                mi.path = path,

                mi.emits = this.util.emitter.events.MATERIAL_READY;

                console.log("MaterialPool::addMaterial(): adding:" + mi.name + " to Prim:" + prim.name )

                this.addAsset( mi );

            }

        }

        return m ;

    }

    /** 
     * Load models, using a list of paths. If a Model already exists, 
     * just return it. Otherwise, do the load.
     * @param {Array[String]} pathList a list of URL paths to load.
     * @param {Boolean} cacheBust if true, add a http://url?random query string to request.
     */
    getMaterials ( prim, pathList, cacheBust = true ) {

        for ( let i = 0; i < pathList.length; i++ ) {

            let path = pathList[ i ];

            // Could have an empty path.

            if ( path ) {

                let poolMaterial = this.pathInList( path );

                if ( poolMaterial ) {

                    prim.materials.push( poolMaterial ); // just reference an existing texture in this pool.

                } else {

                    // Get the image mimeType.

                    let mimeType = this.materialMimeTypes[ this.util.getFileExtension( path ) ];

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

                                    let materialObj = this.addMaterial( prim, updateObj.data, updateObj.path, updateObj.pos, mimeType, prim.type );

                                    // Multiple materials may be present in one .mtl file.

                                    if ( materialObj ) {

                                        for ( let i in materialObj ) {

                                            console.log("MaterialPool sending:" + materialObj[ i ].emits + ' key:' + materialObj[ i ].key + ' i:' + i )

                                            // Note that 'i' is the name of the material, instead of a numerical index (which it is in ModelPool and TexturePool).

                                            this.util.emitter.emit( materialObj[ i ].emits, prim, materialObj[ i ].key, i );

                                        }

                                    } // end of material addition.

                                } else {

                                    console.error( 'MaterialPool::getMaterials(): no data found for:' + updateObj.path );

                                }

                            }, cacheBust, mimeType, 0 ); // end of this.doRequest(), initial request at 0 tries

                    } else {

                        console.error( 'MaterialPool::getModels(): file type "' + this.util.getFileExtension( path ) + ' not supported, not loading' );

                    }

                }

            } else {

                console.warn( 'MaterialPool::getMaterials(): no path supplied for position ' + i );

            } // end of valid path

        } // end of for loop

    }

}

export default MaterialPool;