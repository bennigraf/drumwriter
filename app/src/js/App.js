
import AudioEngine from './AudioEngine.js';
import InputController from './InputController.js';
import Bottle from 'Bottlejs';

export default App;

function App() {
  this.bottle = new Bottle();
}

App.prototype = {
	boot: function() {
		// central/global registry for app stuff
    this.setupBottle();

    const inputController = this.bottle.container.InputController;
    inputController.bindToDom();
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
  
  setupBottle: function() {
    this.bottle.service('AudioEngine', AudioEngine);
    this.bottle.service('InputController', InputController, 'AudioEngine');
  }
}