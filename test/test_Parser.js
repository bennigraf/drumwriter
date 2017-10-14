const assert = require('assert');

const Parser = require('../app/src/js/Parser.js');

describe('Parser', function() {
  
  describe('#findCurrentCodeblock', function() {
    it('parses an empty input correctly', function() {
      // cheap textareaMock - should be replaced with i.e. sinon.js at some point
      let textareaMock = {
        val: () => '',
        selectionStart: 0
      };
      
      let parser = new Parser();
      
      assert.deepEqual(
        parser.findCurrentCodeblock(textareaMock),
        [ ]
      );
    });
    
    it('parses a single line input correctly', function() {
      let textareaMock = {
        val: () => `abcd`,
        selectionStart: 0
      };
      
      let parser = new Parser();
      
      assert.deepEqual(
        parser.findCurrentCodeblock(textareaMock),
        [ 'abcd' ]
      );
    });
    
    it('parses a single line input with whitespace correctly', function() {
      let textareaMock = {
        val: () => `
abcd


`,
        selectionStart: 6
      };
      
      let parser = new Parser();
      
      assert.deepEqual(
        parser.findCurrentCodeblock(textareaMock),
        [ 'abcd' ]
      );
    });
    
    it('parses a multi line input correctly', function() {
      let textareaMock = {
        val: () => ` abs sckj saf fjek
=\`-- \`,,,
|kek s..d fsd .sf.
`,
        selectionStart: 25
      };
      
      let parser = new Parser();
      
      assert.deepEqual(
        parser.findCurrentCodeblock(textareaMock),
        [ 
          'abssckjsaffjek',
          '=\`--\`,,,',
          '|keks..dfsd.sf.'
        ]
      );
    });
    
    it('parses input with multiple blocks correctly', function() {
      
      var testParsingWithSelectionStartAt = function(selectionStart) {
        let textareaMock = {
          val: () => `thefirstblock
thesecondblock
|with a parallel line
thethirdblock`,
          selectionStart: selectionStart
        };

        var parser = new Parser();
        return parser.findCurrentCodeblock(textareaMock)
      }
      
      assert.deepEqual(
        testParsingWithSelectionStartAt(0),
        [ 'thefirstblock' ],
        'first block not found with selection at 0'
      );
      
      assert.deepEqual(
        testParsingWithSelectionStartAt(4),
        [ 'thefirstblock' ],
        'first block not found with selection at 4'
      );
      
      assert.deepEqual(
        testParsingWithSelectionStartAt(13),
        [ 'thefirstblock' ],
        'first block not found with selection at 13'
      );
      
      assert.deepEqual(
        testParsingWithSelectionStartAt(14),
        [ 'thesecondblock', '|withaparallelline' ],
        'second block not found with selection at 14'
      );
      
      assert.deepEqual(
        testParsingWithSelectionStartAt(24),
        [ 'thesecondblock', '|withaparallelline' ],
        'second block not found with selection at 24'
      );
      
      assert.deepEqual(
        testParsingWithSelectionStartAt(50),
        [ 'thesecondblock', '|withaparallelline' ],
        'second block not found with selection at 50'
      );
      
      assert.deepEqual(
        testParsingWithSelectionStartAt(51),
        [ 'thethirdblock' ],
        'third block not found with selection at 51'
      );
      
      assert.deepEqual(
        testParsingWithSelectionStartAt(58),
        [ 'thethirdblock' ],
        'third block not found with selection at 58'
      );
      
      assert.deepEqual(
        testParsingWithSelectionStartAt(64),
        [ 'thethirdblock' ],
        'third block not found with selection at 64'
      );
      
    });
  });
});