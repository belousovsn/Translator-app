import {Translation, ImageDTO, Word, User, Card} from '../types.js'

function createCard (
    translation : Translation, 
    image : ImageDTO, 
    user?: User) : Card {
    const newCard : Card = {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        languagePair: [translation.sourceWord.language, translation.translatedWord.language],
        translation: translation,
        image: image,
        user: user
    }
    //insert into DB
    return newCard
}
//only allow image updates
function updateCard (card : Card, updates: Pick<Card, 'image'>) : Card {
    //update in DB
    return {
        ...card,
        ...updates,
        updatedAt: Date.now()
    }
}
function deleteCard(card: Card) {
    //delete from DB
}

function getCardsByUserId(user: User) : Card[] {
    const userCards : Card[] = []
    //select from DB
    return userCards
}