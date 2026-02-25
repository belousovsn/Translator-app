//Having a list of cards available in cardsShop we create a deck with needed parameters

const cardsShop : string[] = [
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
]

type Deck = {
    cards : string [];
    maxSize : number;
    numberOfAllowedDuplicates : number;
}

function selectRandomCard(source: string[]) {
    let randomIndex : number = Math.floor(Math.random() * source.length)
    return source[randomIndex]
}
//validate no more than certain amount of same cards in the deck
function isWithinCountLimit (sourceArray: string [], value: string, limitCount: number): boolean {
    let matchesCount : number = sourceArray.reduce(function (acc: number, curr: string) {
      return acc + (curr === value ? 1 : 0);
    },
    0)
    return matchesCount >= limitCount ? false : true
}

function makeNewDeck(size: number, source: string[]): Deck {
    let deck : Deck = {
        cards: [], 
        maxSize: size,
        numberOfAllowedDuplicates: 2
    };
    while (deck.cards.length < size) {
        let selectedCard : string = selectRandomCard(source)
        if (isWithinCountLimit(
            deck.cards, 
            selectedCard, 
            deck.numberOfAllowedDuplicates)) 
        {
            deck.cards.push(selectedCard)
        }
    }
    return deck
}

function shuffleDeck(deck: Deck): Deck {
    const shuffledCards = [...deck.cards];
    //fisher-yates algorithm to randomize an array
    for (let i = shuffledCards.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffledCards[i], shuffledCards[randomIndex]] = [shuffledCards[randomIndex], shuffledCards[i]];
    }
    
    return {
        ...deck,
        cards: shuffledCards
    };
}



function pickCards(deck: Deck, number: number) : string[] {
    
    let chosenCards : string[] = []
    for (let i = 0; i < number; i++) {
        let randomIndex : number = Math.floor(deck.maxSize * Math.random())
        chosenCards[i] = deck.cards[randomIndex]
        //removing selected card from the deck
        deck.cards.splice(randomIndex, 1)
    }
    return chosenCards
}

function checkProbability (deck: Deck, numberOfIterations: number) : number {
    let result : number = 0
    for (let i = 0; i < numberOfIterations; i++) {
        let selectedCards : string [] = []
        let areSelectedCardsEqual : boolean = true
        for (let j = 0; j < deck.numberOfAllowedDuplicates; j++) {
            selectedCards[j] = selectRandomCard(deck.cards)
            if (j > 0 && selectedCards[j] !== selectedCards[0]) {
                areSelectedCardsEqual = false
                break
            }
        }
        if (areSelectedCardsEqual) result ++;

    }
    return 100 * result / numberOfIterations
}

const sampleDeck : Deck = makeNewDeck(35, cardsShop)
console.log("\n Initial deck \n")
console.log(sampleDeck)

//console.log("\n Picking random cards from the deck\n")
//console.log(pickCards(sampleDeck, 2))
//console.log("\n Checking deck afterwards \n")
//console.log(sampleDeck)
console.log("\n Checking the probability to select same cards in a row \n")
console.log(checkProbability(sampleDeck,100000))
