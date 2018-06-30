
function AudioEngine() {
  this.samplePlayers = new Tone.Players({
    b: 'e.mp3', // bassdrum
    t: 'k.mp3', // snare
    z: 'h.mp3' // HiHat
  }).toMaster();
}
module.exports = AudioEngine;

AudioEngine.prototype = {
  
  playInstrument: function(instrument, volume = -6) {
    console.log('playing in AudioEngine: ' + instrument, volume);

    try {
      this.samplePlayers.get(instrument).volume.value = volume;
      this.samplePlayers.get(instrument).start();
    } catch (e) {
      console.info('no player found for ' + instrument);
    }
    
  }
}
