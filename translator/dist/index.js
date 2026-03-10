var _a, _b, _c, _d;
import { makeNewTranslationRecord, translateWord } from "./translationService.js";
import { findSuggestionsByTypo } from "./suggestionService.js";
import * as Locators from "./locators.js";
(_a = Locators.keyboardToggle) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    Locators.keyboard.classList.toggle('hidden');
});
(_b = Locators.searchButton) === null || _b === void 0 ? void 0 : _b.addEventListener('click', async () => {
    const translationResult = await translateWord(Locators.input.value);
    if (!translationResult)
        return;
    let { currentWord, translatedWord } = translationResult;
    makeNewTranslationRecord(currentWord, translatedWord);
    Locators.sourceWordDisplay.textContent = currentWord.value;
    Locators.translatedWordDisplay.textContent = translatedWord.value;
    let suggestedWords = await findSuggestionsByTypo(currentWord);
    fillInSuggestedWords(suggestedWords);
});
Locators.suggestedArea.addEventListener('click', async (event) => {
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
    Locators.sourceWordDisplay.textContent = currentWord.value;
    Locators.translatedWordDisplay.textContent = translatedWord.value;
});
(_c = Locators.shiftButton) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
    Locators.toggleShiftActive();
    toggleCapitalizeKeyboardLetters();
});
Locators.allKeys.forEach(key => {
    key === null || key === void 0 ? void 0 : key.addEventListener('click', () => {
        Locators.input.value += key.textContent;
    });
});
(_d = Locators.spaceButton) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => {
    Locators.input.value += ' ';
});
function fillInSuggestedWords(words) {
    const fragment = document.createDocumentFragment();
    words.forEach((word) => {
        const item = document.createElement('li');
        item.classList.add('chip');
        item.textContent = word;
        fragment.appendChild(item);
    });
    Locators.suggestedArea.replaceChildren(fragment);
}
function toggleCapitalizeKeyboardLetters() {
    if (Locators.isShiftActive) {
        Locators.shiftButton.classList.add('active');
        Locators.allKeys.forEach(key => {
            key.textContent = key.textContent.toUpperCase();
        });
    }
    else {
        Locators.shiftButton.classList.remove('active');
        Locators.allKeys.forEach(key => {
            key.textContent = key.textContent.toLowerCase();
        });
    }
}
//# sourceMappingURL=index.js.map