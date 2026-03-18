import { Language, Translation, Word, ImageDTO, LocalSettings, Card } from "./types.js"
import * as Locators from './locators.js'
import { getSuggestedImages } from "./services/imageService.js"
import { findSuggestionsByTypo } from "./services/suggestionService.js"


let localSettingsCache: LocalSettings | null = null;

export function replaceLetterInStringByIndex (
    string : string, 
    position : number, 
    newLetter : string) : string {
        let newString : string = ""
        let tempArray : string [] = [...string]
        tempArray[position] = newLetter
        newString = tempArray.join("")
        return newString
    }

export function removeElementFromArrayByIndex<T> (
    array : T[],
    index : number
) : T[] {
    return [...array.slice(0,index), ...array.slice(index + 1)]
}

export function getSimilarReplacementsForLetter(
    letter: string,
    groups: string[][]
): string[] {
    for (const row of groups) {
        const index = row.indexOf(letter);
        if (index === -1) continue;

        // all letters in this row except the original one
        return removeElementFromArrayByIndex(row, index);
    }
    return [];
}

export function findWordByLanguage (language: Language, ...words : Word[]) {
    return words.find(w => w.language === language)
}

export function renderTranslation (translationResult : Translation) {
    Locators.sourceWordDisplay.textContent = translationResult.sourceWord.value;
    Locators.translatedWordDisplay.textContent = translationResult.translatedWord.value;
}

export async function renderImages(
    translationResult : Translation, 
    useImagesMocks : boolean = false) : Promise<ImageDTO[]> {
    let englishWord = findWordByLanguage('en', translationResult.sourceWord, translationResult.translatedWord)
    if (!englishWord) {
        console.log("Can't access image service, no English word is present for it")
        return
    }
    let suggestedImages : ImageDTO[] = await getSuggestedImages(englishWord.value,4,useImagesMocks)
    fillInSuggestedImages(suggestedImages)
    return suggestedImages
}

export async function renderSuggestedWords(translationResult : Translation) : Promise<string[]> {
    let suggestedWords : string [] = await findSuggestionsByTypo(translationResult.sourceWord)
    fillInSuggestedWords(suggestedWords);
    return suggestedWords
}

export function renderCard (card : Card) {
    const frontImg = document.createElement('img');
    frontImg.src = card.imageUrlSmall;
    frontImg.alt = card.translation.sourceWord.value;
    Locators.cardFrontImage.replaceChildren(frontImg);

    const backImg = document.createElement('img');
    backImg.src = card.imageUrlSmall;
    backImg.alt = card.translation.translatedWord.value;
    Locators.cardBackImage.replaceChildren(backImg);

    Locators.cardFrontWord.textContent = card.translation.sourceWord.value;
    Locators.cardBackWord.textContent = card.translation.translatedWord.value;
}
function fillInSuggestedImages (images : ImageDTO[]) {
    const fragment = document.createDocumentFragment();

    images.forEach(image => {
        const item = document.createElement('li');
        item.classList.add('image-item');

        const img = document.createElement('img')
            img.src = image.urlSmall;
            img.alt = image.wordValue;
        item.appendChild(img);
        fragment.appendChild(item)
    });

    Locators.imagesArea.replaceChildren(fragment);
}

function fillInSuggestedWords (words : string[]) {
    const fragment = document.createDocumentFragment();

    words.forEach((word) => {
        const item = document.createElement('li');
        item.classList.add('chip');
        item.textContent = word;
        fragment.appendChild(item);
    });

    Locators.suggestedArea.replaceChildren(fragment);
}

//this function is suggested by AI and is only here because I've got no bundler
export async function loadLocalSettings() : Promise<LocalSettings> {
    if (localSettingsCache) {
        return localSettingsCache;
    }

    const res = await fetch('./localSettings.json');
    if (!res.ok) {
        throw new Error('Failed to load localSettings.json');
    }

    const data = await res.json() as Partial<LocalSettings>;
    if (!data.UNSPLASH_ACCESS_KEY) {
        throw new Error('UNSPLASH_ACCESS_KEY is missing in localSettings.json');
    }
    if (!data.SUPABASE_URL) {
        throw new Error('SUPABASE_URL is missing in localSettings.json');
    }
    if (!data.SUPABASE_KEY) {
        throw new Error('SUPABASE_KEY is missing in localSettings.json');
    }

    localSettingsCache = {
        UNSPLASH_ACCESS_KEY: data.UNSPLASH_ACCESS_KEY,
        SUPABASE_URL: data.SUPABASE_URL,
        SUPABASE_KEY: data.SUPABASE_KEY
    };

    return localSettingsCache;
}