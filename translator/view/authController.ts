import { signIn, signUp, signOut, getCurrentUser } from '../services/authService.js'
import { supabase } from '../supabase-client.js'

// ── DOM refs ──────────────────────────────────────────────────────────────
const authModal      = document.querySelector('#authModal')      as HTMLElement
const authModalClose = document.querySelector('#authModalClose') as HTMLButtonElement
const authForm       = document.querySelector('#authForm')       as HTMLFormElement
const authEmail      = document.querySelector('#authEmail')      as HTMLInputElement
const authPassword   = document.querySelector('#authPassword')   as HTMLInputElement
const authError      = document.querySelector('#authError')      as HTMLParagraphElement
const authSubmitBtn  = document.querySelector('#authSubmit')     as HTMLButtonElement
const authToggleBtn  = document.querySelector('#authToggle')     as HTMLButtonElement
const authModalTitle = document.querySelector('#authModalTitle') as HTMLHeadingElement
const authConfirmMsg = document.querySelector('#authConfirmMsg') as HTMLElement
const profileNavLink = document.querySelector('#profileNavLink') as HTMLAnchorElement
const navUserSection = document.querySelector('#navUserSection') as HTMLElement
const navUserEmail   = document.querySelector('#navUserEmail')   as HTMLSpanElement
const signOutBtn     = document.querySelector('#signOutBtn')     as HTMLButtonElement
const saveCardBtn    = document.querySelector('#saveCardBtn')    as HTMLButtonElement
const saveCardBtnWrap = document.querySelector('#saveCardBtnWrap') as HTMLElement

// ── State ─────────────────────────────────────────────────────────────────
let isSignUpMode = false

// ── Modal helpers ─────────────────────────────────────────────────────────
function openModal(): void {
    setMode(false)
    authForm.classList.remove('hidden')
    authConfirmMsg.classList.add('hidden')
    authToggleBtn.classList.remove('hidden')
    authForm.reset()
    authError.classList.add('hidden')
    authModal.classList.remove('hidden')
    authEmail.focus()
}

function closeModal(): void {
    authModal.classList.add('hidden')
}

function setMode(signUpMode: boolean): void {
    isSignUpMode = signUpMode
    authModalTitle.textContent = signUpMode ? 'Create Account' : 'Sign In'
    authSubmitBtn.textContent  = signUpMode ? 'Create Account' : 'Sign In'
    authToggleBtn.textContent  = signUpMode
        ? 'Already have an account? Sign In'
        : "Don't have an account? Sign Up"
    authError.classList.add('hidden')
}

function showError(message: string): void {
    authError.textContent = message
    authError.classList.remove('hidden')
}

// ── Auth state → UI ───────────────────────────────────────────────────────
function updateAuthUI(userEmail: string | null | undefined): void {
    const loggedIn = !!userEmail

    // Nav: toggle profile link ↔ user section
    profileNavLink.classList.toggle('hidden', loggedIn)
    navUserSection.classList.toggle('hidden', !loggedIn)
    if (loggedIn) navUserEmail.textContent = userEmail!

    // Save card button: disable with tooltip when signed out
    if (loggedIn) {
        saveCardBtn.removeAttribute('disabled')
        saveCardBtnWrap.removeAttribute('data-tooltip')
    } else {
        saveCardBtn.setAttribute('disabled', '')
        saveCardBtnWrap.setAttribute('data-tooltip', 'Sign in to save cards')
    }
}

// ── Init ──────────────────────────────────────────────────────────────────
export async function initAuthController(): Promise<void> {
    // Set UI based on current session on page load
    const user = await getCurrentUser()
    updateAuthUI(user?.email)

    // Keep UI in sync on auth state changes (sign in, sign out, token refresh)
    supabase.auth.onAuthStateChange((_event, session) => {
        updateAuthUI(session?.user?.email)
    })

    // Profile nav link → open modal
    profileNavLink.addEventListener('click', (e) => {
        e.preventDefault()
        openModal()
    })

    // Close: button and overlay click
    authModalClose.addEventListener('click', closeModal)
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) closeModal()
    })

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !authModal.classList.contains('hidden')) closeModal()
    })

    // Toggle sign in / sign up
    authToggleBtn.addEventListener('click', () => setMode(!isSignUpMode))

    // Form submit
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const email    = authEmail.value.trim()
        const password = authPassword.value

        authSubmitBtn.disabled = true
        authError.classList.add('hidden')

        try {
            if (isSignUpMode) {
                await signUp(email, password)
                // Supabase sends a confirmation email before the session is active
                authForm.classList.add('hidden')
                authToggleBtn.classList.add('hidden')
                authModalTitle.textContent = 'Check your email'
                authConfirmMsg.classList.remove('hidden')
            } else {
                await signIn(email, password)
                closeModal()
            }
        } catch (err: any) {
            showError(err.message ?? 'Something went wrong. Please try again.')
        } finally {
            authSubmitBtn.disabled = false
        }
    })

    // Sign out
    signOutBtn.addEventListener('click', async () => {
        await signOut()
        // onAuthStateChange fires and calls updateAuthUI automatically
    })
}
