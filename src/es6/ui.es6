
class Ui {

    /** 
     * DOM, fullscreen, and stereo Ui.
     */

    constructor ( init = false, util, webgl, webvr ) {

        console.log( 'in Ui' );

        this.UI_DOM = 'uidom',

        this.UI_VR = 'uivr',

        this.UI_FULLSCREEN = 'fullscreen';

        this.mode = this.UI_DOM; // by default

        // TODO: CHECK IF WEBVR IS AVAILABLE. IF SO, ALWAYS GO INTO VR MODE INSTEAD OF FULLSCREEN.

        /* 
         * icons from the noun project.
         * @link https://thenounproject.com/
         * Conversion of SVG to base64
         * @link http://b64.io/
         */
        this.icons = {

            // Created by Cyril S.

            vr: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgOTAgMTEyLjUiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDkwIDkwIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBkPSJNODEuNjcxLDIxLjMyM2MtMi4wODUtMi4wODQtNzIuNTAzLTEuNTUzLTc0LjA1NCwwYy0xLjY3OCwxLjY3OC0xLjY4NCw0Ni4wMzMsMCw0Ny43MTMgIGMwLjU1OCwwLjU1OSwxMi4xNTEsMC44OTYsMjYuMDA3LDEuMDEybDMuMDY4LTguNDg2YzAsMCwxLjk4Ny04LjA0LDcuOTItOC4wNGM2LjI1NywwLDguOTksOS42NzUsOC45OSw5LjY3NWwyLjU1NSw2Ljg0OCAgYzEzLjYzMy0wLjExNiwyNC45NTctMC40NTMsMjUuNTE0LTEuMDA4QzgzLjIyNCw2Ny40ODMsODMuNjcyLDIzLjMyNCw4MS42NzEsMjEuMzIzeiBNMjQuNTcyLDU0LjU4MiAgYy02LjA2MywwLTEwLjk3OC00LjkxNC0xMC45NzgtMTAuOTc5YzAtNi4wNjMsNC45MTUtMTAuOTc4LDEwLjk3OC0xMC45NzhzMTAuOTc5LDQuOTE1LDEwLjk3OSwxMC45NzggIEMzNS41NTEsNDkuNjY4LDMwLjYzNSw1NC41ODIsMjQuNTcyLDU0LjU4MnogTTY0LjMzNCw1NC41ODJjLTYuMDYzLDAtMTAuOTc5LTQuOTE0LTEwLjk3OS0xMC45NzkgIGMwLTYuMDYzLDQuOTE2LTEwLjk3OCwxMC45NzktMTAuOTc4YzYuMDYyLDAsMTAuOTc4LDQuOTE1LDEwLjk3OCwxMC45NzhDNzUuMzEyLDQ5LjY2OCw3MC4zOTYsNTQuNTgyLDY0LjMzNCw1NC41ODJ6Ii8+PC9zdmc+',

            // Created by Garrett Knoll.

            fullscreen: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEyNSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDEwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+PGc+PHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTTc3LjE3MSw3OS44ODdINjEuODE0Yy0xLjUsMC0yLjcxNS0xLjIxNi0yLjcxNS0yLjcxNWMwLTEuNSwxLjIxNi0yLjcxNSwyLjcxNS0yLjcxNWgxMi42NDJWNjEuODE1ICAgIGMwLTEuNSwxLjIxNi0yLjcxNSwyLjcxNS0yLjcxNXMyLjcxNSwxLjIxNiwyLjcxNSwyLjcxNXYxNS4zNTdDNzkuODg3LDc4LjY3MSw3OC42NzEsNzkuODg3LDc3LjE3MSw3OS44ODd6Ii8+PC9nPjxnPjxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0zOC4yNTQsNzkuODg3SDIyLjg5N2MtMS41LDAtMi43MTUtMS4yMTYtMi43MTUtMi43MTVWNjEuODE1YzAtMS41LDEuMjE2LTIuNzE1LDIuNzE1LTIuNzE1ICAgIHMyLjcxNSwxLjIxNiwyLjcxNSwyLjcxNXYxMi42NDFoMTIuNjQyYzEuNSwwLDIuNzE1LDEuMjE2LDIuNzE1LDIuNzE1QzQwLjk2OSw3OC42NzEsMzkuNzU0LDc5Ljg4NywzOC4yNTQsNzkuODg3eiIvPjwvZz48L2c+PGc+PGc+PHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTTIyLjg5Nyw0MC45N2MtMS41LDAtMi43MTUtMS4yMTYtMi43MTUtMi43MTVWMjIuODk4YzAtMS41LDEuMjE2LTIuNzE1LDIuNzE1LTIuNzE1aDE1LjM1NyAgICBjMS41LDAsMi43MTUsMS4yMTYsMi43MTUsMi43MTVzLTEuMjE2LDIuNzE1LTIuNzE1LDIuNzE1SDI1LjYxMnYxMi42NDFDMjUuNjEyLDM5Ljc1NSwyNC4zOTcsNDAuOTcsMjIuODk3LDQwLjk3eiIvPjwvZz48Zz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNNzcuMTcxLDQwLjk3Yy0xLjUsMC0yLjcxNS0xLjIxNi0yLjcxNS0yLjcxNVYyNS42MTNINjEuODE0Yy0xLjUsMC0yLjcxNS0xLjIxNi0yLjcxNS0yLjcxNSAgICBzMS4yMTYtMi43MTUsMi43MTUtMi43MTVoMTUuMzU3YzEuNSwwLDIuNzE1LDEuMjE2LDIuNzE1LDIuNzE1djE1LjM1N0M3OS44ODcsMzkuNzU1LDc4LjY3MSw0MC45Nyw3Ny4xNzEsNDAuOTd6Ii8+PC9nPjwvZz48Zz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNOTIuMjg1LDk1SDcuNzE1QzYuMjE2LDk1LDUsOTMuNzg1LDUsOTIuMjg1VjcuNzE2QzUsNi4yMTYsNi4yMTYsNSw3LjcxNSw1aDg0LjU2OSAgIEM5My43ODQsNSw5NSw2LjIxNiw5NSw3LjcxNnY4NC41NjlDOTUsOTMuNzg1LDkzLjc4NCw5NSw5Mi4yODUsOTV6IE0xMC40MzEsODkuNTY5aDc5LjEzOFYxMC40MzFIMTAuNDMxVjg5LjU2OXoiLz48L2c+PC9zdmc+',

            // Created by Shawn Erdely.

            gear: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEyNSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDEwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHBhdGggZD0iTTU5LjQsNWMwLjQsMy4xLDAuOSw2LjEsMS4zLDkuMWMwLDAuMywwLDAuNSwwLjEsMC44YzAuMywxLDUuMywyLjcsNi4yLDJjMi4yLTEuNiw0LjQtMy4yLDYuNS00LjljMC44LTAuNywxLjQtMC41LDIuMSwwICBjNC44LDMuMyw4LjgsNy40LDEyLjEsMTIuMmMwLjUsMC43LDAuNSwxLjIsMCwxLjljLTEuNywyLjEtMy4zLDQuNC00LjksNi41Yy0wLjUsMC43LTAuNywxLjMtMC4yLDIuMWMwLjMsMC41LDAuNiwxLDAuNywxLjUgIGMwLjQsMi4zLDEuOCwzLDMuOSwzLjFjMi4xLDAuMSw0LjIsMC42LDYuMiwwLjhjMC45LDAuMSwxLjIsMC40LDEuNCwxLjJjMC44LDQuMiwxLDguNSwwLjYsMTIuN2MtMC4xLDEuNi0wLjQsMy4zLTAuNyw0LjkgIGMtMC4xLDAuNC0wLjYsMC45LTEsMWMtMi43LDAuNS01LjUsMC45LTguMiwxLjJjLTAuOSwwLjEtMS40LDAuNC0xLjYsMS4zYy0wLjEsMC41LTAuMywxLjEtMC42LDEuNmMtMS40LDEuOS0wLjgsMy41LDAuNyw1LjEgIGMxLjQsMS42LDIuNiwzLjMsMy44LDVjMC4zLDAuNCwwLjMsMS4zLDAuMSwxLjdjLTMuMyw0LjktNy40LDktMTIuMywxMi40Yy0wLjcsMC41LTEuMiwwLjQtMS45LTAuMWMtMi4xLTEuNy00LjQtMy4zLTYuNS00LjkgIGMtMC42LTAuNS0xLjItMC43LTEuOS0wLjJjLTAuNSwwLjMtMS4xLDAuNi0xLjcsMC43Yy0yLjMsMC40LTIuOSwxLjktMyw0Yy0wLjEsMi4xLTAuNSw0LjMtMC45LDYuNGMtMC4xLDAuNC0wLjYsMS0xLjEsMS4xICBjLTUuOSwxLjItMTEuNywxLjItMTcuNiwwLjFjLTAuOC0wLjEtMS4xLTAuNS0xLjItMS4zYy0wLjMtMi43LTAuOC01LjQtMS4xLTguMWMtMC4xLTAuOS0wLjQtMS40LTEuMy0xLjZjLTAuNC0wLjEtMC45LTAuMy0xLjMtMC41ICBjLTItMS40LTMuNy0xLTUuNSwwLjdjLTEuNCwxLjQtMy4yLDIuNC00LjgsMy43Yy0wLjcsMC42LTEuMiwwLjYtMS45LDAuMWMtNC45LTMuNC05LTcuNS0xMi40LTEyLjRjLTAuNS0wLjctMC40LTEuMiwwLjEtMS45ICBjMS43LTIuMSwzLjMtNC40LDQuOS02LjVjMC41LTAuNiwwLjctMS4yLDAuMi0xLjljLTAuMy0wLjQtMC42LTAuOS0wLjYtMS40Yy0wLjQtMi43LTIuMi0zLjItNC42LTMuNGMtMi0wLjEtNC0wLjUtNS45LTAuOSAgYy0wLjQtMC4xLTEtMC43LTEuMS0xLjFjLTEuMi01LjktMS4yLTExLjcsMC0xNy42YzAuMS0wLjQsMC43LTEsMS4xLTFjMi44LTAuNSw1LjYtMC44LDguNC0xLjNjMC41LTAuMSwwLjktMC42LDEuMy0xICBjMC4xLTAuMSwwLjEtMC40LDAuMi0wLjZjMi0yLjgsMS4yLTUuMi0xLTcuNWMtMS4xLTEuMi0yLjEtMi42LTMtMy45Yy0wLjMtMC40LTAuMy0xLjItMC4xLTEuNmMzLjMtNSw3LjUtOS4xLDEyLjQtMTIuNSAgYzAuNy0wLjUsMS4xLTAuNCwxLjcsMC4xYzIuMSwxLjcsNC40LDMuMyw2LjUsNC45YzAuNywwLjUsMS4zLDAuNywyLDAuMmMwLjUtMC4zLDEuMS0wLjYsMS43LTAuN2MyLjMtMC40LDIuOC0xLjksMi45LTMuOSAgYzAuMS0yLjEsMC42LTQuMiwwLjgtNi4zYzAuMS0xLDAuNS0xLjMsMS40LTEuNEM0Ny4xLDMuNyw1My4yLDMuNyw1OS40LDV6IE0zMi42LDQ5LjZjLTAuMSw5LjMsNy41LDE2LjgsMTYuOCwxNi45ICBjOS4yLDAsMTYuOS03LjYsMTYuOS0xNi44YzAtOS4yLTcuNi0xNi43LTE2LjgtMTYuOEM0MC4yLDMyLjgsMzIuNiw0MC4zLDMyLjYsNDkuNnoiLz48dGV4dCB4PSIwIiB5PSIxMTUiIGZpbGw9IiMwMDAwMDAiIGZvbnQtc2l6ZT0iNXB4IiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1mYW1pbHk9IidIZWx2ZXRpY2EgTmV1ZScsIEhlbHZldGljYSwgQXJpYWwtVW5pY29kZSwgQXJpYWwsIFNhbnMtc2VyaWYiPkNyZWF0ZWQgYnkgU2hhd24gRXJkZWx5IDwvdGV4dD48dGV4dCB4PSIwIiB5PSIxMjAiIGZpbGw9IiMwMDAwMDAiIGZvbnQtc2l6ZT0iNXB4IiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1mYW1pbHk9IidIZWx2ZXRpY2EgTmV1ZScsIEhlbHZldGljYSwgQXJpYWwtVW5pY29kZSwgQXJpYWwsIFNhbnMtc2VyaWYiPmZyb20gdGhlIE5vdW4gUHJvamVjdDwvdGV4dD48L3N2Zz4=',

            // Created by Guilhem.

            backArrow: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEyNSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDEwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+PGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJiZXZlbCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB4MT0iOTMuMSIgeTE9IjUwIiB4Mj0iNi45IiB5Mj0iNTAiLz48bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49ImJldmVsIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSI2LjkiIHkxPSI1MCIgeDI9IjMyLjciIHkyPSI3NS45Ii8+PGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJiZXZlbCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB4MT0iNi45IiB5MT0iNTAiIHgyPSIzMi43IiB5Mj0iMjQuMSIvPjwvZz48dGV4dCB4PSIwIiB5PSIxMTUiIGZpbGw9IiMwMDAwMDAiIGZvbnQtc2l6ZT0iNXB4IiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1mYW1pbHk9IidIZWx2ZXRpY2EgTmV1ZScsIEhlbHZldGljYSwgQXJpYWwtVW5pY29kZSwgQXJpYWwsIFNhbnMtc2VyaWYiPkNyZWF0ZWQgYnkgR3VpbGhlbTwvdGV4dD48dGV4dCB4PSIwIiB5PSIxMjAiIGZpbGw9IiMwMDAwMDAiIGZvbnQtc2l6ZT0iNXB4IiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1mYW1pbHk9IidIZWx2ZXRpY2EgTmV1ZScsIEhlbHZldGljYSwgQXJpYWwtVW5pY29kZSwgQXJpYWwsIFNhbnMtc2VyaWYiPmZyb20gdGhlIE5vdW4gUHJvamVjdDwvdGV4dD48L3N2Zz4='

        }

        this.util = util,

        this.gl = webgl,

        this.vr = webvr;

        // save old DOM style

        if ( init ) {

           this.init( this.UI_DOM );

        }

    }

    init ( ui ) {

        if ( ! ui ) {

            console.log( 'no mode provided, setting default' );

            ui = this.mode;

        }

        console.log( 'initializing Ui: ' + ui );

        // begin listening for fullscreen events.

        // Bind to fullscreen events.
        document.addEventListener( 'webkitfullscreenchange', this.fullscreenChange.bind( this ) );

        document.addEventListener( 'mozfullscreenchange', this.fullscreenChange.bind( this ) );

        document.addEventListener( 'msfullscreenchange', this.fullscreenChange.bind( this ) );

        // switch to the correct screen configuration.

        switch ( ui ) {

            case this.UI_VR:

                break;

            case this.UI_FULLSCREEN:

                break;

            case this.UI_DOM:

            default:

                this.createDOMUi();

                break;

        }

    }


    /** 
     * Create the default DOM ui.
     */
    createDOMUi () {

        console.log( 'entering DOMUi')

        let c = this.gl.getCanvas();

        // Check for controls.

        let controls = c.parentNode.querySelector( '.webvr-mini-controls' );

        if ( ! controls ) {

            controls = document.createElement( 'nav' );

        }

        if ( c ) {

            console.log( 'creating DOM Ui')

            // VR button

            let vrButton = this.createButton();

            vrButton.style.top = '0px';

            vrButton.style.left = '0px';

            vrButton.zIndex = '9999',

            vrButton.src = this.icons.vr;

            vrButton.style.display = 'inline-block';

            vrButton.addEventListener( 'click' , ( evt ) => {

                console.log( 'clicked vr button...' );

                evt.preventDefault();

            } );

            controls.appendChild( vrButton );

            // Fullscreen

            let fullscreenButton = this.createButton();

            fullscreenButton.style.top = '4px';

            fullscreenButton.style.left = '60px';

            fullscreenButton.style.width = '24px';

            fullscreenButton.style.height = '24px';

            fullscreenButton.src = this.icons.fullscreen;

            fullscreenButton.style.display = 'inline-block';

            fullscreenButton.addEventListener( 'click', ( evt ) => {

                console.log( 'clicked fullscreen button...' );

                const f = Math.max( window.devicePixelRatio, 1 );

                // Get the current size of the parent.

                let p = c.parentNode;

                this.oldWidth  = p.clientWidth  * f | 0;

                this.oldHeight = p.clientHeight * f | 0;

                p.style.width = this.util.getScreenWidth() + 'px';

                p.style.height = this.util.getScreenHeight() + 'px';

                this.mode = this.UI_DOM;

                this.requestFullscreen();

                evt.preventDefault();

            } );

            controls.appendChild( fullscreenButton );

            // Return button.

            let returnButton = this.createButton();

            returnButton.style.top = '0px';

            returnButton.style.left = '0px';

            returnButton.zIndex = '9999',

            returnButton.src = this.icons.vr;

            returnButton.style.display = 'none'; // inline-block';

            returnButton.addEventListener( 'click' , ( evt ) => {

                console.log( 'clicked return button...' );

                evt.preventDefault();

            } );

            controls.appendChild( vrButton );


        } else {

            console.error( 'Ui::createDOMUi(): canvas not defined' );

        }

    }

    /** 
     * Create a Ui button
     */
    createButton () {

        let button = document.createElement( 'img' );

        button.className = 'webvr-mini-button';

        let s = button.style;

        s.position = 'absolute',

        s.width = '36px',

        s.height = '36px',

        s.backgroundSize = 'cover',

        s.backgroundColor = 'transparent',

        s.border = 0,

        s.userSelect = 'none',

        s.webkitUserSelect = 'none',

        s.MozUserSelect = 'none',

        s.cursor = 'pointer',

        s.padding = '12px',

        s.zIndex = 1,

        s.display = 'none',

        s.boxSizing = 'content-box';

        // Prevent button from being selected and dragged.

        button.draggable = false;

        button.addEventListener( 'dragstart', ( evt ) => {

            evt.preventDefault();

        } );

        // Style it on hover.

        button.addEventListener( 'mouseenter', ( evt ) => {

            s.filter = s.webkitFilter = 'drop-shadow(0 0 6px rgba(255,255,255,1))';

        } );

        button.addEventListener( 'mouseleave', ( evt ) => {

            s.filter = s.webkitFilter = '';

        } );

        return button;

    }

    requestFullscreen () {

        let canvas = this.gl.getCanvas();

        const parent = canvas.parentNode;

        if ( parent.requestFullscreen ) {

            parent.requestFullscreen();

        } else if ( parent.mozRequestFullScreen ) {

            parent.mozRequestFullScreen();

        } else if ( parent.webkitRequestFullscreen ) {

            parent.webkitRequestFullscreen();

        } else if ( parent.msRequestFullscreen ) {

            parent.msRequestFullscreen();

        }

    }

    exitFullscreen () {

        if ( document.exitFullscreen ) {

            document.exitFullscreen();

        } else if ( document.mozCancelFullScreen ) {

            document.mozCancelFullScreen();

        } else if ( document.webkitExitFullscreen ) {

            document.webkitExitFullscreen();

        } else if ( document.msExitFullscreen ) {

            document.msExitFullscreen();

        }

    }

    /** 
     * Handle a fullscreen transition.
     * NOTE: used .bind() to bind to this object.s
     */
    fullscreenChange ( evt ) {

        let c = this.gl.getCanvas();

        let p = c.parentNode;

        switch ( this.mode ) {

            case this.UI_VR:

                break;

            case this.UI_FULLSCREEN:

                console.log( 'from fullscreen to DOM...' );

                p.style.width = '';

                p.style.height = '';

                this.mode = this.UI_DOM;

                break;

            default:

            case this.UI_DOM:

                console.log( 'from DOM to fullscreen...' );

                this.mode = this.UI_FULLSCREEN;

                break;

        }


    }

}

// We put this here because of JSDoc(!).

export default Ui;