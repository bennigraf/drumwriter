
function Playable(codeBlock) {
  this.sequences = [ ];
  this.specials = { };
  
  this.constructFromCodeblock(codeBlock);
}
module.exports = Playable;

Playable.prototype = {
  
  constructFromCodeblock: function(codeBlock) {
    let sequenceCounter = 0;
    for (i in codeBlock) {
      let line = codeBlock[i];
      
      if (line.substring(0, 4) == '@bpm') {
        this.tryToSetBpmFromLine(line);
        continue;
      }
      if (line[0] == '|' || line[0] == '=') {
        // ignore those for now
        continue;
      }
      
      // ...else: this is a regular line...
      this.sequences.push({
        sequence: line
      });
      sequenceCounter += 1;
    }
  },
  
  tryToSetBpmFromLine: function(line) {
    let res = /@bpm\s*([0-9]+(\.[0-9]+)?)/.exec(line);
    if (res !== null) {
      if (res.length > 2 && !isNaN(res[1])) {
        let bpm = parseFloat(res[1]);
        if (bpm >= 5 && bpm <= 500) {
          this.specials.bpm = bpm;
        }
      }
    }
  }
  
}
