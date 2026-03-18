import { makeNewWord } from "./services/wordService.js";
import { determineInputLanguage, makeNewTranslationRecord, translateWord} from "./services/translationService.js";
import { findSuggestions, findSuggestionsByTypo} from "./services/suggestionService.js"
import { getSuggestedImages } from "./services/imageService.js"
import * as Locators from "./locators.js"
import { ImageDTO, Translation, Word } from "./types.js";
import { findWordByLanguage, renderCard, renderImages, renderSuggestedWords, renderTranslation } from "./helpers.js";
import { createCard } from './services/cardService.js'


let currentTranslation : Translation = null
let currentImages : ImageDTO[] = []
let currentSuggestedWords : string[] = []

Locators.keyboardToggle?.addEventListener('click', () => {
    Locators.keyboard.classList.toggle('hidden');
});

Locators.searchButton?.addEventListener('click', async () => {
    const translationResult = await translateWord(Locators.input.value)
    if (!translationResult) return;
    currentTranslation = translationResult
    renderTranslation(translationResult)
    //currentSuggestedWords = await renderSuggestedWords(translationResult),
    //currentImages = await renderImages(translationResult)    
    const [suggestedWords, images] = await Promise.all([
        renderSuggestedWords(translationResult),
        renderImages(translationResult)
    ])
    currentSuggestedWords = suggestedWords
    currentImages = images
    renderCard(currentTranslation,currentImages[0])
});


Locators.suggestedArea.addEventListener('click', async (event) => {
    const clickedArea = event.target as HTMLElement
    const chip = clickedArea.closest('.chip') as HTMLElement | null;
        if (!chip) return;
    const suggestedWord = chip.textContent?.trim();
        if (!suggestedWord) return;
    const translationResult = await translateWord(suggestedWord)
    currentTranslation = translationResult
        if (!translationResult) return;
    renderTranslation(translationResult)
    //may put renderSuggestedWords here in case needed
    currentImages = await renderImages(translationResult)
    renderCard(currentTranslation,currentImages[0])
})

Locators.makeCardButton.addEventListener('click', async () => {
    const newCard  = await createCard(currentTranslation, currentImages[0])
    console.log(newCard)
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
