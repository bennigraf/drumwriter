
import Registry from './Registry.js';
import AudioEngine from './AudioEngine.js';
import InputController from './InputController.js';

export default App;

function App() {

}

App.prototype = {
	boot: function() {
		// central/global registry for app stuff
		this.registry = new Registry();
		this.reg = this.registry;

		this.audioEngine = new AudioEngine(this.registry);
		this.registry.audioEngine = this.audioEngine;

	    var inputController = new InputController(this.registry);
	    this.inputController = inputController;
	    this.inputController.bindToDom();
	    
	    inputController.helloWorld();

	    // Todo:
	    //  - get rid of registry somehow
	    //  - Add:
	    // 		- Parser (that does findCurrentCodeBlock etc.) and creates a:
	    // 		- Playable (that uses the code block and understands what needs to be played) and
	    // 		- AudioController (that orchestrates stuff/does the scheduling/sequencing) while the
	    // 		- AudioEngine is solely responsible for actual making the noises (basically
	    // 		  a sample player)
	},
}