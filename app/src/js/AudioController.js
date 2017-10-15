
function AudioController(audioEngine) {
  this._audioEngine = audioEngine;
  this.sequencePosition = 0;
}
module.exports = AudioController;

AudioController.prototype = {
  
  playBlock: function(playable) {
    this.currentBlock = playable;
    
    console.log('playing', playable.sequences[0].sequence);
    
    if (playable.specials.bpm !== undefined) {
      Tone.Transport.bpm.value = playable.specials.bpm;
    }
    
    if (Tone.Transport.state != "started") {
      Tone.Transport.start();
    }
    
    this.nextEvent = this.scheduleNextEvent();
  },
  
  scheduleNextEvent: function() {
    const mainLine = this.currentBlock.sequences[0].sequence;
    const char = mainLine[this.sequencePosition];
    
    // const nextTime = Tone.Transport.nextSubdivision('8n');
    const nextTime = '+4n';
    const nextEvent = Tone.Transport.scheduleOnce(() => {
      this._audioEngine.playInstrument(char);
      this.nextEvent = this.scheduleNextEvent();
    }, nextTime);
    
    this.sequencePosition = (this.sequencePosition + 1) % mainLine.length;
    
    return nextEvent;
  },
  
  stopAll: function() {
    console.log("stop");
    Tone.Transport.clear(this.nextEvent);
    this.nextEvent = null;
    this.sequencePosition = 0;
    Tone.Transport.stop();
  }
}