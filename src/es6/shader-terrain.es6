import Shader from './shader'

class ShaderTerrain extends Shader {

    'use strict'

    /** 
     * --------------------------------------------------------------------
     * VERTEX SHADER 4
     * a directionally-lit terrain surface (not using standard WebGL lighting).
     * @link http://learningwebgl.com/blog/?p=684
     * StackGL
     * @link https://github.com/stackgl
     * phong lighting
     * @link https://github.com/stackgl/glsl-lighting-walkthrough
     * - vertex position
     * - texture coordinate
     * - model-view matrix
     * - projection matrix
     * --------------------------------------------------------------------
     */
    constructor ( init, util, glMatrix, webgl, webvr, shaderName ) {

        super( init, util, glMatrix, webgl, webvr, shaderName );

        console.log( 'In ShaderTerrain class' );

        this.needIndices = true;

        this.needTexCoords = true;

        this.needColors = false;

        this.needNormals = false;

        this.needTangents = false;

    }

    /* 
     * Vertex and Fragment Shaders. We use the internal 'program' object from the webgl object to compile these. 
     * Alternatively, They may be defined to load from HTML or and external file.
     * @return {Object{code, varList}} an object, with internal elements
     * code: The shader code.
     * varList: A scanned list of all the variables in the shader code (created by webgl object).
     */
    vsSrc () {

        let s = [];

        return {

            code: s.join( '\n' ),

            varList: this.webgl.createVarList( s )

        };

    }


    /** 
     * a textured terrain, (with lighting computed in shader) fragment shader.
     * - varying texture coordinate
     * - texture 2D sampler
     */
    fsSrc () {

        let s =  [];

        return {

            code: s.join('\n'),

            varList: this.webgl.createVarList( s )

        };

    }

    /** 
     * initialize the update() and render() methods for this shader.
     * @param{Prim[]} primList a list of initializing Prims (optional).
     */
     init ( primList ) {

        let arr = this.setup(),

        gl = arr[ 0 ],

        canvas = arr[ 1 ],

        mat4 = arr[ 2 ],

        mat3 = arr[ 3 ],

        vec3 = arr[ 4 ],

        pMatrix = arr[ 5 ],

        mvMatrix = arr[ 6 ],

        program = arr[ 7 ],

        vsVars = arr[ 8 ],

        fsVars = arr[ 9 ], 

        stats = arr[ 10 ],

        near = arr[ 11 ],

        far = arr[ 12 ],

        vr = arr[ 13 ];

        // Shorter reference.

        let shaderProgram = program.shaderProgram;

        // If we init with primList, add them here.

        if ( primList ) {

            program.renderList = this.util.concatArr( program.renderList, primList );

        }

        /** 
         * POLYMORPHIC METHODS
         */

        // Check if Prim is ready to be rendered using this Shader.

        program.isReady = ( prim ) => {

            // TODO: list everything Terrain needs using this Shader.

            return true;

        }

        // Update Prim position, motion - given to World object.

        program.update = ( prim, MVM ) => {

            // Update the model-view matrix using current Prim position, rotation, etc.

            prim.setMV( mvMatrix );

            // Compute lighting normals.

            vec3.normalize( adjustedLD, lightingDirection );

            vec3.scale( adjustedLD, adjustedLD, -1 );

            // Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix.

            mat3.normalFromMat4( nMatrix, mvMatrix );

        }

        // Prim rendering - Shader in ShaderPool, rendered by World.

        program.render = ( PM, MVM ) => {

            gl.useProgram( shaderProgram );

            // Save the model-view supplied by the shader. Mono and VR return different MV matrices.

            let saveMV = mat4.clone( MVM );

            // Begin program loop

            for ( let i = 0, len = program.renderList.length; i < len; i++ ) {

                let prim = program.renderList[ i ];

                // Only render if we have at least one texture loaded.

                if ( ! prim.textures[ 0 ] || ! prim.textures[ 0 ].texture ) continue;

                // Update Model-View matrix with standard Prim values.

                program.update( prim, MVM );

                // TODO: bind buffers

                // TODO: Set fragment shader sampler uniform.

                // TODO: drawElements()

                // Copy back the original for the next Prim. 

                mat4.copy( MVM, saveMV, MVM );

            } // end of renderList for Prims.

        } // end of program.render()

    } // end of init()

}

export default ShaderTerrain;