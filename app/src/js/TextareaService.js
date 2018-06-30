const TextareaService = { }
export default TextareaService;

TextareaService.getContentAndPositionObject = function($textarea) {
    return {
        content: $textarea.val(),
        cursorPosition: $textarea[0].selectionStart
    }
}
