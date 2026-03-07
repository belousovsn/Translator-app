import { filterOutRealWords } from './translationService.js'
import {Word} from './types.js'

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
]
const similarletters = [
  ["գ","զ","ց"],
  ["շ","ջ","չ"],
  ["ֆ","փ","պ","խ","տ","թ"],
  ["դ","ղ","ր","ռ"],
  ["մ","ն"],
  ["է","ե"],
  ["ճ","ձ","ծ","ժ"]
]




export function findSimilarWordsByTypo(str : string) : string []{
  let constructedWords : string [] = []
  const sourceLetters : string []= str.split("")

  for (let sourceLetterPos = 0; sourceLetterPos < sourceLetters.length; sourceLetterPos++) {
    const letterFromSource = sourceLetters[sourceLetterPos];

    similarletters.forEach(row => {
      for (let replacementIndex = 0; replacementIndex < row.length; replacementIndex++) {
        const matchedLetter = row[replacementIndex];
        const matchedreplacementIndex : number = replacementIndex
        if(letterFromSource === matchedLetter) {
          let otherLettersInRow : string [] = [...row.slice(0,replacementIndex), ...row.slice(replacementIndex + 1)]
          otherLettersInRow.forEach(l => {
            let tempArray : string [] = [...sourceLetters]
            tempArray[sourceLetterPos] = l
            let editedWord = tempArray.join("")
            constructedWords.push(editedWord)
          });
        }
      }
    })
  }
  return constructedWords
}
//will only work for suggesting similar Armenian (HY) words

function calculateDistance(a: string, b: string) : number {
    let distance = 0
    //tbd use existing algorithm
    return distance
}

export async function findSuggestionsByTypo (word : Word) : Promise<string[]> {
  let suggestedWords : Promise<string[]> = filterOutRealWords(findSimilarWordsByTypo(word.value))
  return suggestedWords 
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