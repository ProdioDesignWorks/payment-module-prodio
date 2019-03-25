
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

Include  https://github.com/ProdioDesignWorks/openedge-js-sdk to your front-end  repository
openedge-js-sdk handles redirections on basis of success/failure  of payments done via open-edge payment gateway .






### Method

`1. Create Merchant:`

 	This will register subscriber as merchant into the given payment gateway.


### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `CREATE_MERCHANT` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/open-edge/create_merchant.json) | Json having merchant details. | YES |


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
| `meta` | json | [SAMPLE_META_INFO](/sample_json/open-edge/get_merchant_activation_status.json) | Json having merchant details. | YES |


`3. Get Merchant Id from (Your) User Id:`

 	This function will be used to get the merchant id from user id.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `GET_MERCHANT_ID` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/open-edge/get_merchant_id.json) | Json having merchant details. | YES |


`4. Get Merchant Profile:`

 	This function will be used to get the merchant activation status.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `GET_MERCHANT_PROFILE` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/open-edge/get_merchant_profile.json) | Json having merchant details. | YES |

`5. Update Merchant Profile:`

 	This function will be used to update the merchant info.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `UPDATE_MERCHANT_PROFILE` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/open-edge/update_merchant_info.json) | Json having merchant details. | YES |


`6. Deactivate Merchant Account:`

 	This function will be used to deactivate the merchant account.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `DEACTIVATE_MERCHANT` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/open-edge/update_merchant_info.json) | Json having merchant details. | YES |


`7. Create Payer:`

 	This function will be used to add payer to the merchant.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `CREATE_PAYER` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/open-edge/create_payer.json) | Json having merchant details. | YES |


`8. Edit Payer Info:`

 	This function will be used to edit payer information.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `EDIT_PAYER` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/open-edge/edit_payer_info.json) | Json having merchant details. | YES |


`9. Remove Payer:`

 	This function will be used to remove payer from merchant account.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `REMOVE_PAYER` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/open-edge/remove_payer.json) | Json having merchant details. | YES |



`10. Create Payment Request Transaction:`

 	This function will be used to request or create payment transaction.	

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `CREATE_TRANSACTION` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/open-edge/create_transaction.json) | Json having merchant details. | YES |


`11. Get Payers Listing:`

 	This function will provide the listing of active payers for the merchant.	

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `GET_PAYERS_LISTING` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/open-edge/get_payers_listing.json) | Json having merchant details. | YES |


`12. Get Payer Profile:`

 	This function will provide the profile details for the payer account.	

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `GET_PAYER_PROFILE` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/open-edge/get_payer_profile.json) | Json having merchant details. | YES |



`13. Process Payment Transaction:`

 	This will does the payment transaction.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `PROCESS_PAYMENT` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/open-edge/openedge_process_payment.json) | Json having merchant details. | YES |


`14. VERIFY & SAVE CREDIT CARD:`

 	This will Verify whether the credit card is valid or not and then save it. This is required step before starting auto recurring payment or installments feature.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `VERIFY_CARD` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/open-edge/verify_card.json) | Json having merchant details. | YES |



`15. Get Saved Cards Listing For Payer:`

 	This function will allow to save credit cards for payers, if opted.	

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `GET_SAVED_CARDS` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/open-edge/get_saved_cards.json) | Json having merchant details. | YES |


`16. Remove Card for Payer:`

 	This function will allow to save credit cards for payers, if opted.	

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `REMOVE_CARD` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/open-edge/remove_card.json) | Json having merchant details. | YES |


`17. Payment with saved card:`

 	This function will allow to do direct payment with selected saved card.	

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `PAY_WITH_SAVED_CARD` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/open-edge/pay_direct_with_saved_card.json) | Json having merchant details. | YES |


`18. Add New Insallment within a transaction:`

 	This function will allow to add new installment within a transaction.	

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `ADD_INSTALLMENT` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/open-edge/add_installment.json) | Json having merchant details. | YES |


`19. Edit a Insallment within a transaction:`

 	This function will allow to add new installment within a transaction.	

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `EDIT_INSTALLMENT` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/open-edge/edit_installment.json) | Json having merchant details. | YES |



`20. Remove a Insallment within a transaction:`

 	This function will allow to add new installment within a transaction.	

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `REMOVE_INSTALLMENT` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/sample_json/open-edge/remove_installment.json) | Json having merchant details. | YES |

