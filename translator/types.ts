export type Language = 
	| "ru"
	| "en"
	| "hy";


export interface Word {
    id: string;
    value: string;
    language: Language;
}

export interface Translation {
    id : string
    sourceWord : Word
    translatedWord : Word
}

export interface ImageDTO {
    id : string
    urlSmall : string
    urlLarge : string
    wordValue : string
    description : string
}

export interface User {
    id: string
    createdAt: number
    updatedAt: number
    name: string
    email: string
}

export interface Card {
    id: string
    createdAt: number
    updatedAt: number
    languagePair: Language[]
    translation: Translation
    image: ImageDTO
    user?: User
}

export interface LocalSettings {
    UNSPLASH_ACCESS_KEY: string
}
