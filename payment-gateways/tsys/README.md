
# Features!

* Payment Transaction
	* Process Payment
	* Get Payment Status
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
 

### Installation

$ npm install payment-module-prodio --save

  
# Initialization 
Require the payment-module-prodio module and initialize the payment npm module client.
```JSX

 const paymentClass = require('payment-module-prodio');
 const paymentObj = new paymentClass(BASE_URL);
 ``` 


### Method

`1. Create Merchant:`

 	This will register subscriber as merchant into the given payment gateway.


### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `CREATE_MERCHANT` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/integrity/create_merchant.json) | Json having merchant details. | YES |


#### Example

```JSX
	const payload = {
	    "action": "CREATE_MERCHANT",
	    "meta": SAMPLE_META_INFO
	};
	//create merchant in payment module
	paymentObj.execute(payload, function(response) {
	    if (typeof response == "string" || typeof response === "string") {
	        response = JSON.parse(response);
	    }

	    if (!isNull(response.data)) {
	        let serverResponse = response["data"];
	        if (typeof serverResponse == "string" || typeof serverResponse === "string") {
	            serverResponse = JSON.parse(response["data"]);
	        }

	        if (!isNull(serverResponse.error)) {
	            //Error Response
	            return cb(new HttpErrors.InternalServerError(response.data.error.message, {
	                expose: false
	            }));
	        } else {
	            // HTTP : 200 , Success Response , Merchant Successfully Created!!
	            return cb(null, response.data);
	        }
	    } else {
	        if (!isNull(response["response"])) {
	            let serverResponse = response["response"]["data"];
	            if (typeof serverResponse == "string" || typeof serverResponse === "string") {
	                serverResponse = JSON.parse(response["response"]["data"]);
	            }

	            let serverResponseError = serverResponse["error"];
	            if (typeof serverResponseError == "string" || typeof serverResponseError === "string") {
	                serverResponseError = JSON.parse(serverResponseError["error"]);
	            }

	            let _msg = isNull(serverResponseError["message"]) ? 'Internal Server Error' : serverResponseError["message"];

	            //Error Response
	            return cb(new HttpErrors.InternalServerError(_msg, {
	                expose: false
	            }));
	        } else {
	            let _msg = isNull(response["data"]["message"]) ? 'Internal Server Error' : response["data"]["message"];

	            //Error Response
	            return cb(new HttpErrors.InternalServerError(_msg, {
	                expose: false
	            }));
	        }
	    }
	});
```

`2. Get Merchant Activation Status:`

 	This function will be used to get the merchant activation status.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `GET_MERCHANT_STATUS` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/integrity/get_merchant_activation_status.json) | Json having merchant details. | YES |


`3. Get Merchant Id from (Your) User Id:`

 	This function will be used to get the merchant id from user id.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `GET_MERCHANT_ID` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/integrity/get_merchant_id.json) | Json having merchant details. | YES |


`4. Get Merchant Profile:`

 	This function will be used to get the merchant activation status.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `GET_MERCHANT_PROFILE` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/integrity/get_merchant_profile.json) | Json having merchant details. | YES |

`5. Update Merchant Profile:`

 	This function will be used to update the merchant info.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `UPDATE_MERCHANT_PROFILE` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/integrity/update_merchant_info.json) | Json having merchant details. | YES |


`6. Deactivate Merchant Account:`

 	This function will be used to deactivate the merchant account.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `DEACTIVATE_MERCHANT` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/integrity/update_merchant_info.json) | Json having merchant details. | YES |


`7. Create Payer:`

 	This function will be used to add payer to the merchant.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `CREATE_PAYER` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/integrity/create_payer.json) | Json having merchant details. | YES |


`8. Edit Payer Info:`

 	This function will be used to edit payer information.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `EDIT_PAYER` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/integrity/edit_payer_info.json) | Json having merchant details. | YES |


`9. Remove Payer:`

 	This function will be used to remove payer from merchant account.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `REMOVE_PAYER` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/integrity/remove_payer.json) | Json having merchant details. | YES |



`10. Create Payment Request Transaction:`

 	This function will be used to request or create payment transaction.	

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `CREATE_TRANSACTION` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/integrity/create_transaction.json) | Json having merchant details. | YES |


`11. Get Payers Listing:`

 	This function will provide the listing of active payers for the merchant.	

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `GET_PAYERS_LISTING` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/integrity/get_payers_listing.json) | Json having merchant details. | YES |


`12. Get Payer Profile:`

 	This function will provide the profile details for the payer account.	

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `GET_PAYER_PROFILE` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/integrity/get_payer_profile.json) | Json having merchant details. | YES |



`13. Direct Payment:`

 	This will does the payment transaction without need of saving the payer first.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `DIRECT_PAYMENT` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/tsys/tsys_direct_payment.json) | Json having merchant details. | YES |


`14. Make Refund:`

 	This will does the refund part for the transaction.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `MAKE_REFUND` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/tsys/make_refund.json) | Json having merchant details. | YES |

