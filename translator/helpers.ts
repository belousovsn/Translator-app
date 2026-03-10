export function replaceLetterInStringByIndex (
    string : string, 
    position : number, 
    newLetter : string) : string {
        let newString : string = ""
        let tempArray : string [] = [...string]
        tempArray[position] = newLetter
        newString = tempArray.join("")
        return newString
    }

export function removeElementFromArrayByIndex<T> (
    array : T[],
    index : number
) : T[] {
    return [...array.slice(0,index), ...array.slice(index + 1)]
}

export function getSimilarReplacementsForLetter(
    letter: string,
    groups: string[][]
): string[] {
    for (const row of groups) {
        const index = row.indexOf(letter);
        if (index === -1) continue;

        // all letters in this row except the original one
        return removeElementFromArrayByIndex(row, index);
    }
    return [];
}