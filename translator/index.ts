import { makeNewWord } from "./services/wordService.js";
import { determineInputLanguage, makeNewTranslationRecord, translateWord} from "./services/translationService.js";
import { findSuggestions, findSuggestionsByTypo} from "./services/suggestionService.js"
import { getSuggestedImages } from "./services/imageService.js"
import * as Locators from "./locators.js"
import { ImageDTO } from "./types.js";
import { findWordByLanguage, renderImages, renderSuggestedWords, renderTranslation } from "./helpers.js";





Locators.keyboardToggle?.addEventListener('click', () => {
    Locators.keyboard.classList.toggle('hidden');
});

Locators.searchButton?.addEventListener('click', async () => {
    const translationResult = await translateWord(Locators.input.value)
    if (!translationResult) return;
    renderTranslation(translationResult)
    await Promise.all([
        renderSuggestedWords(translationResult),
        renderImages(translationResult)
    ])
    
});


Locators.suggestedArea.addEventListener('click', async (event) => {
    const clickedArea = event.target as HTMLElement
    const chip = clickedArea.closest('.chip') as HTMLElement | null;
        if (!chip) return;
    const suggestedWord = chip.textContent?.trim();
        if (!suggestedWord) return;
    const translationResult = await translateWord(suggestedWord)
        if (!translationResult) return;
    renderTranslation(translationResult)
    //may put renderSuggestedWords here in case needed
    await renderImages(translationResult)
})

Locators.shiftButton?.addEventListener('click', () => {
    Locators.toggleShiftActive()
    toggleCapitalizeKeyboardLetters()
})
Locators.allKeys.forEach(key => {
    key?.addEventListener('click', () => {
    Locators.input.value += key.textContent
})})

Locators.spaceButton?.addEventListener('click', () => {
    Locators.input.value += ' '
})






function toggleCapitalizeKeyboardLetters() {
    if (Locators.isShiftActive) {
        Locators.shiftButton.classList.add('active');
        Locators.allKeys.forEach(key => {
            key.textContent = key.textContent.toUpperCase()
        })}
    else {
        Locators.shiftButton.classList.remove('active');
        Locators.allKeys.forEach(key => {
            key.textContent = key.textContent.toLowerCase()
        })
    }
}
