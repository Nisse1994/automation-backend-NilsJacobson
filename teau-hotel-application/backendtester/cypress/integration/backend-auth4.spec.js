import * as reservationHelp from '../helpers/reservationhelp'


describe ('test auth', function(){
    
    it('Create reservation', function(){
       reservationHelp.createReservationRequest(cy)
    })

    it('Get all reservations', function(){
        reservationHelp.getAllReservationsRequest(cy)
     })

    it('Create a reservation and remove it', function(){
        reservationHelp.createReservationRequestAndDelete(cy)             
    })

    it('Create a reservation and update it', function(){
        reservationHelp.createReservationRequestAndUpdate(cy)
    })

})