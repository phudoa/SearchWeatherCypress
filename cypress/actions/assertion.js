function getNumberInString(string, startStr, endStr){
    let idxStart = string.indexOf(startStr)
    let idxEnd = string.indexOf(endStr)
    let tempString = string.slice(idxStart, idxEnd)
    return parseFloat(tempString.replace(/[^0-9.]/g, " "))
}

Cypress.Commands.add('verifyWeatherOfYourCity', (yourCity) => {
    let parameters = [`q=${yourCity}`]
    
    //get the current weather info of the city by API
    cy.apiWeatherByCity(parameters).then(res => {
        let cityName = res.body["name"]
        let countryCode = res.body.sys["country"]
        let desc = res.body.weather[0].description
        let temp = res.body.main["temp"]
        let tempMin = res.body.main["temp_min"]
        let tempMax = res.body.main["temp_max"]
        let wind = res.body.wind["speed"]
        let clouds = res.body.clouds["all"]
        let pressue = res.body.main["pressure"]
        let lat = res.body.coord["lat"]
        let lon = res.body.coord["lon"]

        //verify the results of a city
        cy.get('tr').within(() => {
            //verify the weather icon
            cy.get('td > img').should("be.visible")
            cy.get('td').eq(1)
                .should("be.visible")
                .within(() => {
                    //verify the cityname, country code
                    cy.get('b').eq(0).should('contain', `${cityName}, ${countryCode}`)
                    //verify the weather description
                    cy.get('b').eq(1).should('contain', desc)
                    //verify the geo coords (lat, lon)
                    cy.get('p').eq(1).should('have.text', `Geo coords [${lat}, ${lon}]`)
                    //verify the weather info : wind, clouds, pressure
                    cy.get('p').eq(0).should('contain', `wind ${wind} m/s. clouds ${clouds} %, ${pressue} hpa`)

                    //verify current temp (approximation +/- 1)
                    cy.get('p > span').then($element=>{
                        let myTemp = parseFloat($element.text().split("°С "))
                        expect(myTemp).to.be.within(temp -1, temp +1)
                    })

                    //verify current temp_min, temp_max (approximation +/- 1)
                    cy.get('p').eq(0).then($element => {
                        let tempMinActual = getNumberInString ($element.text(), "from", "to")
                        expect(tempMinActual).to.be.within(tempMin -1, tempMin +1)
                        let tempMaxActual = getNumberInString ($element.text(), "to", "wind")
                        expect(tempMaxActual).to.be.within(tempMax -1, tempMax +1)
                    })
                })
        })
    })
})