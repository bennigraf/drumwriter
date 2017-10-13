
function AudioEngine() {
    this.bass = new Tone.Player('a.mp3').toMaster();
}
module.exports = AudioEngine;

AudioEngine.prototype = {
    play: function() {
        Tone.Transport.start();
        var loop = new Tone.Loop(function() {
            console.log("bass!");
            this.bass.start();
        }.bind(this), 1);
        loop.start();
    }
}