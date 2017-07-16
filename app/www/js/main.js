
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