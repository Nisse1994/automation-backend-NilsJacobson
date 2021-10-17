import * as roomHelp from '../helpers/roomhelp'


describe ('test auth', function(){
    
    it('Create room', function(){
       roomHelp.createRoomRequest(cy)
    })

    it('Get all rooms', function(){
        roomHelp.getAllRoomsRequest(cy)
     })

    it('Create a room and remove it', function(){
        roomHelp.createRoomRequestAndDelete(cy)             
    })

    it('Create a room and update it', function(){
        roomHelp.createRoomRequestAndUpdate(cy)
    })

})