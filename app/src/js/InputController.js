import Playable from './Playable.js';

function InputController(parser, audioController, audioEngine) {
    this._audioEngine = audioEngine;
    this._parser = parser;
    this._audioController = audioController;
}
export default InputController;

InputController.prototype = {

    bindToDom: function () {
        this.$textarea = Zepto('#themachine textarea');

        this.setupInputEvent();
    },

    setupInputEvent: function() {
        this.$textarea.on('keydown', (e) => {
            // console.log("keydown!");
            // console.log(e);
            // return false;
            return this.keydownEvent(e);
        });
    },
    
    helloWorld: function() {
        console.log("Hello Controller!", this);
    },
    
    /**
     * Handles a keydown event on the textarea. Result is being passed
     * to orgininal event handler so returning false prevents action from
     * happening.
     */
    keydownEvent: function(event) {
        console.log(event.key, event.ctrlKey);
        
        // actions:
        // - on ctrl+enter, parse current block and run synth with it
        //   - (if synth is not running, start it)
        // - on ".", stop (should be ctrl+., but that doesn't work for some reason)
 
        if (event.key == "Enter" && event.ctrlKey) {
            console.log("===== play");
            
            const codeBlock = this._parser.findCurrentCodeblock(this.$textarea);
            const playable = new Playable(codeBlock);
            console.log(playable);
            
            this._audioController.playBlock(playable);
            
            // this._audioEngine.play();
            
            return false;
        }
 
        if (event.key == ".") {
            console.log("stahp");
            // this._audioEngine.stop();
            this._audioController.stopAll();
            return false;
        }
        
    },
}