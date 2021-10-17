const faker = require ('faker')

const ENDPOINT_GET_RESERVATIONS = 'http://localhost:3000/api/reservations'
const ENDPOINT_POST_RESERVATION = 'http://localhost:3000/api/reservation/new'

const ENDPOINT_GET_RESERVATION = 'http://localhost:3000/api/reservation/'


function createRandomReservationPayload(){
    const fakeStart = faker.datatype.datetime()
    const fakeEnd = faker.datatype.datetime()
    const fakeClient = faker.commerce.productName()
    const fakeRoom = faker.commerce.department()
    const fakeBill = faker.commerce.price()
   


    const payload = {
        "start": fakeStart,
        "end": fakeEnd,
        "Client": fakeClient,
        "Room": fakeRoom,
        "Bill": fakeBill
        
    }

    return payload
    
    }



function getAllReservationsRequest(cy){
    cy.authSession().then((response =>{
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_RESERVATIONS,
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
    // Get request gathers the reservations
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_RESERVATIONS,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        let lastId = response.body[response.body.length -1].id
        cy.request({
            method: "DELETE",
            url: ENDPOINT_GET_RESERVATION+lastId,
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

function createReservationRequest(cy){
    cy.authSession().then((response =>{
        let fakeReservationPayload = createRandomReservationPayload()

        // post request creates a reservation
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_RESERVATION,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: fakeReservationPayload
        }).then((response =>{ 
            const responseAsString =JSON.stringify(response) 
       //     expect(responseAsString).to.have.string(fakeReservationPayload.start)           
        }))

    }))      
}



function createReservationRequestAndDelete(cy){
    cy.authSession().then((response =>{
        let fakeReservationPayload = createRandomReservationPayload()

        // post request creates a reservation
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_RESERVATION,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: fakeReservationPayload
        }).then((response =>{ 
            const responseAsString = JSON.stringify(response) 
     //       expect(responseAsString).to.have.string(fakeReservationPayload.start)           
        }))

        deleteRequestAfterGet(cy)
    }))  

}

function updateRequestAfterGet(cy){
    // Get request gathers the reservation
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_RESERVATIONS,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        let secondlastId = response.body[response.body.length -2].id
        cy.request({
            method: "PUT",
            url: ENDPOINT_GET_RESERVATION+secondlastId,
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

function createReservationRequestAndUpdate(cy){
    cy.authSession().then((response =>{
        let fakeReservationPayload = createRandomReservationPayload()
        // post request creates a reservation
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_RESERVATION,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: fakeReservationPayload
        }).then((response =>{ 
            const responseAsString = JSON.stringify(response) 
           // expect(responseAsString).to.have.string(fakeReservationPayload.start)           
        }))

        updateRequestAfterGet(cy)
    }))  

}

module.exports = {
    createRandomReservationPayload,
    createReservationRequest,
    getAllReservationsRequest,
    createReservationRequestAndDelete,
    createReservationRequestAndUpdate
}