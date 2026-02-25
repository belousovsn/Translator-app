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

function translateWord (word: Word, sourceLang: Language, resultLang: Language) : Word | null
 {
    return word
}

const input = document.querySelector('#searchInput') as HTMLInputElement;
const button = document.querySelector('#searchBtn');

button?.addEventListener('click', () => {
    currentWord = setWord(input.value, "en");
    console.log(currentWord)
// tbd add lang check
    currentWord = translateWord(currentWord, "hy", "en")

});