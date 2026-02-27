// MyMemory Translation API
const apiUrl = "https://api.mymemory.translated.net/get";

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
const button = document.querySelector('#searchBtn');

button?.addEventListener('click', async () => {
    currentWord = makeNewWord(input.value, "en");
    console.log(currentWord)
// tbd add lang check
    let translatedWord = await translateWord(currentWord, "en", "hy")
    console.log(translatedWord)
    console.log(translationList)

});