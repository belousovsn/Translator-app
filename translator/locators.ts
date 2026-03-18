export const input = document.querySelector('#searchInput') as HTMLInputElement;
export const searchButton = document.querySelector('#searchBtn');
export const shiftButton = document.querySelector('.shift-key') as HTMLButtonElement;
export const spaceButton = document.querySelector('.space-key') as HTMLButtonElement;
export const allKeys = document.querySelectorAll('.key:not(.shift-key):not(.space-key)');
export let isShiftActive = !!shiftButton && shiftButton.classList.contains('active');
export const keyboardToggle = document.querySelector('#keyboardToggle') as HTMLButtonElement;
export const keyboard = document.querySelector('#armenianKeyboard') as HTMLDivElement;
export const sourceWordDisplay = document.querySelector('.source-word') as HTMLSpanElement;
export const translatedWordDisplay = document.querySelector('.translated-word') as HTMLSpanElement;
export const suggestedArea = document.querySelector('.chips') as HTMLUListElement;
export const imagesArea = document.querySelector('.image-list') as HTMLUListElement;
export const makeCardButton = document.querySelector('#makeCardBtn') as HTMLButtonElement;
export const cardFrontImage = document.querySelector('#memoFrontImage') as HTMLPictureElement
export const cardBackImage = document.querySelector('#memoBackImage') as HTMLPictureElement
export const cardFrontWord = document.querySelector('#memoFrontText') as HTMLSpanElement
export const cardBackWord = document.querySelector('#memoBackText') as HTMLSpanElement


export function toggleShiftActive(): void {
  isShiftActive = !isShiftActive;
}