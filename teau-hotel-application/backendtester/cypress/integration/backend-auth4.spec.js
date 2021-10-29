import * as reservationHelp from '../helpers/reservationhelp'


describe ('test auth', function(){
    
    it('Create reservation', function(){
       reservationHelp.createReservationRequest(cy)
    })

    it('Get all reservations', function(){
        reservationHelp.getAllReservationsRequest(cy)
     })

    it('Create a reservation and remove one', function(){
        reservationHelp.createReservationRequestAndDeleteone(cy)             
    })

    it('Create a reservation and update one', function(){
        reservationHelp.createReservationRequestAndUpdateone(cy)
    })

})