import * as clientHelp from '../helpers/clientHelp'


describe ('test auth', function(){
    it('Create client', function(){
       clientHelp.createCLientRequest(cy)
    })

    it('Get all clients', function(){
        clientHelp.getAllClientsRequest(cy)
     })

    it('Create a client and remove it', function(){
        clientHelp.createCLientRequestAndDelete(cy)             
    })

    it('Create a client and update it', function(){
        clientHelp.createCLientRequestAndUpdate(cy)
    })

})