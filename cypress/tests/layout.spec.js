import * as iSearch from '../interface/isearch'

context('Search Weather Feature',()=>{
    //Verify the search Feature layout on mobile screens
    const screenMobileSizes = ['iphone-5', 'samsung-s10', 'iphone-x', 'ipad-mini']//, 'macbook-13'];  
    screenMobileSizes.forEach(size => {
        it(`SER_007 - Verify the search feature on the menu on ${size} design`,()=>{
            if (Cypress._.isArray(size)) {
                cy.viewport(size[0], size[1])
            } else {
                cy.viewport(size)
            }
            cy.goToWebSite()
            cy.get(iSearch.menu).should("be.visible").click()
            cy.get(iSearch.iconSearch).should("be.visible")
            cy.get(iSearch.mobileMenu).matchImageSnapshot()
        })
    })

    //Verify the search Feature layout on desktop screens
    const screenDesktopSizes = ['macbook-13', 'macbook-15']
    screenDesktopSizes.forEach(size => {
        it(`SER_007 - Verify the search feature on the menu on ${size} design`,()=>{
            if (Cypress._.isArray(size)) {
                cy.viewport(size[0], size[1])
            } else {
                cy.viewport(size)
            }
            cy.goToWebSite()
            cy.get(iSearch.iconSearch).should("be.visible")
            cy.get(iSearch.desktopMenu).matchImageSnapshot()
        })
    })
})