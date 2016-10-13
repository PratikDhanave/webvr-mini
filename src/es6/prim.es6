export default class prim {

    /** 
     * Create object primitives, and return vertex and index data 
     * suitable for creating a VBO and IBO.
     */

    constructor ( init, util, glMatrix, webgl, loadModel, loadTexture, loadAudio, loadVideo) {

        console.log( 'in Prim class' );

        this.util = util;

        this.webgl = webgl;

        this.glMatrix = glMatrix;

        this.loadModel = loadModel;

        this.loadTexture = loadTexture;

        this.loadAudio = loadAudio;

        this.loadVideo = loadVideo;

        this.objs = [];

        this.type = {

            POINT: 'POINT',

            LINE: 'LINE',

            PLANE: 'PLANE',

            CUBE: 'CUBE',

            SPHERE: 'SPHERE',

            DOME: 'DOME',

            CONE: 'CONE',

            CYLINDER: 'CYLINDER',

            POLY: 'POLY'

        };

    }

    /** 
     * Unique object id
     * @link https://jsfiddle.net/briguy37/2MVFd/
     */
    setId () {

        let d = new Date().getTime();

        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function( c ) {

            var r = (d + Math.random()*16)%16 | 0;

            d = Math.floor(d/16);

            return ( c=='x' ? r : ( r&0x3|0x8 ) ).toString( 16 );

        } );

        return uuid;

    }

    /** 
     * Get the big array with all vertex data
     */
    setVertexData ( vertices ) {

        vertices = [];

        let len = this.objs.length;

        for ( let i in this.objs ) {

            vertices = vertices.concat( this.objs[i].vertices );

        }

        return vertices;

    }

    /** 
     * get the big array with all index data
     */
    setIndexData ( indices ) {

        indices = [];

        let len = this.objs.length;

        for ( let i in this.objs ) {

            indices = indices.concat( this.objs[i].indices );

        }

        return indices;

    }

    /** 
     * a default-lighting textured object vertex shader.
     * - vertex position
     * - texture coordinate
     * - model-view matrix
     * - projection matrix
     */
    objVS1 () {

        let s = [

            'attribute vec3 aVertexPosition;',
            'attribute vec2 aTextureCoord;',
            'uniform mat4 uMVMatrix;',
            'uniform mat4 uPMatrix;',
            'varying vec2 vTextureCoord;',

            'void main(void) {',

            '    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);',

            '    vTextureCoord = aTextureCoord;',

            '}'

            ];

        return {

            code: s.join( '\n' ),

            varList: this.webgl.createVarList( s ),

            render: function () {}

        };


    }

    /** 
     * a default-lighting textured object fragment shader.
     * - varying texture coordinate
     * - texture 2D sampler
     */
    objFS1 () {

        let s =  [

            'precision mediump float;',

            'varying vec2 vTextureCoord;',
            'uniform sampler2D uSampler;',

            'void main(void) {',

            '    gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));',

            '}'

            ];


        return {
        
            code: s.join('\n'),

            varList: this.webgl.createVarList( s ),

            render: function () {}

        };

    }


    /** 
     * GEOMETRIES
     */

    geometryPoint () {

    }

    geometryLine () {

    }

    geometryPlane () {

    }

    /** 
     * Create a cube geometry of a given size (units) centered 
     * on a point.
     * @param {GLMatrix.Vec3} center a 3d vector defining the center.
     * @param {Number} scale relative to unit size (1, 1, 1).
     */
    geometryCube ( center, size ) {

        let gl = this.webgl.getContext();

        let  halfSize = size * 0.5;

        let r = size * 0.5;

        let x = center[0];

        let y = center[1];

        let z = center[2];

        //let vertices = [];

        let indices = [
            0, 1, 2,      0, 2, 3,    // Front face
            4, 5, 6,      4, 6, 7,    // Back face
            8, 9, 10,     8, 10, 11,  // Top face
            12, 13, 14,   12, 14, 15, // Bottom face
            16, 17, 18,   16, 18, 19, // Right face
            20, 21, 22,   20, 22, 23  // Left face
        ];

        let iBuffer = gl.createBuffer();

        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, iBuffer);

        gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( indices ), gl.STATIC_DRAW);

        // Create cube geometry.

        let vertices = [
            // Front face
            -1.0, -1.0,  1.0,
             1.0, -1.0,  1.0,
             1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,
            // Back face
            -1.0, -1.0, -1.0,
            -1.0,  1.0, -1.0,
             1.0,  1.0, -1.0,
             1.0, -1.0, -1.0,
            // Top face
            -1.0,  1.0, -1.0,
            -1.0,  1.0,  1.0,
             1.0,  1.0,  1.0,
             1.0,  1.0, -1.0,
            // Bottom face
            -1.0, -1.0, -1.0,
             1.0, -1.0, -1.0,
             1.0, -1.0,  1.0,
            -1.0, -1.0,  1.0,
            // Right face
             1.0, -1.0, -1.0,
             1.0,  1.0, -1.0,
             1.0,  1.0,  1.0,
             1.0, -1.0,  1.0,
            // Left face
            -1.0, -1.0, -1.0,
            -1.0, -1.0,  1.0,
            -1.0,  1.0,  1.0,
            -1.0,  1.0, -1.0,
        ];

        let vBuffer = gl.createBuffer();

        gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );

        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

        /////////////////////////

        let texCoords = [
            // Front face
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Back face
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,
            // Top face
            0.0, 1.0,
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            // Bottom face
            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,
            1.0, 0.0,
            // Right face
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,
            // Left face
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
        ];

        let tBuffer = gl.createBuffer();

        gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );

        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( texCoords ), gl.STATIC_DRAW );

        // Return standard geo object.

        return {

            vertices: {

                data: vertices,

                buffer: tBuffer,

                itemSize: 3,

                numItems: vertices.length / 3
            },

            indices: {

                data: indices,

                buffer: iBuffer,

                itemSize: 1,

                numItems: indices.length

            },

            texCoords: {

                data: texCoords,

                buffer: tBuffer,

                itemSize: 2,

                numItems: texCoords.length / 2

            }

        }

    }

    geometrySphere () {

    }

    geometryDome () {

    }

    geometryCone () {

    }

    geometryCylinder () {

    }

    geometryPoly () {

    }

    /** 
     * Create an standard 3d object.
     * @param {String} name assigned name of object (not necessarily unique).
     * @param {Number} scale size relative to unit vector (1,1,1).
     * @param {GLMatrix.vec3} position location of center of object.
     * @param {GLMatrix.vec3} translation movement vector (acceleration) of object.
     * @param {GLMatrix.vec3} rotation rotation vector (spin) around center of object.
     * @param {String} textureImage the path to an image used to create a texture.
     * @param {GLMatrix.vec4} color the default color of the object.
     */
    createPrim ( name = 'unknown', scale = 1.0, position, translation, rotation, textureImage, color ) {

        let gl = this.webgl.getContext();

        let prim = {};

        prim.id = this.setId();

        prim.name = name;

        prim.position = position || this.glMatrix.vec3.create( 0, 0, 0 );

        prim.translation = translation || this.glMatrix.vec3.create( 0, 0, 0 );

        prim.rotation = rotation || this.glMatrix.vec3.create( 0, 0, 0 );

        prim.texture = this.loadTexture.load( textureImage, function () { console.log('CALLING BACK............') } );

        prim.color = null;

        return prim;

    }

    /** 
     * create a Cube object.
     * @param {String} name of object
     * @param {Number} scale
     */
    createCube ( name, scale, position, translation, rotation, textureImage, color ) {

        let cube = this.createPrim( name, scale, position, translation, rotation, textureImage, color );

        cube.geometry = this.geometryCube( cube );

        cube.type = this.type.CUBE;

        this.objs.push( cube );

        return cube;

    }

}