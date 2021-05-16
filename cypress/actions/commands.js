// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
addMatchImageSnapshotCommand();

import * as iSearch from '../interface/isearch'

Cypress.Commands.add('goToWebSite',(link="")=>{
    cy.visit(link)
})

Cypress.Commands.add('enterACityOnMobileView',(cityName)=>{
    cy.get(iSearch.menu).should("be.visible")
                        .click()
    cy.get(`${iSearch.iptSearch}:visible`)
                        .should("be.visible")
                        .clear()
                        .type(`${cityName}{Enter}`, {delay : 20})
})

Cypress.Commands.add('enterACityOnDesktopView',(cityName)=>{
    cy.get(`${iSearch.iptSearch}:visible`)
                        .should("be.visible")
                        .clear()
                        .type(`${cityName}{Enter}`, {delay : 20})
})