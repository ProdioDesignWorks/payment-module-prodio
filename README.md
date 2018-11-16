
# payment-module-prodio

`payment-module-prodio` is an  node js client for the  `payment-services-prodio API`. Integrate in to any application to carry out payment related function with any given payment gateway.


# Philosophy

  
This project is started with an aim to reduce implementing and re-architecting common product features/requirements like notification service & thus increasing productivity and more focus on business goals. Goal of this service is to bundle and provide common features related to payment services like create merchants, create payees, carry out payments, show payment transactions etc.


# Features!
  
* Merchant 
	* Create Merchant
	* Get Merchant Activation Status
	* Get Merchant Profile
	* DeActivate Merchant
	* Remove Merchant

* Payees (Customers)
	* Add Payee
	* Edit Payee
	* Remove Payee(s)
	* Import Payees

* Cards
	* Add Card for Payee
	* Remove Card from Payee

* Payment Transaction
	* Process Payment
	* Get Payment Transactions (filter by mechant, payee, date, keyword etc.)

* Recurring Billing
	* Add Recurring Transaction
	* Edit Recurring Transaction
	* Remove Recurring Transaction

* Invoice
	* Create Invoice
	* Send Invoice

* Refund
	* Process Refund for Transaction

* Reports/Stats

* WebHooks.
 

### Currently Supported Payment Gateways

* [Integrity Payments](https://www.integritypays.com)

# Prerequisite:
 * Clone this repository on your server git clone https://github.com/ProdioDesignWorks/payment-services-prodio.git
 * Navigate to your repo cd payment-services-prodio
 * Install dependencies npm install
 * Start service node . or npm start or node server/server.js
 * Open http://localhost:3000/explorer/ in your browser
 * If you've pm2 installed then use this pm2 start server/server.js --name="PAYMENT_SERVICE"

# Note:
`payment-services-prodio` uses loopback as the core framework for developing API's, so all customisations, configurations, middlewares, events, and db connectors can be used which you would have used in loopback.

# Installation

$ npm install payment-module-prodio --save

  
# Initialization 
Require the payment-module-prodio module and initialize the payment npm module client.
```JSX

 const paymentClass = require('payment-module-prodio');
 const paymentObj = new paymentClass();
 ``` 


### Method

`1. Create Merchant:`

 	This will register subscriber as merchant into the given payment gateway.

```json
{
    "action": "CREATE_MERCHANT", //(required)
    "meta": {
    	"userId":"bb15dc52-86e2-45c0-b5ab-889aebf7a1d6", //(required)
        "basic": {
            "firstName": "Shashikant",
            "lastName": "Sharma",
            "email": "shashikant@prodio.in",
            "password": "shashikant23",
            "mobileNumber": "8097487977",
            "dateOfBirth": "MM-DD-YYYY",
            "ssn": ""
        },
        "business": {
            "businessName": "BeingExpert Inc.",
            "dbaName": "BeingExpert Inc.",
            "taxId": "",
            "contactEmail": "shashikant@prodio.in",
            "contactNumber": "8097487977",
            "addressSameAsUser": "true",
            "address": {
                "country": "",
                "state": "",
                "city": "",
                "streetAddress": "",
                "zipCode": ""
            }
        },
        "billing": {
            "cardHolderName": "Shashikant Sharma",
            "creditCardNo": "4356234589794567",
            "expiryDate": "12/2020",
            "cvv": "345",
            "saveCard": "false",
            "addressSameAsBusiness": "false",
            "address": {
                "country": "",
                "state": "",
                "city": "",
                "streetAddress": "",
                "zipCode": ""
            }
        },
        "payees": [{
                "firstName": "Pawan",
                "lastName": "Wagh",
                "email": "pawan@prodio.in",
                "mobileNumber": "12312443222",
                "address": "test address",
                "paymentMethod": "CREDIT_CARD"
            },
            {
                "firstName": "Anurag",
                "lastName": "Tiwari",
                "email": "anurag@prodio.in",
                "mobileNumber": "12312443222",
                "address": "test address",
                "paymentMethod": "CREDIT_CARD"
            },
            {
                "firstName": "Vatsal",
                "lastName": "Shah",
                "email": "vatsal@prodio.in",
                "mobileNumber": "123893222",
                "address": "test address",
                "paymentMethod": "CREDIT_CARD"
            }
        ]
    }
}
```

