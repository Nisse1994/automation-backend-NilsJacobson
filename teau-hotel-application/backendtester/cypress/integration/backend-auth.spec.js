import * as clientHelp from '../helpers/clientHelp'


describe ('test auth', function(){
    it('Create client', function(){
       clientHelp.createCLientRequest(cy)
    })

    it('Get all clients', function(){
        clientHelp.getAllClientsRequest(cy)
     })

    it('Create a client and remove one', function(){
        clientHelp.createCLientRequestAndDeleteone(cy)             
    })

    it('Create a client and update one', function(){
        clientHelp.createCLientRequestAndUpdateone(cy)
    })

})