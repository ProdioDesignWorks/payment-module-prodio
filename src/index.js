/** 
 * By Shashikant Sharma 
 * 
 * This code will take the user action and based on the user action and payload it will call the respective payment service.
 *  
 */ 
// eslint-disable-next-line import/prefer-default-export
const axios = require('axios');
const CircularJSON = require('circular-json');
//const BASE_URL = `https://5m4hb8aet1.execute-api.us-west-2.amazonaws.com/prod/`;
const HttpErrors = require('http-errors');

const isNull = function (val) {
  if (typeof val === 'string') { val = val.trim(); }
  if (val === undefined || val === null || typeof val === 'undefined' || val === '' || val === 'undefined') {
    return true;
  }
  return false;
};

const isJson = function (str) {
  try {
    var obj = JSON.parse(JSON.stringify(str));
    if (obj && typeof obj === 'object' && obj !== null) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
}

function paymentServices(BASE_URL) {
  this.execute = function (payload,callback) {
    // action key calls api.
    if(payload.action){
      switch(payload.action){
        case "CREATE_MERCHANT":
          return funCreateMerchant(BASE_URL,payload,callback);
        break;
        case "GET_MERCHANT_ID":
          return funGetMerchantId(BASE_URL,payload,callback);
        break;
        case "GET_MERCHANT_STATUS":
          return funMerchantActionvationStatus(BASE_URL,payload,callback);
        break;
        case "GET_MERCHANT_PROFILE":
          return funMerchantProfile(BASE_URL,payload,callback);
        break;
        case "UPDATE_MERCHANT_PROFILE":
          return funUpdateMerchantProfile(BASE_URL,payload,callback);
        break;
        case "DEACTIVATE_MERCHANT":
          return funDeactivateAccount(BASE_URL,payload,callback);
        break;
        case "CREATE_PAYER":
          return funCreatePayer(BASE_URL,payload,callback);
        break;
        case "IMPORT_PAYERS":
          return funImportPayers(BASE_URL,payload,callback);
        break;
        case "GET_PAYERS_LISTING":
          return funGetPayersListing(BASE_URL,payload,callback);
        break;
        case "GET_PAYER_PROFILE":
          return funGetPayerProfile(BASE_URL,payload,callback);
        break;
        case "CREATE_TRANSACTION":
          return funCreateTransaction(BASE_URL,payload,callback);
        break;
        case "SAVE_CARD":
          return funSaveCard(BASE_URL,payload,callback);
        break;
        case "REMOVE_CARD":
          return funRemoveCard(BASE_URL,payload,callback);
        break;
        case "GET_SAVED_CARDS":
          return funSavedCardsListing(BASE_URL,payload,callback);
        break;
        case "EDIT_PAYER":
          return funEditPayer(BASE_URL,payload,callback);
        break;
        case "REMOVE_PAYER":
          return funRemovePayer(BASE_URL,payload,callback);
        break;
        case "PROCESS_PAYMENT":
          return funProcessPayment(BASE_URL,payload,callback);
        break;
        case "GET_TRANSACTIONS_LISTING":
          return funGetTransactionsListing(BASE_URL,payload,callback);
        break;
        case "GET_TRANSACTION_DETAILS":
          return funGetTransactionDetails(BASE_URL,payload,callback);
        break;
        case "GET_NON_PAYERS_LISTING":
          return funGetNonPayersListing(BASE_URL,payload,callback);
        break;
        case "GET_TRANSACTION_STATS":
          return funGetTransactionStats(BASE_URL,payload,callback);
        break;
        case "GET_PAYER_TRANSACTION_STATS":
          return funGetPayerTransactionStats(BASE_URL,payload,callback);
        break;
        case "GET_PAYERS_TRANSACTION":
          return funGetPayersTransactions(BASE_URL,payload,callback);
        break;
        case "GET_ALL_MERCHANTS":
          return funGetAllMerchants(BASE_URL,payload,callback);
        break;
        case "ATTACH_PAYER_MERCHANT":
          return funAttachPayerWithMerchant(BASE_URL,payload,callback);
        break;
        case "GET_MERCHANTS_OF_PAYER":
          return funGetMerchantsForPayer(BASE_URL,payload,callback);
        break;
        default:
          let errorMessage = `Please add BaseUrl.`;
          return errorMessage;
        break;
      }
    }else{
      return "Please provide valid action";
    }

  };
}


/**
* This function will call create merchant service.
* @param payload - the required payload JSON to perform the operations.
* @param callback - to send the response back to the requester.
*/
const funCreateMerchant = function (BASE_URL,payload,callback) {
  let userId = payload["meta"]["userId"];
  if (isNull(userId)) {
    return callback(new HttpErrors.BadRequest('User Id is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpayMerchants/createMerchant?userId=${userId}`;
  axios.post(url, payload).then(response => {
    console.log(response)
    return callback(response);
  })
  .catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}

const funGetAllMerchants = function (BASE_URL,payload,callback) {

  let url = `${BASE_URL}ezpayMerchants/getAllActiveMerchants`;
  axios.get(url).then(response => {
    console.log(response)
    return callback(response);
  })
  .catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}

/**
* This function will get merchant account activation status.
* @param payload - the required payload JSON to perform the operations.
* @param callback - to send the response back to the requester.
*/

const funMerchantActionvationStatus = function (BASE_URL,payload,callback) {
  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  let url = `${BASE_URL}ezpayMerchants/getMerchantActivationStatus?merchantId=${merchantId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}


const funGetMerchantId = function (BASE_URL,payload,callback) {
  let merchantId = payload["meta"]["userId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('user Id is mandatory.', { expose: false }));
  }
  let url = `${BASE_URL}ezpayMerchants/getMerchantFromUserId?userId=${userId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}

const funMerchantProfile = function (BASE_URL,payload,callback) {
  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  let url = `${BASE_URL}ezpayMerchants/getMerchantProfile?merchantId=${merchantId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}


const funUpdateMerchantProfile = function (BASE_URL,payload,callback) {
  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  let url = `${BASE_URL}ezpayMerchants/updateMerchantProfile?merchantId=${merchantId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}

const funDeactivateAccount = function (BASE_URL,payload,callback) {
  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  let url = `${BASE_URL}ezpayMerchants/deactivateMerchant?merchantId=${merchantId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}


const funCreatePayer = function (BASE_URL,payload,callback) {
  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  let url = `${BASE_URL}ezpayPayees/addPayee?merchantId=${merchantId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}

const funEditPayer = function (BASE_URL,payload,callback) {
  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }
  let url = `${BASE_URL}ezpayPayees/editPayee?payerId=${payerId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}

const funRemovePayer = function (BASE_URL,payload,callback) {
  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }
  let url = `${BASE_URL}ezpayPayees/removePayees?payerIds=${payerId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}


const funImportPayers = function (BASE_URL,payload,callback) {
  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  let url = `${BASE_URL}ezpayPayees/importPayees?merchantId=${merchantId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}


const funGetPayersListing = function (BASE_URL,payload,callback) {
  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  let url = `${BASE_URL}ezpayMerchants/getPayeesListing?merchantId=${merchantId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}


const funGetPayerProfile = function (BASE_URL,payload,callback) {
  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }
  let url = `${BASE_URL}ezpayPayees/getPayerProfile?payerId=${payerId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}


const funCreateTransaction = function (BASE_URL,payload,callback) {
  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }
  
  let url = `${BASE_URL}ezpayPaymentTransactions/requestPayment?merchantId=${merchantId}&payerId=${payerId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}

const funSaveCard = function (BASE_URL,payload,callback) {
  
  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }
  
  let url = `${BASE_URL}ezpayPayees/addCardForPayee?payerId=${payerId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}

const funRemoveCard = function (BASE_URL,payload,callback) {
  
  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  let cardId = payload["meta"]["cardId"];
  if (isNull(cardId)) {
    return callback(new HttpErrors.BadRequest('card Id is mandatory.', { expose: false }));
  }
  
  let url = `${BASE_URL}ezpayPayees/removeCard?payerId=${payerId}&cardId=${cardId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}

const funSavedCardsListing = function (BASE_URL,payload,callback) {
  
  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }
  
  let url = `${BASE_URL}ezpayPayees/getSavedCards?payerId=${payerId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}

const funGetTransactionsListing = function (BASE_URL,payload,callback) {
  
  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  let pageNo = 0;
  if (!isNull(payload["meta"]["pageNo"])) {
    pageNo = payload["meta"]["pageNo"];
  }
  
  let url = `${BASE_URL}ezpayPaymentTransactions/getTransactionsListing?merchantId=${merchantId}&pageNo=${pageNo}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}

const funProcessPayment = function (BASE_URL,payload,callback) {
  
  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  let transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transaction Id is mandatory.', { expose: false }));
  }

  let cardId = "";
  if (!isNull(payload["meta"]["cardId"])) {
    cardId = payload["meta"]["cardId"];
  }
  
  let url = `${BASE_URL}ezpayPaymentTransactions/processPayment?payerId=${payerId}&transactionId=${transactionId}&cardId=${cardId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}


const funGetTransactionDetails = function (BASE_URL,payload,callback) {
  
  let transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transaction Id is mandatory.', { expose: false }));
  }
  
  let url = `${BASE_URL}ezpayPaymentTransactions/getTransactionDetails?transactionId=${transactionId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}

const funGetTransactionStats = function (BASE_URL,payload,callback) {
  
  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  
  let url = `${BASE_URL}ezpayPaymentTransactions/getTransactionStats?merchantId=${merchantId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}

const funGetPayerTransactionStats = function (BASE_URL,payload,callback) {
  
  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }
  
  let url = `${BASE_URL}ezpayPaymentTransactions/getPayerTransactionStats?payerId=${payerId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}

const funGetNonPayersListing = function (BASE_URL,payload,callback) {
  
  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  
  let url = `${BASE_URL}ezpayPaymentTransactions/getNonPayersListing?merchantId=${merchantId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}

const funGetPayersTransactions = function (BASE_URL,payload,callback) {
  
  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }
  let pageNo = 0;
  if (!isNull(payload["meta"]["pageNo"])) {
    pageNo = payload["meta"]["pageNo"];
  }
  
  let url = `${BASE_URL}ezpayPaymentTransactions/getPayersTransactions?payerId=${payerId}&pageNo=${pageNo}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}

const funAttachPayerWithMerchant = function (BASE_URL,payload,callback) {
  
  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  
  
  let url = `${BASE_URL}ezpayPaymentTransactions/getPayersTransactions?payerId=${payerId}&merchantId=${merchantId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}

const funGetMerchantsForPayer = function (BASE_URL,payload,callback) {
  
  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpayPaymentTransactions/getPayersTransactions?payerId=${payerId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}



module.exports = paymentServices;