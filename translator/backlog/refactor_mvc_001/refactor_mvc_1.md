Title
Refactor UI into component-based views (phase 1)

Type
Story / Refactoring

Background
Currently, UI logic (event handlers, DOM manipulation) is concentrated in index.ts. This makes the code harder to read, test, and extend as we add features (cards, games, more panels). We want to move toward a simple component-based architecture: each UI section is a small “view module” that knows only about its own DOM and receives data/callbacks from a central controller.

Goal
Introduce a first UI component as a pattern and update index.ts to use it. This will serve as a reference for refactoring the rest of the UI in follow-up tasks.

Scope (for THIS task only)

Extract the Suggestions panel behavior from index.ts into its own view module.
Update index.ts to use the new view module (no behavior changes, just refactor).
Out of scope (follow-up tickets):

Search bar component.
Armenian keyboard component.
Translation result panel component.
Card panel component.
Global app state refactor.
Requirements

Create a new module for the suggestions panel, e.g. suggestionsView.ts.
The suggestions view must:
Own the DOM for the suggestions list (the ul with chips).
Expose an initSuggestions(callbacks) function to wire events.
Expose a renderSuggestions(words: string[]) function to render the list.
index.ts must no longer:
Manually build <li class="chip"> elements.
Attach a click listener directly to the suggestions area.
Behavior must remain identical:
Clicking a suggestion still triggers translation and updates the translation panel.
Suggestions are still updated after a search.
Implementation details (example)

Use this as the one concrete pattern to follow later for other panels.

Create suggestions view module

In suggestionsView.ts:

Define the public API:

initSuggestions(options: { onSuggestionClick: (word: string) => void }): void

Internally, get the suggestions container element (same one used in locators.ts).
Add a single click listener using event delegation.
When a .chip is clicked, call onSuggestionClick with the chip text.
renderSuggestions(words: string[]): void

Create a DocumentFragment.
For each word, create <li class="chip">word</li>.
Replace children of the suggestions container with the fragment.
Keep this module DOM-only: no calls to translateWord, no business logic.

Update index.ts to use the new component

Import initSuggestions and renderSuggestions from suggestionsView.ts.
Replace fillInSuggestedWords with calls to renderSuggestions:
After you get suggestedWords from findSuggestionsByTypo, call renderSuggestions(suggestedWords).
Replace the Locators.suggestedArea.addEventListener('click', ...) in index.ts with:
A call to initSuggestions({ onSuggestionClick: async (word) => { /* current logic from click handler */ } }).
Remove the old fillInSuggestedWords function from index.ts once everything compiles.
Keep types explicit

Type words: string[] and the callback parameter word: string.
If helpful, define a small SuggestionsCallbacks interface in suggestionsView.ts.
Acceptance criteria

index.ts compiles and runs with no behavior changes.
Suggestions are still displayed correctly after a search.
Clicking a suggestion still:
Triggers translation.
Updates source and translated word displays.
All DOM querying and rendering of suggestion chips lives in suggestionsView.ts; index.ts only:
Calls renderSuggestions(words) with data.
Provides the onSuggestionClick callback to initSuggestions.