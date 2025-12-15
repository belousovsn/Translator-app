var currentWord = null;
//set the word from the input
function setWord(value, language) {
    value = value.trim();
    return {
        id: crypto.randomUUID(),
        value: value,
        language: language,
        translation_id: null
    };
}
var input = document.querySelector('#searchInput');
var button = document.querySelector('#searchBtn');
button === null || button === void 0 ? void 0 : button.addEventListener('click', function () {
    currentWord = setWord(input.value, "en");
    console.log(currentWord);
});
//# sourceMappingURL=index.js.map