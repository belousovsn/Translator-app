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

export function toggleShiftActive(): void {
  isShiftActive = !isShiftActive;
}