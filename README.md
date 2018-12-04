
# payment-module-prodio

`payment-module-prodio` is an  node js client for the  `payment-services-prodio API`. Integrate in to any application to carry out payment related function with any given payment gateway.


# Philosophy

  
This project is started with an aim to reduce implementing and re-architecting common product features/requirements like notification service & thus increasing productivity and more focus on business goals. Goal of this service is to bundle and provide common features related to payment services like create merchants, create payees, carry out payments, show payment transactions etc.


### Currently Supported Payment Gateways

* [Integrity Payments](integrity/README.md)
* [PayU Money Biz](payu/README.md)

# Prerequisite:
 * Clone this repository on your server git clone https://github.com/ProdioDesignWorks/payment-services-prodio.git
 * Navigate to your repo cd payment-services-prodio
 * Install dependencies npm install
 * Start service node . or npm start or node server/server.js
 * Open http://localhost:3010/explorer/ in your browser
 * If you've pm2 installed then use this pm2 start server/server.js --name="PAYMENT_SERVICE"
 * When you install `payment-module-prodio`, it will ask question for the BASE_URL of this `PAYMENT_SERVICE` - eventually.
 * There is a [config](services/paymentsources.json) file, which defines all the root credentials for the payment gateways.
 * You will have to manually install the following `npm` modules (as of now) -
 	* npm install service-adapter-prodio --save
 	* npm install integrity-connector-prodio --save
 	* npm install payu-connector-prodio --save

# Note:
`payment-services-prodio` uses loopback as the core framework for developing API's, so all customisations, configurations, middlewares, events, and db connectors can be used which you would have used in loopback.

