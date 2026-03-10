import { filterOutRealWords } from './translationService.js'
import {Word} from './types.js'
import * as Helpers from './helpers.js'
import {sampleDict} from './mocks.js'

const similarletters = [
  ["գ","զ","ց"],
  ["շ","ջ","չ"],
  ["ֆ","փ","պ","խ","տ","թ"],
  ["դ","ղ","ր","ռ"],
  ["մ","ն"],
  ["է","ե"],
  ["ճ","ձ","ծ","ժ"]
]

function findSimilarWordsByTypo(str: string): string[] {
  const constructedWords: string[] = [];
  const sourceLetters: string[] = str.split("");

  for (let pos = 0; pos < sourceLetters.length; pos++) {
    const letterFromSource = sourceLetters[pos];

    const replacements = Helpers.getSimilarReplacementsForLetter(
      letterFromSource,
      similarletters
    );
    if (replacements.length === 0) continue;

    replacements.forEach(replacement => {
      const editedWord = Helpers.replaceLetterInStringByIndex(
        str,
        pos,
        replacement
      );
      constructedWords.push(editedWord);
    });
  }

  return constructedWords;
}
//will only work for suggesting similar Armenian (HY) words

function calculateDistance(a: string, b: string) : number {
    let distance = 0
    //tbd use existing algorithm
    return distance
}

export async function findSuggestionsByTypo (word : Word) : Promise<string[]> {
  return filterOutRealWords(findSimilarWordsByTypo(word.value)) 
}

export function findSuggestions(word : Word, precision : number) : string[] {
    let suggestedWords : string[] = []
    //try to find similar words
    //firstly replace common look-alike symbols ձճժծ 
    //then use calc dist algorithm
    //used in UI to place in "Similar Words" section
    let mockedArray : string [] = []
    sampleDict.forEach(word => {
      mockedArray.push(word.word)
    });
    return mockedArray.slice(0,5)
}