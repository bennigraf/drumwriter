const assert = require('assert');

import Parser from '../app/src/js/Parser.js';

describe('Parser', function() {
  
  describe('#findCurrentCodeblock', function() {
    it('parses an empty input correctly', function() {
      
      const textareaObj = {
        content: '',
        cursorPosition: 0
      };
      
      const parser = new Parser();
      
      assert.deepEqual(
        parser.findCurrentCodeblock(textareaObj),
        [ ]
      );
    });
    
    it('parses a single line input correctly', function() {
      const textareaObj = {
        content: `abcd`,
        cursorPosition: 0
      };
      
      const parser = new Parser();
      
      assert.deepEqual(
        parser.findCurrentCodeblock(textareaObj),
        [ 'abcd' ]
      );
    });
    
    it('parses a single line input with whitespace correctly', function() {
      let textareaObj = {
        content: `
abcd


`,
        cursorPosition: 6
      };
      
      let parser = new Parser();
      
      assert.deepEqual(
        parser.findCurrentCodeblock(textareaObj),
        [ 'abcd' ]
      );
    });
    
    it('parses a multi line input correctly', function() {
      let textareaObj = {
        content: ` abs sckj saf fjek
=\`-- \`,,,
|kek s..d fsd .sf.
`,
        cursorPosition: 25
      };
      
      let parser = new Parser();
      
      assert.deepEqual(
        parser.findCurrentCodeblock(textareaObj),
        [ 
          'abssckjsaffjek',
          '=\`--\`,,,',
          '|keks..dfsd.sf.'
        ]
      );
    });
    
    it('parses input with multiple blocks correctly', function() {
      
      const textareaObj = {
        content: `thefirstblock
thesecondblock
|with a parallel line

thethirdblock`,
        cursorPosition: 0
      };

      function testParsingWithCursorPositionAt(cursorPosition) {
        var parser = new Parser();
        textareaObj.cursorPosition = cursorPosition;
        return parser.findCurrentCodeblock(textareaObj)
      }
      
      assert.deepEqual(
        testParsingWithCursorPositionAt(0),
        [ 'thefirstblock' ],
        'first block not found with selection at 0'
      );
      
      assert.deepEqual(
        testParsingWithCursorPositionAt(4),
        [ 'thefirstblock' ],
        'first block not found with selection at 4'
      );
      
      assert.deepEqual(
        testParsingWithCursorPositionAt(13),
        [ 'thefirstblock' ],
        'first block not found with selection at 13'
      );
      
      assert.deepEqual(
        testParsingWithCursorPositionAt(14),
        [ 'thesecondblock', '|withaparallelline' ],
        'second block not found with selection at 14'
      );
      
      assert.deepEqual(
        testParsingWithCursorPositionAt(24),
        [ 'thesecondblock', '|withaparallelline' ],
        'second block not found with selection at 24'
      );
      
      assert.deepEqual(
        testParsingWithCursorPositionAt(50),
        [ 'thesecondblock', '|withaparallelline' ],
        'second block not found with selection at 50'
      );
      
      assert.deepEqual(
        testParsingWithCursorPositionAt(52),
        [ 'thethirdblock' ],
        'third block not found with selection at 52'
      );
      
      assert.deepEqual(
        testParsingWithCursorPositionAt(58),
        [ 'thethirdblock' ],
        'third block not found with selection at 58'
      );
      
      assert.deepEqual(
        testParsingWithCursorPositionAt(64),
        [ 'thethirdblock' ],
        'third block not found with selection at 64'
      );
      
    });

    it('parsers a complex multi input correctly', () => {
      const textareaObj = {
        content: `# Start typing here!

 b.t.bbt.
=-,
|z
=*
@bpm 120


 bb.bt...b.b.t...
=-,
|z
=*
@bpm 240

`,
        cursorPosition: 0
      };

      function testParsingWithTextarea(textareaObj) {
        var parser = new Parser();
        return parser.findCurrentCodeblock(textareaObj)
      }

      for (let cursorPosition = 0; cursorPosition <= 52; cursorPosition++) {
        textareaObj.cursorPosition = cursorPosition;
        assert.deepEqual(
          testParsingWithTextarea(textareaObj),
          [ 'b.t.bbt.', '=-,', '|z', '=*', '@bpm120' ],
          'Complex parsing error, expected first code block for cursorPosition ' + cursorPosition
        );
      }

      for (let cursorPosition = 53; cursorPosition <= 91; cursorPosition++) {
        textareaObj.cursorPosition = cursorPosition;
        assert.deepEqual(
          testParsingWithTextarea(textareaObj),
          [ 'bb.bt...b.b.t...', '=-,', '|z', '=*', '@bpm240' ],
          'Complex parsing error, expected second code block for cursorPosition ' + cursorPosition
        );
      }
      
    });
  });
});
