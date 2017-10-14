
/** Some resources are loaded "statically" – ToDo: use webpack properly for this... */
require('file-loader?name=index.html!../index.html');
require('file-loader?name=css/normalize.css!../css/normalize.css');
require('file-loader?name=css/style.css!../css/style.css');
require('file-loader?name=js/lib/zepto.min.js!./lib/zepto.min.js');
require('file-loader?name=a.mp3!../assets/audio/a.mp3');
require('file-loader?name=e.mp3!../assets/audio/e.mp3');
require('file-loader?name=k.mp3!../assets/audio/k.mp3');

import App from './App.js';

// runs when page is ready
Zepto(function() {
    console.log("Hello Machine!");

    var app = new App();
    app.boot();
        
    // $textarea.on('change', function() {
        // console.log('change');
    // });
    
    /**
     * Todo:
     *  - Handle textarea key input and send to synth controller
     *  - InputController handles key input events from textarea, controls AudioEngine
     *  - AudioEngine controls sound output (via Tone.js)
     */  
});
