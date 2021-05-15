Cypress.config('defaultCommandTimeout', 60000)

context('Search Weather Feature',{ viewportHeight: 768, viewportWidth: 1024 },()=>{
    it('SER_008 - Verify the current weather of cities in case the search criteria by city name matches one city',()=>{
        //create a list of cities name, country code that we want to search the weather
        const cities = ["London, GB"]//, "London, CA"]
        // go to the search weather page
        cy.goToWebSite()
        //enter a search data
        cy.wrap(cities).each(city => {
            cy.enterACityOnMobileView(city)
            //verify the current weather of searched cities
            cy.verifyWeatherOfYourCity(city)
            cy.go('back')
        })
    })
    it.skip('Demo to cut string',()=>{  
        let myText='10.7°С  temperature from 10.6 to 11.1 °С, wind 2.57 m/s. clouds 90 %, 1000 hpa'
        let string = myText.replace(/[^0-9.]/g," ",10)
        let array = string.split(' ')
        let finalarr =[]
        cy.wrap(array).each(item=>{
            if(item!="" && item!="." )
            {
                finalarr.push(item)
            }
        })
        cy.log(finalarr[0]).then(()=>{
            debugger
        })
        // cy.wrap(finalarr).each(item=>{
        //     cy.log("Final--" + item)
        // })
    })
})