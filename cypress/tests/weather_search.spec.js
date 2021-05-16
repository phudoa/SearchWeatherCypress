Cypress.config('defaultCommandTimeout', 60000)

context('Search Weather Feature',{ viewportHeight: 768, viewportWidth: 1024 },()=>{
    it('SER_008 - Verify the current weather of cities in case the search criteria by city name matches one city',()=>{
        //create a list of cities name, country code that we want to search the weather
        const cities = ["London, GB", "London, CA"]
        // go to the search weather page
        cy.goToWebSite()
        //enter a search data
        cy.wrap(cities).each(city => {
            cy.enterACityOnMobileView(city)
            //verify the current weather of searched cities
            cy.verifyWeatherOfYourCity(city)
            //go back the previous page to continue searching
            cy.go('back')
        })
    })
})