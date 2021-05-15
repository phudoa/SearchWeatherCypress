Cypress.Commands.add('verifyWeatherOfYourCity',(city)=>{
    let parameters= [`q=${city}`]
    //get the current weather info of the city by API
    cy.apiWeatherByCity(parameters).then(res=>{
        let cityName = res.body["name"]
        let countryCode = res.body.sys["country"]
        let desc = res.body.weather[0].description
        let temp = res.body.main["temp"]
        let temp_min = res.body.main["temp_min"]
        let temp_max = res.body.main["temp_max"]
        let wind = res.body.wind["speed"]
        let clouds = res.body.clouds["all"]
        let pressue= res.body.main["pressure"]
        let lat = res.body.coord["lat"]
        let lon = res.body.coord["lon"]

        //verify the results
        cy.get('tr').within(()=>{
            cy.get('td').eq(1)
                        .should("be.visible")
                        .within(()=>{
                            cy.get('b').eq(0).should('contain', `${cityName}, ${countryCode}`)
                            cy.get('b').eq(1).should('contain', desc)
                            cy.get('p').eq(0).should('contain',`wind ${wind} m/s. clouds ${clouds} %, ${pressue} hpa`)
                            cy.get('p').eq(1).should('have.text',`Geo coords [${lat}, ${lon}]`)
                            
                            // cy.get('p > span').then($element=>{
                            //     let myTemp = parseFloat($element.text().split("°С "))
                            //     expect(myTemp).to.be.within(temp -1, temp +1)
                            // })
                            cy.get('p').eq(0).then($element=>{
                                let string = $element.text().replace(/[^0-9.]/g," ",10)
                                cy.log("String --"+ string)
                                let newString = string.split(' ')
                                cy.log("New String --"+ newString)
                                let finalarr =[]
                                cy.wrap(newString).each(item=>{
                                    if(item!="" && item!="." )
                                    {
                                        finalarr.push(item)
                                        cy.log(item)
                                    }
                                        
                                })

                                // expect(finalarr[0]).to.be.within(temp -1, temp +1)
                                // expect(finalarr[1]).to.be.within(temp_min -1, temp_min +1)
                                // expect(finalarr[2]).to.be.within(temp_max -1, temp_max +1)

                                // let myText = $element.text()
                                // let start = myText.indexOf("°С")
                                // let end = myText.indexOf(",")
                                // let tempMinMax = myText.slice(start + 2, end)
                                // expect(tempMinMax).to.have.string(` temperature from 10.6 to 11.1 °С`)
                            })
                            
                        })
        })
    })
})