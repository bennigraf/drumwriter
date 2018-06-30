
function Sequencer(audioEngine) {
  this._audioEngine = audioEngine;

  // an array of positions to track each sequence individually
  this.sequencePositions = [ ];

  Tone.Transport.seconds = 0;
  Tone.Transport.start();
  console.log("bpm", Tone.Transport.bpm.value);

  this.loop = new Tone.Loop((time) => {
    this.playAStep()
  }, '4n');
}
module.exports = Sequencer;

Sequencer.prototype = {

  playSequence: function(playable) {
    this.playable = playable;

    this.updateSequencePositionsObject();

    console.log('playing playable in Sequencer', playable);

    if (playable.specials.bpm !== undefined) {
      console.log("setting BPM in Sequencer", playable.specials.bpm);
      Tone.Transport.bpm.value = playable.specials.bpm;
    }

    if (this.loop.state === "stopped") {
      this.loop.start();
    }
  },

  updateSequencePositionsObject: function() {
    if (this.sequencePositions.length > this.playable.sequences.length) {
      this.sequencePositions = this.sequencePositions.slice(0, this.playable.sequences.length);
    } else if (this.sequencePositions.length < this.playable.sequences.length) {
      const missingElementsCount = this.playable.sequences.length - this.sequencePositions.length;
      this.sequencePositions = this.sequencePositions.concat(Array(missingElementsCount).fill(0));
    }
  },

  playAStep: function() {

    this.playable.sequences.forEach((sequenceObj, index) => {
      const main = sequenceObj.sequence;
      // make sure shortening a sequence doesn't break things: 
      const notePosition = this.sequencePositions[index] % main.length; 
      const char = main[notePosition];

      let volume = -6;
      if (sequenceObj.velocity !== undefined && sequenceObj.velocity.length > 0) {
        const veloCode = sequenceObj.velocity[notePosition % sequenceObj.velocity.length];
        switch (veloCode) {
          case ',': 
            volume = -10;
            break;
          case '`':
            volume = 0;
            break;
          case '*':
            volume = Math.random() * -10;
            break;
        }
      }
      this._audioEngine.playInstrument(char, volume);

      this.sequencePositions[index] = (this.sequencePositions[index] + 1) % main.length;
    })
  },

  stopAll: function() {
    console.log("stop");
    this.loop.stop();
    this.sequencePositions = [ ];
  }
}
