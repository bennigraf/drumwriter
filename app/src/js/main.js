
/** Some resources are loaded "statically" – ToDo: use webpack properly for this... */
require('file-loader?name=index.html!../index.html');
require('file-loader?name=css/normalize.css!../css/normalize.css');
require('file-loader?name=css/style.css!../css/style.css');
require('file-loader?name=js/lib/zepto.min.js!./lib/zepto.min.js');

import Controller from './Controller.js';
import AudioEngine from './AudioEngine.js';

// runs when page is ready
Zepto(function() {

    let $textarea = $('#themachine textarea');
    
    let controller = new Controller($textarea[0]);
    controller.helloWorld();
    
    // load events on textarea
    
    $textarea.on('keydown', function(e) {
        // console.log("keydown");
        // console.log(e);
        // return false;
        return controller.keydownEvent(e);
    });
    
    $textarea.on('change', function() {
        // console.log('change');
    });
    
    /**
     * Todo:
     *  - Handle textarea key input and send to synth controller
     *  - Controller handles key input events from textarea, controls AudioEngine
     *  - AudioEngine controls sound output (via Tone.js)
     */
    
})