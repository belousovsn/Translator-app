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
    // cat - cot, distance = 1 since 1 letter is wrong
    // milk - monk, distance = 2 since 2 letters are wrong
    // milk - mlik, distance = ? (2 by default) 
    //
    return distance;
}
function findSuggestions(word, precision) {
    var suggestedWords = [];
    return suggestedWords;
}
export {};
//# sourceMappingURL=suggestionService.js.map