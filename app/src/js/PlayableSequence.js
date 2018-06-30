/**
 * A playaple sequence can be passed to the Sequencer, who then knows how to play
 * something on the audioEngine using that. It contains a set of sequences and
 * an optional set of special commands.
 * 
 * It's passed the result of Parser.findCurrentCodeblock, which returns an array of 
 * lines of the current codeblock.
 * 
 * @param {Array} codeBlock 
 */
function PlayableSequence(codeBlock) {
  /**
   * A sequence is an object with a main line and some modificator lines (like velocity).
   * There can be multiple parallel sequences in a PlayableSequence.
   * i.e.
   * {
   *   sequence: 'asdf',
   *   velocity: ' `  '
   * }
   */
  this.sequences = [ ];
  this.specials = { };
  
  this.constructFromCodeblock(codeBlock);
}
module.exports = PlayableSequence;

PlayableSequence.prototype = {
  
  constructFromCodeblock: function(codeBlock) {
    // step through lines of code and collect sequences with their modificators 
    let aSequence = { };
    for (i in codeBlock) {
      let line = codeBlock[i];
      
      // check if line is something superspecial
      if (line.substring(0, 4) == '@bpm') {
        this.tryToGetBpmFromLine(line);
        continue;
      }

      // check for velocity line
      if (line[0] === '=') {
        aSequence.velocity = line.substring(1)
        continue;
      }

      // check for parallel sequence (which pushes the currently "built" sequence on the sequences "stack")
      if (line[0] == '|') {
        this.sequences.push(aSequence);
        aSequence = {
          sequence: line.substring(1)
        }
        continue;
      }
      
      // ...else: this is a "main sequence" line...
      aSequence.sequence = line;
    }
    this.sequences.push(aSequence);
  },
  
  tryToGetBpmFromLine: function(line) {
    const bpmRegex = /@bpm\s*([1-9][0-9]+(\.[0-9]+)?)/;
    let res = bpmRegex.exec(line);
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
