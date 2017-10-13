
/** Some resources are loaded "statically" – ToDo: use webpack properly for this... */
require('file-loader?name=index.html!../index.html');
require('file-loader?name=css/normalize.css!../css/normalize.css');
require('file-loader?name=css/style.css!../css/style.css');
require('file-loader?name=js/lib/zepto.min.js!./lib/zepto.min.js');
require('file-loader?name=a.mp3!../assets/audio/a.mp3');

import Controller from './Controller.js';
import AudioEngine from './AudioEngine.js';
import Registry from './Registry.js';

// central/global registry for app stuff
var registry = new Registry();
var reg = registry;

// runs when page is ready
Zepto(function() {
    console.log("Hello Machine!");
    
    let audioEngine = new AudioEngine(registry);
    registry.audioEngine = audioEngine;

    let $textarea = $('#themachine textarea');
    
    let controller = new Controller(registry, $textarea[0]);
    registry.controller = controller;
    
    controller.helloWorld();
    
    // load events on textarea
    
    $textarea.on('keydown', function(e) {
        console.log("keydown!");
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
});
