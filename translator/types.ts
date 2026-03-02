export type Language = 
	| "ru"
	| "en"
	| "hy";


export interface Word {
    id: string;
    value: string;
    language: Language | null;
}

export interface Translation {
    id : string
    sourceWord : Word
    translatedWord : Word
}