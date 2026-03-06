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

//will only work for suggesting similar Armenian (HY) words

function calculateDistance(a: string, b: string) : number {
    let distance = 0
    //tbd use existing algorithm
    return distance
}

function findSuggestions(word : Word, precision : number) : String[] {
    let suggestedWords : String[] = []
    //try to find similar words
    //firstly replace common look-alike symbols ձճժծ 
    //then use calc dist algorithm
    //used in UI to place in "Similar Words" section
    return suggestedWords
}