
function AudioEngine() {
  this.bass = new Tone.Player('e.mp3').toMaster();
  this.snare = new Tone.Player('k.mp3').toMaster();
}
module.exports = AudioEngine;

AudioEngine.prototype = {
  
  playInstrument: function(instrument) {
    console.log('playing ' + instrument);
    switch (instrument) {
    case 'b':
      this.bass.start();
      break;
    case 't':
      this.snare.start();
    }
  }
  
  // play: function() {
//
//     this.bassBeat = Tone.Transport.scheduleRepeat(() => {
//         console.log("bass!");
//         this.bass.start();
//     }, 1);
//     console.log(this.bassBeat);
//   },
//
//   stop: function() {
//       console.log("stop");
//       Tone.Transport.clear(this.bassBeat);
//       Tone.Transport.stop();
//   }
}