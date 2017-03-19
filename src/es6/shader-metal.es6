import Shader from './shader'

class ShaderMetal extends Shader {

    constructor ( init, util, glMatrix, webgl, shaderName ) {

        super( init, util, glMatrix, webgl, shaderName );

        console.log( 'In ShaderMetal class' );

    }

    /** 
     * --------------------------------------------------------------------
     * VERTEX SHADER 3
     * a directionally-lit textured object vertex shader.
     * @link http://learningwebgl.com/blog/?p=684
     * - vertex position
     * - texture coordinate
     * - model-view matrix
     * - projection matrix
     * --------------------------------------------------------------------
     */


}

export default ShaderMetal;