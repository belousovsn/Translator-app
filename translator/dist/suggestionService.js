var sampleDict = [
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
//will only work for suggesting similar Armenian (HY) words
function calculateDistance(a, b) {
    var distance = 0;
    //tbd use existing algorithm
    return distance;
}
export function findSuggestions(word, precision) {
    var suggestedWords = [];
    //try to find similar words
    //firstly replace common look-alike symbols ձճժծ 
    //then use calc dist algorithm
    //used in UI to place in "Similar Words" section
    var mockedArray = [];
    sampleDict.forEach(function (word) {
        mockedArray.push(word.word);
    });
    return mockedArray.slice(0, 5);
}
//# sourceMappingURL=suggestionService.js.map