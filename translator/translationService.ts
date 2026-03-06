import {Word, Translation, Language} from './types.js'
import { makeNewWord } from './wordService.js';

// MyMemory Translation API
const apiUrl = "https://api.mymemory.translated.net/get";

const armenianPattern = /[\u0531-\u0587\u0589-\u058A]/; // Armenian Unicode range
const russianPattern = /[\u0400-\u04FF]/;              // Cyrillic Unicode range



let translationList : Translation [] = []

export function determineInputLanguage (inputText : string) : Language {
	if (armenianPattern.test(inputText)) {
		return 'hy';
	}
	else if (russianPattern.test(inputText)) {
		return 'ru';
	}
	else if (/^[a-zA-Z\s]+$/.test(inputText)) {
        return 'en';
    }
    else {
        throw new Error(`Cannot determine language from input: "${inputText}"`)
    }
}
export function makeNewTranslationRecord (sourceWord : Word, translatedWord : Word) : Translation {
    return {
        id: crypto.randomUUID(),
        sourceWord: sourceWord,
        translatedWord: translatedWord
    }
}

export async function translateWordAPI (sourceWord: Word, sourceLang: Language, resultLang: Language) : Promise<Word | null>
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
            translationList.push(makeNewTranslationRecord(sourceWord, translatedWord))
            return translatedWord;
        } else {
            throw new Error("Translation failed");
        }
    } catch (error) {
        console.error("Translation failed:", error);
        return null;
    }
}

export async function translateWord (word : string) {
        let detectedLang : Language = 'hy'
            try {
                detectedLang = determineInputLanguage(word);
            } catch (error) {
                console.log(error)
                return null
            }
        const targetLang : Language = detectedLang === 'hy' ? 'en' : 'hy'
        const currentWord = makeNewWord(word, detectedLang);
        let translatedWord = await translateWordAPI(currentWord, detectedLang, targetLang)
            if (!translatedWord) {
                console.log('translation is failed');
                return null
            }
    return {currentWord, translatedWord}
}