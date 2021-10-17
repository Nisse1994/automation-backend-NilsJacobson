const faker = require ('faker')

const ENDPOINT_GET_BILLS = 'http://localhost:3000/api/bills'
const ENDPOINT_POST_BILL = 'http://localhost:3000/api/bill/new'

const ENDPOINT_GET_BILL = 'http://localhost:3000/api/bill/'


function createRandomBillPayload(){
    const fakeValue = faker.commerce.price()
    const fakePaid = faker.commerce.product()
   


    const payload = {
        "value": fakeValue,
        "paid": fakePaid
        
    }

    return payload
    
    }

   

function getAllBillsRequest(cy){
    cy.authSession().then((response =>{
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_BILLS,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response =>{
            const responseAsString =JSON.stringify(response) 
            cy.log(responseAsString)

        })) 
    }))
}

function deleteRequestAfterGet(cy){
    // Get request gathers the bills
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_BILLS,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        let lastId = response.body[response.body.length -1].id
        cy.request({
            method: "DELETE",
            url: ENDPOINT_GET_BILL+lastId,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json' 
            },
        }).then((response =>{
            const responseAsString = JSON.stringify(response)
            cy.log(responseAsString)
            expect(responseAsString).to.have.string('true')
        }))
    }))
}

function createBillRequest(cy){
    cy.authSession().then((response =>{
        let fakeBillPayload = createRandomBillPayload()

        // post request creates a bill
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_BILL,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: fakeBillPayload
        }).then((response =>{ 
            const responseAsString =JSON.stringify(response) 
            expect(responseAsString).to.have.string(fakeBillPayload.value)           
        }))

      
    }))      
}



function createBillRequestAndDelete(cy){
    cy.authSession().then((response =>{
        let fakeBillPayload = createRandomBillPayload()

        // post request creates a bill
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_BILL,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: fakeBillPayload
        }).then((response =>{ 
            const responseAsString = JSON.stringify(response) 
            expect(responseAsString).to.have.string(fakeBillPayload.value)           
        }))

        deleteRequestAfterGet(cy)
    }))  

}

function updateRequestAfterGet(cy){
    // Get request gathers the bills
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_BILLS,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        let secondlastId = response.body[response.body.length -2].id
        cy.request({
            method: "PUT",
            url: ENDPOINT_GET_BILL+secondlastId,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json' 
            },
        }).then((response =>{
            const responseAsString = JSON.stringify(response)
            cy.log(responseAsString)
            expect(responseAsString).to.have.string('true')
        }))
    }))
}

function createBillRequestAndUpdate(cy){
    cy.authSession().then((response =>{
        let fakeBillPayload = createRandomBillPayload()
        // post request creates a bill
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_BILL,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: fakeBillPayload
        }).then((response =>{ 
            const responseAsString = JSON.stringify(response) 
            expect(responseAsString).to.have.string(fakeBillPayload.value)           
        }))

        updateRequestAfterGet(cy)
    }))  

}

module.exports = {
    createRandomBillPayload,
    createBillRequest,
    getAllBillsRequest,
    createBillRequestAndDelete,
    createBillRequestAndUpdate
}