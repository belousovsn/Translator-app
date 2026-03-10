import {test, expect} from "@playwright/test"
import * as Locators from '../locators.js'

test('translator page loads', async ({page}) => {
    await page.goto('/index.html')
    await expect(page).toHaveTitle('Search')
})