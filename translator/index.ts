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
    translation_id: string | null;
}

let currentWord : Word | null = null

//set the word from the input
function setWord(value: string, language: Language) : Word {
    value = value.trim()
    return {
        id: crypto.randomUUID(),
        value,
        language,
        translation_id: null
    }
}

async function translateWord (word: Word, sourceLang: Language, resultLang: Language) : Promise<Word | null>
 {  
    try {
        const langPair = `${sourceLang}|${resultLang}`;
        const url = `${apiUrl}?q=${encodeURIComponent(word.value)}&langpair=${langPair}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.responseStatus === 200) {
            word.value = data.responseData.translatedText;
            word.language = resultLang;
            word.translation_id = crypto.randomUUID();
            return word;
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
    currentWord = setWord(input.value, "en");
    console.log(currentWord)
// tbd add lang check
    currentWord = await translateWord(currentWord, "en", "hy")
    console.log(currentWord)

});