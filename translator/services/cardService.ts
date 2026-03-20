import {Translation, ImageDTO, Word, User, Card} from '../types.js'
import {supabase} from '../supabase-client.js'
import { errorMonitor } from 'node:events'

export function createCard (
    translation : Translation, 
    image : ImageDTO, 
    user?: User) : Card {
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
    return newCard
}

export async function saveCardToDB(card : Card) {
    const { data: { user } } = await supabase.auth.getUser()
    const row = {
        id: card.id,
        source_lang: card.languagePair[0],
        target_lang: card.languagePair[1],
        source_word: card.translation.sourceWord.value,
        target_word: card.translation.translatedWord.value,
        img_url_small: card.imageUrlSmall,
        img_url_large: card.imageUrlLarge,
        user_id: user?.id ?? null
    }
    const {error} = await supabase.from("Cards").insert(row).single()
    if(error) {console.error("Error adding Card to DB", error.message)}
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

export async function getCardsFromDB() : Promise<Card[]> {
    const userCards : Card[] = []
    //select from DB
    const {data, error} = await supabase
        .from('Cards')
        .select('*')
        .order('created_at', {ascending: true})
    if (error) {
        console.error('Failed to fetch cards: ', error.message)
        return []
    }
        console.log(data)
    
    return data.map(rowToCard)
}

function rowToCard(row : any) : Card {
    return {
        id: row.id,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        languagePair: [row.source_lang, row.target_lang],
        translation: {
            id: row.id,
            sourceWord: {id: crypto.randomUUID(), value: row.source_word, language: row.source_lang},
            translatedWord: {id: crypto.randomUUID(), value: row.target_word, language: row.target_lang},
        },
        imageUrlSmall: row.img_url_small,
        imageUrlLarge: row.img_url_large,
        user: row.user_id
    }
}

