const faker = require ('faker')

const ENDPOINT_GET_CLIENTS = 'http://localhost:3000/api/clients'
const ENDPOINT_POST_CLIENT = 'http://localhost:3000/api/client/new'

const ENDPOINT_GET_CLIENT = 'http://localhost:3000/api/client/'


function createRandomClientPayload(){
    const fakeName = faker.name.firstName()
    const fakeEmail = faker.internet.email()
    const fakePhone = faker.phone.phoneNumber()

    const payload = {
        "name": fakeName,
        "email": fakeEmail,
        "telephone": fakePhone
    }

    return payload
}

    function getRequestAllClientsWithAssertion(cy, name, email, telephone){
    // Get request gathers the clients
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        const responseAsString =JSON.stringify(response) 
        expect(responseAsString).to.have.string(name)
        expect(responseAsString).to.have.string(email) 
        expect(responseAsString).to.have.string(telephone)

        cy.log(response.body[response.body.length -1].id)
        cy.log(response.body.length)
        
    }))
} 

function getAllClientsRequest(cy){
    cy.authSession().then((response =>{
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_CLIENTS,
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
    // Get request gathers the clients
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        let lastId = response.body[response.body.length -1].id
        cy.request({
            method: "DELETE",
            url: ENDPOINT_GET_CLIENT+lastId,
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

function createCLientRequest(cy){
    cy.authSession().then((response =>{
        let fakeClientPayload = createRandomClientPayload()

        // post request creates a client
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_CLIENT,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: fakeClientPayload
        }).then((response =>{ 
            const responseAsString =JSON.stringify(response) 
            expect(responseAsString).to.have.string(fakeClientPayload.name)           
        }))

        getRequestAllClientsWithAssertion(cy, fakeClientPayload.name, fakeClientPayload.email, fakeClientPayload.telephone)
    }))      
}



function createCLientRequestAndDeleteone(cy){
    cy.authSession().then((response =>{
        let fakeClientPayload = createRandomClientPayload()

        // post request creates a client
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_CLIENT,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: fakeClientPayload
        }).then((response =>{ 
            const responseAsString = JSON.stringify(response) 
            expect(responseAsString).to.have.string(fakeClientPayload.name)           
        }))

        deleteRequestAfterGet(cy)
    }))  

}

function updateRequestAfterGet(cy){
    // Get request gathers the clients
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        let secondlastId = response.body[response.body.length -2].id
        cy.request({
            method: "PUT",
            url: ENDPOINT_GET_CLIENT+secondlastId,
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

function createCLientRequestAndUpdateone(cy){
    cy.authSession().then((response =>{
        let fakeClientPayload = createRandomClientPayload()

        // post request creates a client
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_CLIENT,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: fakeClientPayload
        }).then((response =>{ 
            const responseAsString = JSON.stringify(response) 
            expect(responseAsString).to.have.string(fakeClientPayload.name)           
        }))

        updateRequestAfterGet(cy)
    }))  

}

module.exports = {
    createRandomClientPayload,
    createCLientRequest,
    getAllClientsRequest,
    createCLientRequestAndDeleteone,
    createCLientRequestAndUpdateone
}