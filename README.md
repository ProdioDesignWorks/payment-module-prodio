
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


### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `CREATE_MERCHANT` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](sample_json/create_merchant.json) | Json having merchant details. | YES |


#### Example

```JSX
    const  payload = {
        "action": "CREATE_MERCHANT",
        "meta": SAMPLE_META_INFO
    };
    //create merchant in payment module
    let createMerchantResponse = paymentObj.execute(payload);
```

