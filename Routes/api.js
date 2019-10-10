const express  = require('express');
const router = express.Router();
const saverModel = require('./Model/model');
const nextOfKinModel = require('./Model/NextOfKin');
const stripe = require('stripe')('sk_test_O46oycaBnyq05dsbydwbZcZM00Lvb46XCc');
const joi = require('@hapi/joi');








router.post('/saver',async (req, res)=>{
  try {

   /*  const schema = joi.object().keys({
        name: joi.string().trim().required(),
        email: joi.string().email().required(),
        phoneNumber: joi.number().integer().required()
    });

    await joi.validate(req.body, schema); */


      const Saver = await saverModel.create(req.body);
      res.json({
          data: Saver,
          status: 'Success'
      });
      console.log(Saver.name) 
  } catch (error) {
      res.json({
          data: error,
          status:' Error creating a saver model'
      })
  }  
  
});

router.post('/nextofkin', async(req, res)=>{
    try {
        const nextofkin = await nextOfKinModel.create(req.body);
        const result = nextofkin.toJSON()
        delete result.pinNumber
  res.json({
      data: {nextofkin: result},
      status:'Success entering next of kin details'
  })
  console.log(nextofkin);
    } catch (error) {
        res.json({
            data: error,
            status:'Please enter your next of kin details'
        })
    }
  
});

 router.post('/tokens', async(req, res)=>{
    stripe.tokens.create({
        card: {
          number: '4242424242424242',
          exp_month: 12,
          exp_year: 2020,
          cvc: '123',
          address_city: '31 mobolajji bank anthony way'
        }
      }, function(err, token) {
        // asynchronously called
        console.log(token)
      });
}); 

router.post('/payments', async (req, res)=>{
try {
   

      const customer = await stripe.customers.create({
        email: req.body.email,
        description: "test payment",  
        balance: 250,        
      });

      /*  const charge = await stripe.charges.create({
        amount: 1000,
        currency:'usd',
        customer:'cus_FxvHec8ac1YYN6',
        
      }) */

     
      
    //const amount = charge.amount-customer.balance;
    const {email, description} = customer
    //console.log({email,description,balance, amount, id,invoice_prefix, charge}) */ 
    console.log(customer.id);
    //console.log(charge)

   res.json({
        data: {email, description},
        status: 'Successfully retrieved data from stripe'})
} catch (error) {
    console.log(error)
    res.json({
        status:'failed',
        message:'Error getting data from stripe'
    })
}
    
})
router.post('/newcustomer', async (req, res)=>{
    try {
        const customer = await stripe.customers.create({
            email: req.body.email,
            description: "test payment",  
            balance: 250,        
          });


         


            await stripe.customers.createSource(
            customer.id,
            {
              source: 'tok_mastercard',
            },
            function(err, card) {
              // asynchronously called
             console.log(card)
            }
          );

    
    } catch (error) {
        
    }
})


router.get('/saver', async (req, res)=>{
    
    console.log('yaah i have sent a result' + res.send("hello world"))
})

module.exports = router;