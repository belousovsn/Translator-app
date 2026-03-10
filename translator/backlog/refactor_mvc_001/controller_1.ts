// controller.ts
import { initSearchBar, renderSearchBar } from './searchBarView';

const state = {
    query: '',
    languageCode: 'hy',
};

initSearchBar({
    onSearch: async (query) => {
        state.query = query;
        // call translateWord, update other state, call other renderers
    },
    onLanguageChange: (lang) => {
        state.languageCode = lang;
        renderSearchBar(state); // just updates the visible code
    },
});

renderSearchBar(state);