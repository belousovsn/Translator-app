import {Translation, ImageDTO, Word, User, Card} from '../types.js'

export async function createCard (
    translation : Translation, 
    image : ImageDTO, 
    user?: User) : Promise<Card> {
    const newCard : Card = {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        languagePair: [translation.sourceWord.language, translation.translatedWord.language],
        translation: translation,
        imageUrlSmall: image.urlSmall,
        imageUrlLarge: image.urlLarge,
        user: user
    }
    //insert into DB
    return newCard
}
//only allow image updates
function updateCard (
    card : Card, 
    updates: Pick<Card, "imageUrlSmall" | "imageUrlLarge">) : Card {
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