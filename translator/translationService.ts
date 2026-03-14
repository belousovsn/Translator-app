import {Word, Translation, Language} from './types.js'
import { makeNewWord } from './wordService.js';

// MyMemory Translation API
const apiUrl = "https://api.mymemory.translated.net/get";

const armenianPattern = /[\u0531-\u0587\u0589-\u058A]/; // Armenian Unicode range
const russianPattern = /[\u0400-\u04FF]/;              // Cyrillic Unicode range



let translationList : Translation [] = []

let armenianDict: Set<string> | null = null;

async function loadDictionary(): Promise<void> {
  if (armenianDict) return;

  const res = await fetch('./resources/Armenian (Eastern).json');
  const data: { wordCount: number; entries: { word: string }[] } = await res.json();

  armenianDict = new Set(data.entries.map(entry => entry.word));
}

export async function filterOutRealWords(words : string []) : Promise<string[]> {
    await loadDictionary();
    let realWords : string [] = words.filter(word => armenianDict!.has(word))
    return realWords
} 

async function checkWordInDictionary(word: string): Promise<boolean> {
  await loadDictionary();
  return armenianDict!.has(word);
}

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

export async function translateWord (word : string) : Promise<Translation | null> {
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
        
    return makeNewTranslationRecord(currentWord, translatedWord)
}