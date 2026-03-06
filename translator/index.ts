import { makeNewWord } from "./wordService.js";
import { determineInputLanguage, makeNewTranslation, translateWordAPI } from "./translationService.js";
import { Language } from "./types.js";
import { findSuggestions } from "./suggestionService.js"




const input = document.querySelector('#searchInput') as HTMLInputElement;
const searchButton = document.querySelector('#searchBtn');
const shiftButton = document.querySelector('.shift-key') as HTMLButtonElement;
const spaceButton = document.querySelector('.space-key') as HTMLButtonElement;
const allKeys = document.querySelectorAll('.key:not(.shift-key):not(.space-key)');
let isShiftActive = shiftButton.classList.contains('active') as boolean;
const sourceWordDisplay = document.querySelector('.source-word') as HTMLSpanElement;
const translatedWordDisplay = document.querySelector('.translated-word') as HTMLSpanElement;
const suggestedArea = document.querySelector('.chips') as HTMLUListElement;

function fillInSuggestedWords (words : string[]) {
    const fragment = document.createDocumentFragment();

    words.forEach((word) => {
        const item = document.createElement('li');
        item.classList.add('chip');
        item.textContent = word;
        fragment.appendChild(item);
    });

    suggestedArea.replaceChildren(fragment);
}



searchButton?.addEventListener('click', async () => {
    let detectedLang : Language = 'hy'
    try {
        detectedLang = determineInputLanguage(input.value);
    } catch (error) {
        console.log(error)
        return
    }
    const targetLang : Language = detectedLang === 'hy' ? 'en' : 'hy'
    const currentWord = makeNewWord(input.value, detectedLang);
    let translatedWord = await translateWordAPI(currentWord, detectedLang, targetLang)
    if (!translatedWord) {
        console.log('translation is failed');
        return
    }
    makeNewTranslation(currentWord,translatedWord)    
    sourceWordDisplay.textContent = currentWord.value;
    translatedWordDisplay.textContent = translatedWord.value;
    fillInSuggestedWords(findSuggestions(currentWord, 2));
});

shiftButton?.addEventListener('click', () => {
    console.log('the shift button is pressed')
    isShiftActive = !isShiftActive;

    if (isShiftActive) {
        shiftButton.classList.add('active');
        allKeys.forEach(key => {
            key.textContent = key.textContent.toUpperCase()
        })}
    else {
        shiftButton.classList.remove('active');
        allKeys.forEach(key => {
            key.textContent = key.textContent.toLowerCase()
        })
    }
    }
)
allKeys.forEach(key => {
    key?.addEventListener('click', () => {
    input.value += key.textContent
})})

spaceButton?.addEventListener('click', () => {
    input.value += ' '
})
