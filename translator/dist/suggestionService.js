import { filterOutRealWords } from './translationService.js';
import * as Helpers from './helpers.js';
import { sampleDict } from './mocks.js';
const similarletters = [
    ["գ", "զ", "ց"],
    ["շ", "ջ", "չ"],
    ["ֆ", "փ", "պ", "խ", "տ", "թ", "ք", "կ"],
    ["դ", "ղ", "ր", "ռ"],
    ["մ", "ն"],
    ["է", "ե"],
    ["ճ", "ձ", "ծ", "ժ"]
];
function findSimilarWordsByTypo(str) {
    const constructedWords = [];
    const sourceLetters = str.split("");
    for (let pos = 0; pos < sourceLetters.length; pos++) {
        const letterFromSource = sourceLetters[pos];
        const replacements = Helpers.getSimilarReplacementsForLetter(letterFromSource, similarletters);
        if (replacements.length === 0)
            continue;
        replacements.forEach(replacement => {
            const editedWord = Helpers.replaceLetterInStringByIndex(str, pos, replacement);
            constructedWords.push(editedWord);
        });
    }
    return constructedWords;
}
//will only work for suggesting similar Armenian (HY) words
function calculateDistance(a, b) {
    let distance = 0;
    //tbd use existing algorithm
    return distance;
}
export async function findSuggestionsByTypo(word) {
    return filterOutRealWords(findSimilarWordsByTypo(word.value));
}
export function findSuggestions(word, precision) {
    let suggestedWords = [];
    //try to find similar words
    //firstly replace common look-alike symbols ձճժծ 
    //then use calc dist algorithm
    //used in UI to place in "Similar Words" section
    let mockedArray = [];
    sampleDict.forEach(word => {
        mockedArray.push(word.word);
    });
    return mockedArray.slice(0, 5);
}
//# sourceMappingURL=suggestionService.js.map