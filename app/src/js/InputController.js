import PlayableSequence from'./PlayableSequence';
import TextareaService from './TextareaService';

const eventstop = require('eventstop')();

function InputController(parser) {
    this._parser = parser;
}
export default InputController;

InputController.prototype = {
    on: eventstop.on,
    off: eventstop.off,
    emit: eventstop.emit,

    bindToDom: function () {
        this.$textarea = Zepto('#themachine textarea');
        this.$textarea.focus();
        
        this.setupInputEvent();
    },

    setupInputEvent: function() {
        this.$textarea.on('keydown', (e) => {
            // console.log(e);
            return this.handleKeydownEvent(e);
        });
    },
    
    /**
     * Handles a keydown event on the textarea. Result is being passed
     * to orgininal event handler so returning false prevents action from
     * happening.
     */
    handleKeydownEvent: function(event) {
        console.log(event);
        console.log(event.key, event.ctrlKey);
        
        // actions:
        // - on ctrl+enter, parse current block and generate playabale
        //   - emit 'playSequence' with that playable
        // - on ctrl+., emit 'stopAll'
 
        if (event.key === "Enter" && event.ctrlKey) {
            const normalizedTaContent = TextareaService.getContentAndPositionObject(this.$textarea);
            const codeBlock = this._parser.findCurrentCodeblock(normalizedTaContent);
            const playable = new PlayableSequence(codeBlock);
            this.emit('playSequence', playable);
            
            return false;
        }
 
        if (event.keyCode === 190 && event.ctrlKey) {
            this.emit('stopAll');

            return false;
        }
    },
}
