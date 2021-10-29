import * as billHelp from '../helpers/billHelp'


describe ('test auth', function(){
    
    it('Create bill', function(){
       billHelp.createBillRequest(cy)
    })

    it('Get all bills', function(){
        billHelp.getAllBillsRequest(cy)
     })

    it('Create a bill and remove one', function(){
        billHelp.createBillRequestAndDeleteone(cy)             
    })

    it('Create a bill and update one', function(){
        billHelp.createBillRequestAndUpdateone(cy)
    })

})