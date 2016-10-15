export default class WebGL {

    /**
     * References:
     * GL Tutorial: http://webglfundamentals.org
     * HTML5 Games code: http://www.wiley.com/WileyCDA/WileyTitle/productCd-1119975085.html
     * Toji: https://github.com/toji/webvr-samples
     * TWGL: @link http://twgljs.org/
     * @constructor
     * @param {Object} config a configuration object, set in app.js.
     */

    constructor ( init, glMatrix, util, debug ) {

        console.log( 'in webGL class' );

        this.gl = this.vs = this.vs = null;

        this.contextCount = 0;

        this.glMatrix = glMatrix;

        this.util = util;

        if ( init === true ) {

            this.init( canvas );

        }

        // If we are running in debug mode, save the debug utils into this object.

        if ( debug ) {

            this.debug = debug;

        }

    }

    /**
     * initialize with a canvas context
     * @param {Canvas|String|undefined} canvas accepts null, in which case a <canvas> object is 
     * created and added to document.body, an ID value for a tag, or a CanvasDOMobject.
     * @param {Function} lostContext callback when WebGL context is lost.
     * @param {Function} restoredContext callback when WebGL context is restored.
     * @returns {WebGLContext} the WebGL context of the <canvas> object.
     */
    init ( canvas, lostContext, restoredContext ) {

        if ( ! canvas ) { 

            canvas = document.createElement( 'canvas' );

            canvas.width = 480;

            canvas.height = 320;

            // This seems to fix a bug in IE 11. TODO: remove extra empty <canvas>.

            document.body.appendChild( canvas );

        } else if ( this.util.isString( canvas) ) {

            canvas = document.getElementById( canvas );

        } else {

            canvas = canvas;

        }

        if ( canvas ) {

            // NOTE: IE10 needs this bound to DOM for the following command to work.

            let r = canvas.getBoundingClientRect();

            canvas.width = r.width;

            canvas.height = r.height;

            this.gl = this.createContext( canvas );

            if ( this.gl ) {

                let gl = this.gl;

                /* 
                 * Set up listeners for context lost and regained.
                 * @link https://www.khronos.org/webgl/wiki/HandlingContextLost
                 * Simulate lost and restored context events with:
                 * @link https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_lose_context/restoreContext
                 * @link http://codeflow.org/entries/2013/feb/22/how-to-write-portable-webgl/
                 * gl.isContextLost() also works to check
                 */

                canvas.addEventListener('webglcontextlost', ( e ) => {

                    console.error( 'error: webglcontextlost event, context count:' + this.contextCount );

                    if ( lostContext ) {

                        this.gl = null;

                        lostContext( e );

                    }

                    e.preventDefault();

                }, false );

                canvas.addEventListener( 'webglcontextrestored', ( e ) => {

                    console.error( 'error: webglcontextrestored event, context count:' + this.contextCount );

                    if ( restoredContext ) {

                        restoredContext( e );

                    }

                    e.preventDefault();

                }, false );

                // Do an initial set of our viewport width and height.

                gl.viewportWidth = canvas.width;

                gl.viewportHeight = canvas.height;

                // listen for <canvas> resize event.

                window.addEventListener( 'resize', ( e ) => {

                    this.resizeCanvas();

                    e.preventDefault();

                }, false );

                // Default WebGL initializtion and stats, can be over-ridden in your world file.

                // Flag for the availability of high-precision formats, texture sizes.

                this.stats = {};

                let stats = this.stats;

                stats.highp = gl.getShaderPrecisionFormat( gl.FRAGMENT_SHADER, gl.HIGH_FLOAT );

                // Max texture size, for gl.texImage2D.                

                stats.maxTexSize = gl.getParameter( gl.MAX_TEXTURE_SIZE );

                // Max cubemap size, for gl.texImage2D.

                stats.maxCubeSize = gl.getParameter( gl.MAX_CUBE_MAP_TEXTURE_SIZE );

                // Max texture size, for gl.renderbufferStorage and canvas width/height.

                stats.maxRenderbufferSize = gl.getParameter( gl.MAX_RENDERBUFFER_SIZE );

                // Max texture units.

                stats.combinedUnits = gl.getParameter( gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS );

                // Max vertex buffers.

                stats.maxVSattribs = gl.getParameter( gl.MAX_VERTEX_ATTRIBS );

                // Max 4-byte uniforms.

                stats.maxVertexShader = gl.getParameter( gl.MAX_VERTEX_UNIFORM_VECTORS );

                // Max 4-byte uniforms.

                stats.maxFragmentShader = gl.getParameter( gl.MAX_FRAGMENT_UNIFORM_VECTORS );

                // Default 3D enables.

                gl.enable( gl.DEPTH_TEST );

                gl.enable( gl.CULL_FACE );

                gl.enable( gl.BLEND );

                gl.blendFunc( gl.SRC_ALPHA, gl.ONE );

                /* 
                 * IMPORTANT: tells WebGL to premultiply alphas for <canvas>
                 * @link http://stackoverflow.com/questions/39251254/avoid-cpu-side-conversion-with-teximage2d-in-firefox
                 */
                gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true );

                gl.clearColor( 0.1, 0.1, 0.1, 1.0 );

                return this.gl;

            } // end of have a gl context

            //return this.gl;

        } // end of if have a <canvas>

        return null;

    }

    /** 
     * check if we are ready to render
     */
    ready () {

        let gl = this.gl;

        console.log('this.gl:' + gl + ' this.glMatrix:' + this.glMatrix )

        return ( !! ( gl && this.glMatrix ) );

    }

    /** 
     * Get WebGL canvas only if we've created a gl context.
     */
    getCanvas () {

        return this.gl ? this.gl.canvas : null;

    }

    /** 
     * Resize the canvas if the window changes size. 
     * NOTE: affected by CSS styles.
     * TODO: check current CSS style.
     * (TWGL)
     */
    resizeCanvas () {

        if ( this.ready() ) {

            let f = Math.max( window.devicePixelRatio, 1 );

            let gl = this.getContext();

            let c = this.getCanvas();

            let width  = c.clientWidth  * f | 0;

            let height = c.clientHeight * f | 0;

            if (c.width !== width || c.height !== height) {

                c.width = width;

                c.height = height;

                gl.viewportWidth = c.width;

                gl.viewportHeight = c.height;

                return true;

            }

        }

        return false;

    }

    /** 
     * get HTML5 canvas, and a WebGL context. We also scan for multiple 
     * contexts being created ( > 1 ) and delete if one is already present.
     * @param {Canvas} canvas the HTML5 <canvas> DOM element.
     * TODO: PROBLEM IF THERE ARE MULTIPLE CONTEXES ON THE PAGE???????
     */
    createContext ( canvas ) {

        if ( this.gl && this.contextCount > 1 ) {

            // Contexts are normally in garbage, can't be deleted without this!

            this.killContext();

            this.contextCount--;

            this.gl = null;

        }

        // If we're running in dev mode, using the debugging context.

        if ( this.debug ) {

            console.warn( 'In development mode, using WebGL debugging context' );
            
            this.gl = this.debug.makeDebugContext( canvas.getContext( 'webgl' ) );

            if ( ! this.gl ) {

                console.warn( 'using experimental-webgl context' );

                this.gl = this.debug.makeDebugContext( canvas.getContext( 'experimental-webgl' ) ); // some FF, Edge versions.

            }

        } else {

            console.log( 'creating new WebGL context' );

            this.gl = canvas.getContext( 'webgl' );

            if ( ! this.gl ) {

                this.gl = canvas.getContext( 'experimental-webgl' ); // some FF, Edge versions.

            }

        }


        if ( this.gl && typeof this.gl.getParameter == 'function' ) {

            this.glVers = this.gl.getParameter( this.gl.VERSION ).toLowerCase();

            this.contextCount++;

            return this.gl;

        }

        return null;

    }

    /** 
     * Return the current context.
     */
    getContext () {

        if ( ! this.gl ) {

            console.warn( 'warning webgl context not initialized' );

        }

        return this.gl;

    }

    /** 
     * Kill the current context (complete reset will be needed). Also use to debug 
     * when context is lost, and has to be rebuilt.
     * @link http://codeflow.org/entries/2013/feb/22/how-to-write-portable-webgl/
     * @link https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_lose_context/loseContext
     */
    killContext () {

        console.log('in killcontext, count:' + this.contextCount);

        if ( this.contextCount ) {

            console.log( 'killing WebGL context, count before:' + this.contextCount );

            this.gl.getExtension( 'WEBGL_lose_context' ).loseContext();

            this.contextCount--;

        }

    }

    /** 
     * create a WeGL shader object.
     * @param {VERTEX_SHADER | FRAGMENT_SHADER} type type WebGL shader type.
     * @param {String} source the shader source.
     * @returns {WebGLShader} a compiled WebGL shader object.
     */
    createShader ( type, source ) {

        let shader = null;

        if ( ! type || ! source ) {

            console.error( 'createShader: invalid params, type:' + type + ' source:' + source );

        } else if ( this.ready() ) {

            let gl = this.gl;

            /*
             * remove first EOL, which might come from using <script>...</script> tags,
             * to handle GLSL ES 3.00 (TWGL)
             */
            source.replace( /^[ \t]*\n/, '' );

            if ( type === gl.VERTEX_SHADER ) {

                shader = this.vs = gl.createShader( type ); // assigned VS

            } else if ( type === gl.FRAGMENT_SHADER ) {

                shader = this.fs = gl.createShader( type ); // assigned FS

            } else {

                console.error( 'createShader: type not recognized:' + type );
            }

            gl.shaderSource( shader, source );

            gl.compileShader( shader );

            // Detect shader compile errors.

            if ( ! gl.getShaderParameter( shader, gl.COMPILE_STATUS ) ) {

                console.error( 'createShader:' + gl.getShaderInfoLog( shader ) );

                if ( type === gl.VERTEX_SHADER ) {

                    this.vs = null;

                } else if ( type == gl.FRAGMENT_SHADER ) {

                    this.fs = null;

                }

                shader = null;

            }

        }

        return shader;

    }

    createVertexShader ( source ) {

        return this.createShader( this.gl.VERTEX_SHADER, source );

    }

    createFragmentShader ( source ) {

        return this.createShader( this.gl.FRAGMENT_SHADER, source );

    }

    /** 
     * Use the Fetch API to get a shader file
     */
    fetchShader ( type, sourceURL ) {

        let self = this;

        fetch( sourceURL, {

            method: 'POST',

            mode: 'cors',

            redirect: 'follow',

            headers: new Headers({

                'Content-Type': 'text/plain'

            } )

        } ).then( function( response ) { 

            console.log(text);

            if ( response.ok ) {

                return response.text();

            }

            return false;

        } ).then( function( source ) { 

            if ( source ) {

                return self.createShader( type, source );

            }

        } );

        return null;

    }

    fetchVertexShader ( sourceURL ) {

        return this.fetchShader( this.gl.VERTEX_SHADER, sourceURL );

    }

    fetchFragmentShader ( sourceURL ) {

        return this.fetchShader( this.gl.FRAGMENT_SHADER, sourceURL );

    }

    /** 
     * create shader form script element
     * @param {String|DOMElement} tag the script element, or its id
     */
    createShaderFromTag ( tag ) {

        if ( this.util.isString( tag ) ) {

            tag = document.getElementById( tag );

        }

        if ( ! tag ) {

            console.error( 'createShaderFromTag: not found (' + tag + ')' );

            return false;

        } 

        let type = null;

        if ( tag.type ==  'x-shader/x-vertex' ) {

            type = this.gl.VERTEX_SHADER;

        } else if ( tag.type == 'x-shader/x-fragment' ) {

            type = this.gl.FRAGMENT_SHADER;

        } else {

            console.error( 'createShaderFromTag: type not found:(' + tag.type + ')');

            return null;

        }

        let source = "";

        let c = tag.firstChild;

        while ( c ) {

            if ( c.nodeType == 3 ) {

                source += c.textContent;

            }

            c = c.nextSibling;

        }

        return this.createShader( type, source );

    }

    /** 
     * Create WebGL program with shaders. Program not used until 
     * we apply gl.useProgram(program).
     * @param {gl.VERTEX_SHADER} vShader the vertex shader.
     * @param {gl.FRAGMENT_SHADER} fShader the fragment shader.
     */
    createProgram ( vs, fs ) {

        if ( ! vs || ! fs ) {

            console.error( 'createProgram: parameter error, vs:' + vs + ' fs:' + fs );

            return null;

        }

        // Wrap the program object to make V8 happy.

        let prg = {};

        if ( this.ready() ) {

            let gl = this.gl;

            let vso = this.createVertexShader( vs.code );

            let fso = this.createFragmentShader( fs.code );

            let program = gl.createProgram();

            gl.attachShader( program, vso );

            gl.attachShader( program, fso );

            gl.linkProgram( program );

            if ( ! gl.getProgramParameter( program, gl.LINK_STATUS ) ) {

                console.error( 'createProgram:' + gl.getProgramInfoLog( program ) );

            } else {

                prg.shaderProgram = program;

                prg.vsVars = vs.varList,

                prg.fsVars = fs.varList

            }

        }

        return prg;

    }


     /** 
      * Read shader code, and organize the variables in the shader 
      * into an object. Abstracts some of the tedious work in setting 
      * up shader variables.
      * @param {Array} sourceArr array of lines in the shader.
      * @returns {Object} an object organizing attribute, uniform, and 
      * varying variable names and datatypes.
      */
    createVarList ( source ) {

        let len = source.length;

        let sp = ' ';

        let list = {};

        let varTypes = ['attribute', 'uniform', 'varying' ];

        if( len ) {

            for ( let i = 0; i < source.length; i++ ) {

                let s = source[ i ];

                if ( s.indexOf( 'void main' ) !== -1 ) {
 
                    break;

                } else {

                    for ( let j = 0; j < varTypes.length; j++ ) {

                        let type = varTypes[j];

                        if( ! list[ type ] ) list[ type ] = {};

                        if ( s.indexOf( type ) > -1 ) {

                            console.log("SSS1:" + s)

                            //s = s.slice(0, -1); // remove trailing ';'
                            s = s.replace(/;\s*$/, "");

                            console.log("SSS:" + s)

                            s = s.split( sp );

                            console.log("FIRST: " + s)

                            let vType = s.shift(); // attribute, uniform, or varying

                            if ( ! list[ vType ] ) {

                                list[ vType ] = {};

                            }

                            console.log("SECOND AFTER SHIFT:" + vType + " remainder:" + s)

                            let nType = s.shift(); // variable type

                            if ( ! list[ vType ][ nType ] ) {

                                list[ vType ][ nType ] = {};
                            }

                            let nName = s.shift(); // variable name

                            if ( ! list[ vType ][ nType ][ nName ] ) {

                                list[ vType ][ nType ][ nName ] = 'empty';
                            }

                            console.log("THIRD AFTER SHIFT:" + nType + " remainder:" + s)

                        }

                    }

                }

            } 

        }

        return list;

    }

    setAttributeLocations ( shaderProgram, attributes ) {

        let gl = this.gl;

        for ( let i in attributes ) {

            let attb = attributes[ i ];

            console.log('PGGGG:' + attb );

            for ( let j in attb ) {

                attb[ j ] = gl.getAttribLocation( shaderProgram, j );

                gl.enableVertexAttribArray( attb[ j ] );

                console.log("gl.getAttribLocation( shaderProgram, '" + j + "' ) is:" + attb[ j ] );

            }

        }

        return attributes;

    }

    setUniformLocations ( shaderProgram, uniforms ) {

        let gl = this.gl;

        for ( let i in uniforms ) {

            let unif = uniforms[ i ];

            console.log('UGGGG:' + unif );

            for ( let j in unif ) {

                unif[ j ] = gl.getUniformLocation( shaderProgram, j );

                console.log("gl.getUniformLocation( shaderProgram," + j + ") is:" + unif[ j ] );

            }

        }

        return uniforms;

    }

    /** 
     * Bind attribute locations.
     * @param {WebGLProgram} program a compiled WebGL program.
     * @param {Object} attribLocationmap the attributes.
     */
    bindAttributeLocations ( program, attribLocationMap ) {

        var gl = this.gl;

        if ( attribLocationMap ) {

            this.attrib = {};

            for ( var attribName in attribLocationMap ) {

                console.log('binding attribute:' + attribName + ' to:' + attribLocationMap[attribName]);

                gl.bindAttribLocation( program, attribLocationMap[ attribName ], attribName );

                this.attrib[ attribName ] = attribLocationMap[ attribName ];

            }

        } else {

            console.warn( 'webgl.bindAttributes: no attributes supplied' );

        }

    }

    /** 
     * Create associative array with shader attributes.
     * NOTE: Only attributes actually used in the shader show.
     * @param {WebGLProgram} program a compiled WebGL program.
     * @returns {Object} a collection of attributes, with .count = number.
     */
    getAttributes ( program ) {

        let gl = this.gl;

        let attrib = {};

        let attribCount = gl.getProgramParameter( program, gl.ACTIVE_ATTRIBUTES );

        for ( let i = 0; i < attribCount; i++ ) {

            let attribInfo = gl.getActiveAttrib( program, i );

            console.log("ADDING ATTRIB:" + attribInfo.name );

            attrib[ attribInfo.name ] = gl.getAttribLocation( program, attribInfo.name );

        }

        // Store the number of attributes.

        attrib.count = attribCount;

        return attrib;

    }

    /** 
     * Create associative array with shader uniforms.
     * NOTE: Only attributes actually used in the shader show.
     * @param {WebGLProgram} program a compiled WebGL program.
     * @returns {Object} a collection of attributes, with .count = number.
     */
    getUniforms ( program ) {

        let gl = this.gl;

        let uniform = {};

        let uniformCount = gl.getProgramParameter( program, gl.ACTIVE_UNIFORMS );

        let uniformName = '';

        for ( let i = 0; i < uniformCount; i++ ) {

            let uniformInfo = gl.getActiveUniform( program, i );

            uniformName = uniformInfo.name.replace( '[0]', '' );

            console.log("ADDING UNIVORM:" + uniformName );

            uniform[ uniformName ] = gl.getUniformLocation( program, uniformName );

        }

        // Store the number of uniforms.

        uniform.count = uniformCount;

        return uniform;

    }

    /** 
     * Create associative array with shader varying variables.
     */
    getVarying ( program ) {

    }

    /** 
     * create a Vertex Buffer Object (VBO).
     * Example: data = Float32Array [
             0, -100, 6,
           150,  125, 16,
          -175,  100, 20]
     * TODO: only one at a time
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData
     */
    createVBO ( data, usage ) {

        if ( ! data ) {

            console.error( 'createVBO: empty data' );

            return null;

        }

        if (! data.itemSize ) {

            console.error( 'createVBO: itemSize must be specified' );

            return null;

        }

        if (! data.numItems ) {

            console.error( 'createVBO: numitems must be specified' );

            return null;

        }

        if ( ! usage ) {

            console.error( 'createVBO: draw usage must be specified' );

            return null;

        }

        let vbo = null;

        if ( this.ready() ) {

            let gl = this.gl;

            vbo = gl.createBuffer(); // can only be bound once

            // Vertices use ARRAY_BUFFER.

            gl.bindBuffer( gl.ARRAY_BUFFER, vbo );

            gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( data ), usage );

            vbo.itemSize = data.itemSize;

            vbo.numItems = data.numItems;

            this.vbo = vbo;

        }

        return vbo;

    }

    /** 
     * Create an Index Buffer Object. 
     * Example: data = Uint16Array [ 1, 2, 5, 6, 3, 4]
     * TODO: only one at a time in this instance.
     */
    createIBO ( data, usage ) {

        if ( ! data ) {

            console.error( 'createIBO: empty data' );

            return null;

        }

        if (! data.itemSize ) {

            console.error( 'createIBO: itemSize must be specified' );

            return null;

        }

        if (! data.numItems ) {

            console.error( 'createIBO: numitems must be specified' );

            return null;

        }

        if ( ! usage ) {

            console.error( 'createIBO: draw usage must be specified' );

            return null;

        }

        let ibo = null;

        if ( this.ready() ) {

            let gl = this.gl;

            ibo = gl.createBuffer();

            // Indices use ELEMENT_ARRAY_BUFFER.

            gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, ibo ); // can only be bound once

            gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( data ), usage );

            ibo.itemSize = data.itemSize;

            ibo.numItems = data.numItems;

            this.ibo = ibo;

        }

        return ibo;

    }

    /** 
     * Create a color buffer object.
     * Example: data = [ r1, b1, g1, 1,
          r1, b1, g1, 1,
          r1, b1, g1, 1,
          r2, b2, g2, 1,
          r2, b2, g2, 1,
          r2, b2, g2, 1]), 
     */
    createCBO ( data, usage ) {

        if ( ! data ) {

            console.error( 'createCBO: empty data' );

            return null;

        }

        if (! data.itemSize ) {

            console.error( 'createCBO: itemSize must be specified' );

            return null;

        }

        if (! data.numItems ) {

            console.error( 'createCBO: numitems must be specified' );

            return null;

        }

        if ( ! usage ) {

            console.error( 'createCBO: drawing usage must be specified' );

            return null;

        }

        let cbo = null;

        if ( this.ready() ) {

            let gl = this.gl;

            cbo = gl.createBuffer();

            // Colors use ARRAY_BUFFER.

            gl.bindBuffer( gl.ARRAY_BUFFER, cbo ); // can only be bound once

            gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( data ), usage );

            cbo.itemSize = data.itemSize;

            cbo.numitems = data.numItems;

            this.cbo = cbo;

        }

        return cbo;

    }

    /** 
     * create a normals buffer object.
     */
    createNBO () {

        console.error( 'webgl.createNBO NOT IMPLEMENTED' );

        return null;

    }

    /** 
     * check to see if we're ready to run, after supplying 
     * shaders.
     */
    checkShaders () {

        let gl = this.gl;

        if ( ! gl.getProgramParameter( this.program, gl.LINK_STATUS ) ) {

            // Test the vertex shader

             if ( this.vs && ! gl.getShaderParameter( this.vs, gl.COMPILE_STATUS ) ) {

                console.error( 'error creating the vertex shader, ' + gl.getShaderInfoLog( this.vs ) );

            } else if (this._fragmentShader && !gl.getShaderParameter(this._fragmentShader, gl.COMPILE_STATUS ) ) {

                console.error(  'error creating the fragment shader, ' + gl.getShaderInfoLog( this.fs ) );

            } else {

                console.error( 'error in gl program linking' );

            }

            gl.deleteProgram( this.program );

            gl.deleteShader( this.vs );

            gl.deleteShader( this.fs );

            this.program = this.vs = this.fs = null;

            return false;

        }

        return true;

    }

    /** 
     * Check if our VBO, IBO are ok.
     */
    checkBufferObjects ( bo ) {

        return (bo && bo instanceof ArrayBuffer );

    }

}