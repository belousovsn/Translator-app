export function makeNewWord(value, language) {
    value = value.trim();
    return {
        id: crypto.randomUUID(),
        value: value,
        language: language
    };
}
//# sourceMappingURL=wordService.js.map