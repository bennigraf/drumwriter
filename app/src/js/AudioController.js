
function AudioController(audioEngine) {
  this._audioEngine = audioEngine;
  this.sequencePosition = 0;
}
module.exports = AudioController;

AudioController.prototype = {
  
  playBlock: function(block) {
    this.currentBlock = block;
    
    const mainLine = block[0];
    console.log('playing', mainLine);
    
    if (Tone.Transport.state != "started") {
      Tone.Transport.start();
    }
    
    this.nextEvent = this.scheduleNextEvent();
  },
  
  scheduleNextEvent: function() {
    const mainLine = this.currentBlock[0];
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