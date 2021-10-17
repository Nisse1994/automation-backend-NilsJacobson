import * as billHelp from '../helpers/billHelp'


describe ('test auth', function(){
    
    it('Create bill', function(){
       billHelp.createBillRequest(cy)
    })

    it('Get all bills', function(){
        billHelp.getAllBillsRequest(cy)
     })

    it('Create a bill and remove it', function(){
        billHelp.createBillRequestAndDelete(cy)             
    })

    it('Create a bill and update it', function(){
        billHelp.createBillRequestAndUpdate(cy)
    })

})