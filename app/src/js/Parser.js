function Parser() {
  
}
module.exports = Parser;

Parser.prototype = {
    /**
     * Start with definitions/"statics"
     */
    controlChars: {
        '#': 'COMMENT',
        '|': 'PLAYALONG',
        '=': 'VELOCITY',
        '+': 'PITCH',
        '@': 'COMMAND',
        // '?': 'RANDOM'
    },
    
    /**
     * Finds the current code block surrounding the cursor position. Could be a single line only.
     * Strategy:
     *  - White space (= empty lines) are ignored, just as comments (lines starting with a #)
     *  - A code block consists of one main rhythm line ("main score") (containing letters which define a sequence
     *    of instruments/beats) and multiple "sub lines" ("sub scores") which control the behaviour of the main
     *    line or add another simultaneous track, depending on the control char
     *  - the first char of the line controls it's purpose. The main line is defined by the absence of a control char 
     *    (for simplicity). 
     *  - The code block extends above the current line until a main line is found and below the current line until
     *    the next main line.
     *  - control chars are:
     *      - "#": defines a comment (the line is to be ignored)
     *      - "|": A score line that is to be played along with the current main line
     *      - "=": A velocity score
     *      - "@": A command, i.e. to set the tempo/bpm
     *      - others TBD. Maybe a pitch score?
     * */
    findCurrentCodeblock: function(textareaObj) {
        var fullContent = textareaObj.content;
        var selectionStart = textareaObj.cursorPosition;
        var cursorLineNumber = fullContent.substr(0, selectionStart).split("\n").length - 1; // first line is line 0
        var allLines = fullContent.split("\n");
        
        // find code block start by stepping backwards through all lines searching for a non-empty line not starting with
        //   a special character.
        // white space before and after the line is ignored.
        var codeBlockStart = null;
        var mainLine = null;
        for (let i = cursorLineNumber; i >= 0; i--) {
            var line = allLines[i].trim();
            if (line[0] !== undefined && this.controlChars[line[0]] === undefined) {
                codeBlockStart = i;
                mainLine = i;
                break;
            }
        }
        // if no start line was found above the cursor, the start is the beginning of the textarea and the main line must
        //   be found while searching for the codeBlockEnd
        if (codeBlockStart === null) {
            codeBlockStart = 0;
        }
        
        // find code block end by searching for the next non-empty line not starting with a special character
        var codeBlockEnd = null;
        for (let i = codeBlockStart + 1; i < allLines.length; i++) {
            var line = allLines[i].trim();
            if (line[0] !== undefined && this.controlChars[line[0]] === undefined) {
                // if main line was found already, this is the end. Otherwise, we have to continue our search.
                if (mainLine !== null) {
                    codeBlockEnd = i - 1;
                    break;
                } else {
                    mainLine = i;
                }
            }
        }
        if (codeBlockEnd === null) {
            codeBlockEnd = allLines.length - 1;
        }
        
        // trim whitespace from whithin each line
        for (let i in allLines) {
            allLines[i] = allLines[i].replace(/\s/g, '');
        }
        
        // now collect all lines in the code block that are important (ignoring empty and comment lines)
        // todo: Make a code block object from that which contains the parsing logic and defines
        //   the main line etc. as special keys...
        var codeBlockLines = [];
        for (let i = codeBlockStart; i <= codeBlockEnd; i++) {
            var line = allLines[i];
            if (line[0] !== undefined && line[0] !== '#') {
                codeBlockLines.push(line);
            }
        }
        
        return codeBlockLines;
    }
}