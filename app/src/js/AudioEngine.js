
function AudioEngine() {
    this.bass = new Tone.Player('a.mp3').toMaster();
}
module.exports = AudioEngine;

AudioEngine.prototype = {
    play: function() {
        Tone.Transport.start();
        
        this.bassBeat = Tone.Transport.scheduleRepeat(() => {
            console.log("bass!");
            this.bass.start();
        }, 1);
        console.log(this.bassBeat);
    },
    
    stop: function() {
        console.log("stop");
        Tone.Transport.clear(this.bassBeat);
        Tone.Transport.stop();
    }
}