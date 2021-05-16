import * as iSearch from '../interface/isearch'

context('Search Weather Feature',()=>{
    //Verify the search Feature layout on responsive design
    const screenMobileSizes = ['iphone-5', 'samsung-s10', 'iphone-x', 'ipad-mini', [1366, 768], [1440, 900]];  
    screenMobileSizes.forEach(size => {
        it(`SER_007 - Verify the search feature on the menu on ${size} design`,()=>{
            if (Cypress._.isArray(size)) {
                cy.viewport(size[0], size[1])
                cy.goToWebSite()
                cy.get(iSearch.iconSearch).should("be.visible")
                cy.get(iSearch.desktopMenu).matchImageSnapshot()
            } else {
                cy.viewport(size)
                cy.goToWebSite()
                cy.get(iSearch.menu).should("be.visible").click().wait(500)
                cy.get(iSearch.iconSearch).should("be.visible")
                cy.get(iSearch.mobileMenu).matchImageSnapshot()
            }
        })
    })
})