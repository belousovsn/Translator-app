import { makeNewTranslationRecord, translateWord, filterOutRealWords } from "./translationService.js";
import { findSuggestionsByTypo, findSimilarWordsByTypo } from "./suggestionService.js";
const input = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchBtn');
const shiftButton = document.querySelector('.shift-key');
const spaceButton = document.querySelector('.space-key');
const allKeys = document.querySelectorAll('.key:not(.shift-key):not(.space-key)');
let isShiftActive = shiftButton.classList.contains('active');
const keyboardToggle = document.querySelector('#keyboardToggle');
const keyboard = document.querySelector('#armenianKeyboard');
keyboardToggle === null || keyboardToggle === void 0 ? void 0 : keyboardToggle.addEventListener('click', () => {
    keyboard.classList.toggle('hidden');
});
const sourceWordDisplay = document.querySelector('.source-word');
const translatedWordDisplay = document.querySelector('.translated-word');
const suggestedArea = document.querySelector('.chips');
function fillInSuggestedWords(words) {
    const fragment = document.createDocumentFragment();
    words.forEach((word) => {
        const item = document.createElement('li');
        item.classList.add('chip');
        item.textContent = word;
        fragment.appendChild(item);
    });
    suggestedArea.replaceChildren(fragment);
}
searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener('click', async () => {
    let tempArray = findSimilarWordsByTypo(input.value);
    console.log(tempArray);
    let tempRealArray = await filterOutRealWords(tempArray);
    console.log(tempRealArray);
    const translationResult = await translateWord(input.value);
    if (!translationResult)
        return;
    let { currentWord, translatedWord } = translationResult;
    makeNewTranslationRecord(currentWord, translatedWord);
    sourceWordDisplay.textContent = currentWord.value;
    translatedWordDisplay.textContent = translatedWord.value;
    let suggestedWords = await findSuggestionsByTypo(currentWord);
    fillInSuggestedWords(suggestedWords);
});
suggestedArea.addEventListener('click', async (event) => {
    var _a;
    const clickedArea = event.target;
    const chip = clickedArea.closest('.chip');
    if (!chip)
        return;
    const suggestedWord = (_a = chip.textContent) === null || _a === void 0 ? void 0 : _a.trim();
    if (!suggestedWord)
        return;
    const translationResult = await translateWord(suggestedWord);
    if (!translationResult)
        return;
    let { currentWord, translatedWord } = translationResult;
    makeNewTranslationRecord(currentWord, translatedWord);
    sourceWordDisplay.textContent = currentWord.value;
    translatedWordDisplay.textContent = translatedWord.value;
});
shiftButton === null || shiftButton === void 0 ? void 0 : shiftButton.addEventListener('click', () => {
    console.log('the shift button is pressed');
    isShiftActive = !isShiftActive;
    if (isShiftActive) {
        shiftButton.classList.add('active');
        allKeys.forEach(key => {
            key.textContent = key.textContent.toUpperCase();
        });
    }
    else {
        shiftButton.classList.remove('active');
        allKeys.forEach(key => {
            key.textContent = key.textContent.toLowerCase();
        });
    }
});
allKeys.forEach(key => {
    key === null || key === void 0 ? void 0 : key.addEventListener('click', () => {
        input.value += key.textContent;
    });
});
spaceButton === null || spaceButton === void 0 ? void 0 : spaceButton.addEventListener('click', () => {
    input.value += ' ';
});
//# sourceMappingURL=index.js.map