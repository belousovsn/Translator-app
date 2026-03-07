import { filterOutRealWords } from './translationService.js';
const sampleDict = [
    {
        "word": "սաստկագին",
        "flags": "DEPXAXGXIXLX"
    },
    {
        "word": "սաստկական",
        "flags": "DEABGEINLOPP"
    },
    {
        "word": "սաստկակոծ",
        "flags": "DEABGEINLOPM"
    },
    {
        "word": "սաստկակսկիծ",
        "flags": "DEPPAXGXIXLX"
    },
    {
        "word": "սաստկահողմ",
        "flags": "DEABGEINLOPM"
    },
    {
        "word": "սաստկահոս",
        "flags": "DEABGEINLOPP"
    },
    {
        "word": "սաստկաձայն",
        "flags": "DEABGEINLOPM"
    },
    {
        "word": "սաստկամռունչ",
        "flags": "DEABGEINLOPP"
    },
    {
        "word": "սաստկանալ",
        "flags": "CHVAVCDEA2G2INLO"
    }
];
const similarletters = [
    ["գ", "զ", "ց"],
    ["շ", "ջ", "չ"],
    ["ֆ", "փ", "պ", "խ", "տ", "թ"],
    ["դ", "ղ", "ր", "ռ"],
    ["մ", "ն"],
    ["է", "ե"],
    ["ճ", "ձ", "ծ", "ժ"]
];
export function findSimilarWordsByTypo(str) {
    let constructedWords = [];
    const sourceLetters = str.split("");
    for (let sourceLetterPos = 0; sourceLetterPos < sourceLetters.length; sourceLetterPos++) {
        const letterFromSource = sourceLetters[sourceLetterPos];
        similarletters.forEach(row => {
            for (let replacementIndex = 0; replacementIndex < row.length; replacementIndex++) {
                const matchedLetter = row[replacementIndex];
                const matchedreplacementIndex = replacementIndex;
                if (letterFromSource === matchedLetter) {
                    let otherLettersInRow = [...row.slice(0, replacementIndex), ...row.slice(replacementIndex + 1)];
                    otherLettersInRow.forEach(l => {
                        let tempArray = sourceLetters;
                        tempArray[sourceLetterPos] = l;
                        let editedWord = tempArray.join("");
                        constructedWords.push(editedWord);
                    });
                }
            }
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
    let suggestedWords = filterOutRealWords(findSimilarWordsByTypo(word.value));
    return suggestedWords;
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