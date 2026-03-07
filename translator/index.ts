import { makeNewWord } from "./wordService.js";
import { makeNewTranslationRecord, translateWord} from "./translationService.js";
import { findSuggestions } from "./suggestionService.js"




const input = document.querySelector('#searchInput') as HTMLInputElement;
const searchButton = document.querySelector('#searchBtn');
const shiftButton = document.querySelector('.shift-key') as HTMLButtonElement;
const spaceButton = document.querySelector('.space-key') as HTMLButtonElement;
const allKeys = document.querySelectorAll('.key:not(.shift-key):not(.space-key)');
let isShiftActive = shiftButton.classList.contains('active') as boolean;
const keyboardToggle = document.querySelector('#keyboardToggle') as HTMLButtonElement;
const keyboard = document.querySelector('#armenianKeyboard') as HTMLDivElement;

keyboardToggle?.addEventListener('click', () => {
    keyboard.classList.toggle('hidden');
});
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
    const translationResult = await translateWord(input.value)
    if (!translationResult) return;
    let { currentWord, translatedWord } = translationResult
    makeNewTranslationRecord(currentWord,translatedWord)    
    sourceWordDisplay.textContent = currentWord.value;
    translatedWordDisplay.textContent = translatedWord.value;
    fillInSuggestedWords(findSuggestions(currentWord, 2));
});


suggestedArea.addEventListener('click', async (event) => {
    const clickedArea = event.target as HTMLElement
    const chip = clickedArea.closest('.chip') as HTMLElement | null;
        if (!chip) return;
    const suggestedWord = chip.textContent?.trim();
        if (!suggestedWord) return;
    const translationResult = await translateWord(suggestedWord)
        if (!translationResult) return;
    let { currentWord, translatedWord } = translationResult
    makeNewTranslationRecord(currentWord,translatedWord)    
    sourceWordDisplay.textContent = currentWord.value;
    translatedWordDisplay.textContent = translatedWord.value;
    
})

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
