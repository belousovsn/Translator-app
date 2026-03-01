// MyMemory Translation API
const apiUrl = "https://api.mymemory.translated.net/get";

const armenianPattern = /[\u0531-\u0587\u0589-\u058A]/; // Armenian Unicode range
const russianPattern = /[\u0400-\u04FF]/;              // Cyrillic Unicode range

type Language = 
    | "ru"
    | "en"
    | "hy";


interface Word {
    id: string;
    value: string;
    language: Language | null;
}

interface Translation {
    id : string
    sourceWord : Word
    translatedWord : Word
}

let currentWord : Word | null = null
let translationList : Translation [] = []

function makeNewWord(value: string, language: Language) : Word {
    value = value.trim()
    return {
        id: crypto.randomUUID(),
        value,
        language
    }
}

function makeNewTranslation (sourceWord : Word, translatedWord : Word) : Translation {
    return {
        id: crypto.randomUUID(),
        sourceWord: sourceWord,
        translatedWord: translatedWord
    }
}

function determineInputLanguage (inputText : string) : Language {
    if (armenianPattern.test(inputText)) {
        return 'hy';
    }
    else if (russianPattern.test(inputText)) {
        return 'ru';
    }
    else return 'en'
}

async function translateWord (sourceWord: Word, sourceLang: Language, resultLang: Language) : Promise<Word | null>
 {  
    try {
        const langPair = `${sourceLang}|${resultLang}`;
        const url = `${apiUrl}?q=${encodeURIComponent(sourceWord.value)}&langpair=${langPair}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.responseStatus === 200) {
            let translatedWord = makeNewWord(data.responseData.translatedText, resultLang);
            translationList.push(makeNewTranslation(sourceWord, translatedWord))
            return translatedWord;
        } else {
            throw new Error("Translation failed");
        }
    } catch (error) {
        console.error("Translation failed:", error);
        return null;
    }
}

const input = document.querySelector('#searchInput') as HTMLInputElement;
const searchButton = document.querySelector('#searchBtn');
const shiftButton = document.querySelector('.shift-key') as HTMLButtonElement;
const spaceButton = document.querySelector('.space-key') as HTMLButtonElement;
const allKeys = document.querySelectorAll('.key:not(.shift-key):not(.space-key)');
let isShiftActive = shiftButton.classList.contains('active') as boolean;
const sourceWordDisplay = document.querySelector('.source-word') as HTMLSpanElement;
const translatedWordDisplay = document.querySelector('.translated-word') as HTMLSpanElement;

searchButton?.addEventListener('click', async () => {
    let detectedLang : Language = 'hy'
    try {
        detectedLang = determineInputLanguage(input.value);
    } catch (error) {
        console.log('Cannot recognize the language!')
    }
    const targetLang = detectedLang === 'en' ? 'hy' : 'en'
    currentWord = makeNewWord(input.value, detectedLang);
    console.log(currentWord)
// tbd add lang check
    let translatedWord = await translateWord(currentWord, detectedLang, targetLang)
    console.log(translatedWord)
    console.log(translationList)
    
    if (translatedWord) {
        sourceWordDisplay.textContent = currentWord.value;
        translatedWordDisplay.textContent = translatedWord.value;
    }

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
