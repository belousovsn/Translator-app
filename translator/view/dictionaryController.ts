import {getCurrentUser} from '../services/authService.js'
import {getCardsFromDB} from '../services/cardService.js'
import {Card} from '../types.js'

const dictionaryGrid = document.querySelector('#dictionaryGrid') as HTMLElement
const dictCount = document.querySelector('#dictCount') as HTMLSpanElement

export async function initDictionaryController(): Promise<void> {
    await loadCards()

    document.querySelector('[data-page="dictionary"]')
        ?.addEventListener('click', loadCards)
}

async function loadCards(): Promise<void> {
    const cards: Card[] = await getCardsFromDB()
    renderCards(cards)
}


function renderCards(cards: Card[]) : void {
    dictCount.textContent = `${cards.length}`

    if (cards.length === 0) {
        dictionaryGrid.innerHTML = '<p class="dict-empty">No cards yet. Log in and save some words first!</p>'
        return
    }
    const flipIconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`

    const fragment = document.createDocumentFragment()

    cards.forEach(card => {
        const inputId = `dictFlip-${card.id}`

        const wrap = document.createElement('div')
        wrap.className = 'dict-card-wrap'
        wrap.innerHTML = `
            <input type="checkbox" class="memo-flip-input" id="${inputId}" aria-hidden="true">
            <label for="${inputId}" class="memo-card" aria-label="Click to flip card">
                <div class="memo-card-inner">
                    <div class="memo-card-face memo-card-front">
                        <div class="memo-card-image"></div>
                        <div class="memo-card-footer"><span class="memo-card-text">${card.translation.sourceWord.value}</span></div>
                        <div class="memo-flip-icon" aria-hidden="true">${flipIconSvg}</div>
                    </div>
                    <div class="memo-card-face memo-card-back">
                        <div class="memo-card-image"></div>
                        <div class="memo-card-footer"><span class="memo-card-text">${card.translation.translatedWord.value}</span></div>
                        <div class="memo-flip-icon" aria-hidden="true">${flipIconSvg}</div>
                    </div>
                </div>
            </label>`

        // set images separately to avoid XSS via src
        const images = wrap.querySelectorAll('.memo-card-image')
        const frontImg = images[0]
        const backImg  = images[1]

        const front = document.createElement('img')
        front.src = card.imageUrlSmall
        front.alt = card.translation.sourceWord.value
        frontImg.appendChild(front)

        const back = document.createElement('img')
        back.src = card.imageUrlSmall
        back.alt = card.translation.translatedWord.value
        backImg.appendChild(back)

        fragment.appendChild(wrap)
    })

    dictionaryGrid.replaceChildren(fragment)
}