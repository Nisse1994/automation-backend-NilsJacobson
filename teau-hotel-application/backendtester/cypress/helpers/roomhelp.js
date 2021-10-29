const faker = require ('faker')

const ENDPOINT_GET_ROOMS = 'http://localhost:3000/api/rooms'
const ENDPOINT_POST_ROOM = 'http://localhost:3000/api/room/new'

const ENDPOINT_GET_ROOM = 'http://localhost:3000/api/room/'


function createRandomRoomPayload(){
    const fakeCategory = faker.vehicle.type()
    const fakeFloor = faker.lorem.word()
    const fakeNumber = faker.image.image()
    const fakeAvailable = faker.image.city()
    const fakePrice = faker.commerce.price()
    const fakeFeatures = faker.commerce.color()


    const payload = {
        "category": fakeCategory,
        "floor": fakeFloor,
        "number": fakeNumber,
        "available": fakeAvailable,
        "price": fakePrice,
        "features": fakeFeatures
    }

    return payload
    
    }



function getAllRoomsRequest(cy){
    cy.authSession().then((response =>{
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_ROOMS,
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
    // Get request gathers the rooms
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_ROOMS,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        let lastId = response.body[response.body.length -1].id
        cy.request({
            method: "DELETE",
            url: ENDPOINT_GET_ROOM+lastId,
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

function createRoomRequest(cy){
    cy.authSession().then((response =>{
        let fakeRoomPayload = createRandomRoomPayload()

        // post request creates a room
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_ROOM,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: fakeRoomPayload
        }).then((response =>{ 
            const responseAsString =JSON.stringify(response) 
            expect(responseAsString).to.have.string(fakeRoomPayload.floor)           
        }))

    }))      
}



function createRoomRequestAndDeleteone(cy){
    cy.authSession().then((response =>{
        let fakeRoomPayload = createRandomRoomPayload()

        // post request creates a room
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_ROOM,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: fakeRoomPayload
        }).then((response =>{ 
            const responseAsString = JSON.stringify(response) 
            expect(responseAsString).to.have.string(fakeRoomPayload.category)           
        }))

        deleteRequestAfterGet(cy)
    }))  

}

function updateRequestAfterGet(cy){
    // Get request gathers the rooms
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_ROOMS,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        let secondlastId = response.body[response.body.length -2].id
        cy.request({
            method: "PUT",
            url: ENDPOINT_GET_ROOM+secondlastId,
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

function createRoomRequestAndUpdateone(cy){
    cy.authSession().then((response =>{
        let fakeRoomPayload = createRandomRoomPayload()
        // post request creates a roomt
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_ROOM,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: fakeRoomPayload
        }).then((response =>{ 
            const responseAsString = JSON.stringify(response) 
            expect(responseAsString).to.have.string(fakeRoomPayload.category)           
        }))

        updateRequestAfterGet(cy)
    }))  

}

module.exports = {
    createRandomRoomPayload,
    createRoomRequest,
    getAllRoomsRequest,
    createRoomRequestAndDeleteone,
    createRoomRequestAndUpdateone
}