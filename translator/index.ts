import { makeNewWord } from "./wordService.js";
import { determineInputLanguage, makeNewTranslationRecord, translateWord} from "./translationService.js";
import { findSuggestions, findSuggestionsByTypo} from "./suggestionService.js"
import { getSuggestedImages } from "./imageService.js"
import * as Locators from "./locators.js"
import { ImageDTO } from "./types.js";
import { findWordByLanguage } from "./helpers.js";





Locators.keyboardToggle?.addEventListener('click', () => {
    Locators.keyboard.classList.toggle('hidden');
});

Locators.searchButton?.addEventListener('click', async () => {
    const translationResult = await translateWord(Locators.input.value)
    if (!translationResult) return;
    let { currentWord, translatedWord } = translationResult
    makeNewTranslationRecord(currentWord,translatedWord)    
        Locators.sourceWordDisplay.textContent = currentWord.value;
        Locators.translatedWordDisplay.textContent = translatedWord.value;
    let suggestedWords : string [] = await findSuggestionsByTypo(currentWord)
    fillInSuggestedWords(suggestedWords);
    let englishWord = findWordByLanguage('en', currentWord, translatedWord)
    let suggestedImages : ImageDTO[] = await getSuggestedImages(englishWord.value,2,true)
    fillInSuggestedImages(suggestedImages)
});


Locators.suggestedArea.addEventListener('click', async (event) => {
    const clickedArea = event.target as HTMLElement
    const chip = clickedArea.closest('.chip') as HTMLElement | null;
        if (!chip) return;
    const suggestedWord = chip.textContent?.trim();
        if (!suggestedWord) return;
    const translationResult = await translateWord(suggestedWord)
        if (!translationResult) return;
    let { currentWord, translatedWord } = translationResult
    makeNewTranslationRecord(currentWord,translatedWord)    
        Locators.sourceWordDisplay.textContent = currentWord.value;
        Locators.translatedWordDisplay.textContent = translatedWord.value;
    let englishWord = findWordByLanguage('en', currentWord, translatedWord)
    let suggestedImages : ImageDTO[] = await getSuggestedImages(englishWord.value,2,true)
    fillInSuggestedImages(suggestedImages)
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


function fillInSuggestedWords (words : string[]) {
    const fragment = document.createDocumentFragment();

    words.forEach((word) => {
        const item = document.createElement('li');
        item.classList.add('chip');
        item.textContent = word;
        fragment.appendChild(item);
    });

    Locators.suggestedArea.replaceChildren(fragment);
}

function fillInSuggestedImages (images : ImageDTO[]) {
    const fragment = document.createDocumentFragment();

    images.forEach(image => {
        const item = document.createElement('li');
        item.classList.add('image-item');

        const img = document.createElement('img')
            img.src = image.urlSmall;
            img.alt = image.wordValue;
        item.appendChild(img);
        fragment.appendChild(item)
    });

    Locators.imagesArea.replaceChildren(fragment);
}

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
