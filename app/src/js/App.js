
// import Bottle from 'Bottlejs'; // doesn't work with CircleCI?!
import Bottle from '../../../node_modules/bottlejs';

import InputController from './InputController.js';
import Parser from './Parser.js';
import PlayableSequence from './PlayableSequence';
import AudioEngine from './AudioEngine.js';
import Sequencer from './Sequencer';

export default App;

function App() {
  this.bottle = new Bottle();
  this.boot();
}

App.prototype = {
	boot: function() {
		// central/global registry for app stuff
    this.setupBottle();
    this._sequencer = this.bottle.container.Sequencer;

    const inputController = this.bottle.container.InputController;
    inputController.bindToDom();
    inputController.on('playSequence', (sequence) => {
      this._sequencer.playSequence(sequence);
    });
    inputController.on('stopAll', () => {
      this._sequencer.stopAll();
    });

    // Todo:
    //  - get rid of registry somehow (but I don't remember why)
    //  - Add:
    // 		- ✅ Parser (that does findCurrentCodeBlock etc.) and creates a:
    // 		- ✅ PlayableSequence (that parses that code block and is an easily digestable object for the Sequencer)
    // 		- ✅ Sequencer (that orchestrates stuff/does the scheduling/sequencing when getting a PlayableSequence)
    // 		- ✅ AudioEngine is solely responsible for actual making the noises (basically a sample player)
    //    - Tests!
	},
  
  setupBottle: function() {
    this.bottle.service('Parser', Parser);
    this.bottle.service('PlayableSequence', PlayableSequence);
    this.bottle.service('Sequencer', Sequencer, 'AudioEngine');
    this.bottle.service('AudioEngine', AudioEngine);
    this.bottle.service('InputController', InputController, 'Parser');
  }
}