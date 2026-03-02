import { Language, Word } from "./types.js";

export function makeNewWord(value: string, language: Language) : Word {
    value = value.trim()
    return {
        id: crypto.randomUUID(),
        value,
        language
    }
}