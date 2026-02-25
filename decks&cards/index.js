//Having a list of cards available in cardsShop we create a deck with needed parameters
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var cardsShop = [
    "Carson Sinclair: The Butler",
    "Bestow Resolve",
    "Field Agent",
    "Girish Kadakia: ICPC Punjab Detective",
    "Guard Dog",
    "Handcuffs",
    "Hunter's Armor",
    "Martyr's Vambrace: Remnant of the Unknown",
    "Obsidian Bracelet",
    "Runic Axe",
    "Bolas",
    "Breach the Door",
    "Custom Modifications",
    "Ever Vigilant",
    "Grievous Wound",
    "Motivational Speech",
    "One in the Chamber",
    "Prepared for the Worst",
    "Fighting Lessons",
    "Helping Hand",
    "Locked and Loaded",
    "Sacred Covenant",
    "Stick to the Plan",
    "Wish Eater: Jewel of the Gods",
    "Combat Training",
    "Old Shotgun",
    "Physical Training",
    "Relentless",
    "Rite of Sanctification",
    "Solemn Vow",
    "Blackjack",
    "Combat Training",
    "Empty Vessel: Abandoned by the Gods",
    "Enchanted Armor",
    "Handcuffs",
    "Trench Knife",
    "Wolf Mask: The Moon's Sire",
    ".32 Colt",
];
function selectRandomCard(source) {
    var randomIndex = Math.floor(Math.random() * source.length);
    return source[randomIndex];
}
//validate no more than certain amount of same cards in the deck
function isWithinCountLimit(sourceArray, value, limitCount) {
    var matchesCount = sourceArray.reduce(function (acc, curr) {
        return acc + (curr === value ? 1 : 0);
    }, 0);
    return matchesCount >= limitCount ? false : true;
}
function makeNewDeck(size, source) {
    var deck = {
        cards: [],
        maxSize: size,
        numberOfAllowedDuplicates: 2
    };
    while (deck.cards.length < size) {
        var selectedCard = selectRandomCard(source);
        if (isWithinCountLimit(deck.cards, selectedCard, deck.numberOfAllowedDuplicates)) {
            deck.cards.push(selectedCard);
        }
    }
    return deck;
}
function shuffleDeck(deck) {
    var _a;
    var shuffledCards = __spreadArray([], deck.cards, true);
    //fisher-yates algorithm to randomize an array
    for (var i = shuffledCards.length - 1; i > 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        _a = [shuffledCards[randomIndex], shuffledCards[i]], shuffledCards[i] = _a[0], shuffledCards[randomIndex] = _a[1];
    }
    return __assign(__assign({}, deck), { cards: shuffledCards });
}
function pickCards(deck, number) {
    var chosenCards = [];
    for (var i = 0; i < number; i++) {
        var randomIndex = Math.floor(deck.maxSize * Math.random());
        chosenCards[i] = deck.cards[randomIndex];
        //removing selected card from the deck
        deck.cards.splice(randomIndex, 1);
    }
    return chosenCards;
}
function checkProbability(deck, numberOfIterations) {
    var result = 0;
    for (var i = 0; i < numberOfIterations; i++) {
        var selectedCards = [];
        var areSelectedCardsEqual = true;
        for (var j = 0; j < deck.numberOfAllowedDuplicates; j++) {
            selectedCards[j] = selectRandomCard(deck.cards);
            if (j > 0 && selectedCards[j] !== selectedCards[0]) {
                areSelectedCardsEqual = false;
                break;
            }
        }
        if (areSelectedCardsEqual)
            result++;
    }
    return 100 * result / numberOfIterations;
}
var sampleDeck = makeNewDeck(35, cardsShop);
console.log("\n Initial deck \n");
console.log(sampleDeck);
//console.log("\n Picking random cards from the deck\n")
//console.log(pickCards(sampleDeck, 2))
//console.log("\n Checking deck afterwards \n")
//console.log(sampleDeck)
console.log("\n Checking the probability to select same cards in a row \n");
console.log(checkProbability(sampleDeck, 100000));
//# sourceMappingURL=index.js.map