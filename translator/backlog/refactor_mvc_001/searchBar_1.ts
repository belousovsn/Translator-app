// searchBarView.ts
export interface SearchBarProps {
    value: string;
    languageCode: string;
}

export interface SearchBarCallbacks {
    onSearch: (query: string) => void;
    onLanguageChange: (lang: string) => void;
}

export function initSearchBar(callbacks: SearchBarCallbacks) {
    const input = document.getElementById('searchInput') as HTMLInputElement;
    const searchBtn = document.getElementById('searchBtn') as HTMLButtonElement;
    const langMenu = document.getElementById('langMenu') as HTMLElement;

    searchBtn.addEventListener('click', () => {
        callbacks.onSearch(input.value.trim());
    });

    langMenu.addEventListener('click', (e) => {
        const li = (e.target as HTMLElement).closest('li');
        if (!li) return;
        const lang = li.dataset.lang;
        if (!lang) return;
        callbacks.onLanguageChange(lang);
    });
}

export function renderSearchBar(props: SearchBarProps) {
    const input = document.getElementById('searchInput') as HTMLInputElement;
    const langCodeSpan = document.querySelector('.lang-code') as HTMLElement;

    input.value = props.value;
    langCodeSpan.textContent = props.languageCode.toUpperCase();
}