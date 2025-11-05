// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import {faker} from '@faker-js/faker'

Cypress.Commands.add('createTestAccount', () => {
    localStorage.accountCreated = true
})

Cypress.Commands.add('deleteTestAccount', () => {
    localStorage.removeItem('accountCreated ')
})

Cypress.Commands.add('login', () => {
    const email = Cypress.env('testEmail')

    if (email === 'cypressAccount[JOUW NAAM HIER]@testing.com') {
        throw new Error('Invalid email address, cannot log in.')
    }

    if (localStorage.accountCreated !== 'true') {
        throw new Error('Account does not exist.')
    }

    const user = {
        email,
        id: faker.string.uuid(),
    }

    localStorage.user = JSON.stringify(user)
})
