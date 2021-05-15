import * as iSearch from "../interface/isearch"

Cypress.Commands.add('apiWeatherByCity',(args = [''])=>{
    let parameters= args.join('&')
    return cy.request('GET',`${iSearch.apiSearchByCity}${parameters}&units=metric&appid=${iSearch.apiKey}`)
})

Cypress.Commands.add('apiWeatherByCities',(args = [''])=>{
    let parameters= args.join('&')
    return cy.request('GET',`${iSearch.apiSearchByCities}${parameters}&appid=${iSearch.apiKey}`)
})