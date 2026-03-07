export function makeNewWord(value, language) {
    value = value.trim();
    return {
        id: crypto.randomUUID(),
        value,
        language
    };
}
//# sourceMappingURL=wordService.js.map