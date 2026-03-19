import { translateWord} from "./services/translationService.js";
import * as Locators from "./locators.js"
import { ImageDTO, Translation, Card } from "./types.js";
import { renderCard, renderImages, renderSuggestedWords, renderTranslation } from "./helpers.js";
import { createCard, saveCardToDB } from './services/cardService.js'
import { initAuthController } from './view/authController.js'

await initAuthController()


let currentTranslation : Translation = null
let currentImages : ImageDTO[] = []
let currentSuggestedWords : string[] = []
let currentCard : Card = null

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
    currentCard = createCard(currentTranslation, currentImages[0])
    renderCard(currentCard)
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
    currentCard = createCard(currentTranslation, currentImages[0])
    renderCard(currentCard)
})

Locators.makeCardButton.addEventListener('click', async () => {
    const saveCardResult = await saveCardToDB(currentCard)

    console.log(saveCardResult)
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
