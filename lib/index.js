'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** 
 * By Shashikant Sharma 
 * 
 * This code will take the user action and based on the user action and payload it will call the respective payment service.
 *  
 */
// eslint-disable-next-line import/prefer-default-export
var axios = require('axios');
var CircularJSON = require('circular-json');
//const BASE_URL = `https://5m4hb8aet1.execute-api.us-west-2.amazonaws.com/prod/`;
var HttpErrors = require('http-errors');

var isNull = function isNull(val) {
  if (typeof val === 'string') {
    val = val.trim();
  }
  if (val === undefined || val === null || typeof val === 'undefined' || val === '' || val === 'undefined') {
    return true;
  }
  return false;
};

var isJson = function isJson(str) {
  try {
    var obj = JSON.parse(JSON.stringify(str));
    if (obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
};

function paymentServices(BASE_URL) {
  this.execute = function (payload, callback) {
    // action key calls api.
    if (payload.action) {
      switch (payload.action) {
        case "CREATE_MERCHANT":
          return funCreateMerchant(BASE_URL, payload, callback);
          break;
        case "GET_MERCHANT_ID":
          return funGetMerchantId(BASE_URL, payload, callback);
          break;
        case "GET_MERCHANT_STATUS":
          return funMerchantActionvationStatus(BASE_URL, payload, callback);
          break;
        case "GET_MERCHANT_PROFILE":
          return funMerchantProfile(BASE_URL, payload, callback);
          break;
        case "UPDATE_MERCHANT_PROFILE":
          return funUpdateMerchantProfile(BASE_URL, payload, callback);
          break;
        case "DEACTIVATE_MERCHANT":
          return funDeactivateAccount(BASE_URL, payload, callback);
          break;
        case "CREATE_PAYER":
          return funCreatePayer(BASE_URL, payload, callback);
          break;
        case "IMPORT_PAYERS":
          return funImportPayers(BASE_URL, payload, callback);
          break;
        case "GET_PAYERS_LISTING":
          return funGetPayersListing(BASE_URL, payload, callback);
          break;
        case "GET_PAYER_PROFILE":
          return funGetPayerProfile(BASE_URL, payload, callback);
          break;
        case "CREATE_TRANSACTION":
          return funCreateTransaction(BASE_URL, payload, callback);
          break;
        case "SAVE_CARD":
          return funSaveCard(BASE_URL, payload, callback);
          break;
        case "REMOVE_CARD":
          return funRemoveCard(BASE_URL, payload, callback);
          break;
        case "GET_SAVED_CARDS":
          return funSavedCardsListing(BASE_URL, payload, callback);
          break;
        case "EDIT_PAYER":
          return funEditPayer(BASE_URL, payload, callback);
          break;
        case "REMOVE_PAYER":
          return funRemovePayer(BASE_URL, payload, callback);
          break;
        case "PROCESS_PAYMENT":
          return funProcessPayment(BASE_URL, payload, callback);
          break;
        case "GET_TRANSACTIONS_LISTING":
          return funGetTransactionsListing(BASE_URL, payload, callback);
          break;
        case "GET_TRANSACTION_DETAILS":
          return funGetTransactionDetails(BASE_URL, payload, callback);
          break;
        case "GET_NON_PAYERS_LISTING":
          return funGetNonPayersListing(BASE_URL, payload, callback);
          break;
        case "GET_TRANSACTION_STATS":
          return funGetTransactionStats(BASE_URL, payload, callback);
          break;
        case "GET_PAYER_TRANSACTION_STATS":
          return funGetPayerTransactionStats(BASE_URL, payload, callback);
          break;
        case "GET_PAYERS_TRANSACTION":
          return funGetPayersTransactions(BASE_URL, payload, callback);
          break;
        case "GET_ALL_MERCHANTS":
          return funGetAllMerchants(BASE_URL, payload, callback);
          break;
        default:
          var errorMessage = 'Please add BaseUrl.';
          return errorMessage;
          break;
      }
    } else {
      return "Please provide valid action";
    }
  };
}

/**
* This function will call create merchant service.
* @param payload - the required payload JSON to perform the operations.
* @param callback - to send the response back to the requester.
*/
var funCreateMerchant = function funCreateMerchant(BASE_URL, payload, callback) {
  var userId = payload["meta"]["userId"];
  if (isNull(userId)) {
    return callback(new HttpErrors.BadRequest('User Id is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayMerchants/createMerchant?userId=' + userId;
  axios.post(url, payload).then(function (response) {
    console.log(response);
    return callback(response);
  }).catch(function (error) {
    var json = CircularJSON.stringify(error);
    return callback(json);
  });
};

var funGetAllMerchants = function funGetAllMerchants(BASE_URL, payload, callback) {

  var url = BASE_URL + 'ezpayMerchants/getAllActiveMerchants';
  axios.get(url).then(function (response) {
    console.log(response);
    return callback(response);
  }).catch(function (error) {
    var json = CircularJSON.stringify(error);
    return callback(json);
  });
};

/**
* This function will get merchant account activation status.
* @param payload - the required payload JSON to perform the operations.
* @param callback - to send the response back to the requester.
*/

var funMerchantActionvationStatus = function funMerchantActionvationStatus(BASE_URL, payload, callback) {
  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  var url = BASE_URL + 'ezpayMerchants/getMerchantActivationStatus?merchantId=' + merchantId;
  axios.post(url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = CircularJSON.stringify(error);
    return callback(json);
  });
};

var funGetMerchantId = function funGetMerchantId(BASE_URL, payload, callback) {
  var merchantId = payload["meta"]["userId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('user Id is mandatory.', { expose: false }));
  }
  var url = BASE_URL + 'ezpayMerchants/getMerchantFromUserId?userId=' + userId;
  axios.post(url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = CircularJSON.stringify(error);
    return callback(json);
  });
};

var funMerchantProfile = function funMerchantProfile(BASE_URL, payload, callback) {
  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  var url = BASE_URL + 'ezpayMerchants/getMerchantProfile?merchantId=' + merchantId;
  axios.post(url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = CircularJSON.stringify(error);
    return callback(json);
  });
};

var funUpdateMerchantProfile = function funUpdateMerchantProfile(BASE_URL, payload, callback) {
  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  var url = BASE_URL + 'ezpayMerchants/updateMerchantProfile?merchantId=' + merchantId;
  axios.post(url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = CircularJSON.stringify(error);
    return callback(json);
  });
};

var funDeactivateAccount = function funDeactivateAccount(BASE_URL, payload, callback) {
  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  var url = BASE_URL + 'ezpayMerchants/deactivateMerchant?merchantId=' + merchantId;
  axios.post(url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = CircularJSON.stringify(error);
    return callback(json);
  });
};

var funCreatePayer = function funCreatePayer(BASE_URL, payload, callback) {
  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  var url = BASE_URL + 'ezpayPayees/addPayee?merchantId=' + merchantId;
  axios.post(url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = CircularJSON.stringify(error);
    return callback(json);
  });
};

var funEditPayer = function funEditPayer(BASE_URL, payload, callback) {
  var payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }
  var url = BASE_URL + 'ezpayPayees/editPayee?payerId=' + payerId;
  axios.post(url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = CircularJSON.stringify(error);
    return callback(json);
  });
};

var funRemovePayer = function funRemovePayer(BASE_URL, payload, callback) {
  var payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }
  var url = BASE_URL + 'ezpayPayees/removePayees?payerIds=' + payerId;
  axios.post(url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = CircularJSON.stringify(error);
    return callback(json);
  });
};

var funImportPayers = function funImportPayers(BASE_URL, payload, callback) {
  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  var url = BASE_URL + 'ezpayPayees/importPayees?merchantId=' + merchantId;
  axios.post(url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = CircularJSON.stringify(error);
    return callback(json);
  });
};

var funGetPayersListing = function funGetPayersListing(BASE_URL, payload, callback) {
  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  var url = BASE_URL + 'ezpayMerchants/getPayeesListing?merchantId=' + merchantId;
  axios.post(url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = CircularJSON.stringify(error);
    return callback(json);
  });
};

var funGetPayerProfile = function funGetPayerProfile(BASE_URL, payload, callback) {
  var payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }
  var url = BASE_URL + 'ezpayPayees/getPayerProfile?payerId=' + payerId;
  axios.post(url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = CircularJSON.stringify(error);
    return callback(json);
  });
};

var funCreateTransaction = function funCreateTransaction(BASE_URL, payload, callback) {
  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  var payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/requestPayment?merchantId=' + merchantId + '&payerId=' + payerId;
  axios.post(url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = CircularJSON.stringify(error);
    return callback(json);
  });
};

var funSaveCard = function funSaveCard(BASE_URL, payload, callback) {

  var payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayPayees/addCardForPayee?payerId=' + payerId;
  axios.post(url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = CircularJSON.stringify(error);
    return callback(json);
  });
};

var funRemoveCard = function funRemoveCard(BASE_URL, payload, callback) {

  var payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  var cardId = payload["meta"]["cardId"];
  if (isNull(cardId)) {
    return callback(new HttpErrors.BadRequest('card Id is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayPayees/removeCard?payerId=' + payerId + '&cardId=' + cardId;
  axios.post(url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = CircularJSON.stringify(error);
    return callback(json);
  });
};

var funSavedCardsListing = function funSavedCardsListing(BASE_URL, payload, callback) {

  var payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayPayees/getSavedCards?payerId=' + payerId;
  axios.post(url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = CircularJSON.stringify(error);
    return callback(json);
  });
};

var funGetTransactionsListing = function funGetTransactionsListing(BASE_URL, payload, callback) {

  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  var pageNo = 0;
  if (!isNull(payload["meta"]["pageNo"])) {
    pageNo = payload["meta"]["pageNo"];
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/getTransactionsListing?merchantId=' + merchantId + '&pageNo=' + pageNo;
  axios.post(url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = CircularJSON.stringify(error);
    return callback(json);
  });
};

var funProcessPayment = function funProcessPayment(BASE_URL, payload, callback) {

  var payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  var transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transaction Id is mandatory.', { expose: false }));
  }

  var cardId = "";
  if (!isNull(payload["meta"]["cardId"])) {
    cardId = payload["meta"]["cardId"];
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/processPayment?payerId=' + payerId + '&transactionId=' + transactionId + '&cardId=' + cardId;
  axios.post(url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = CircularJSON.stringify(error);
    return callback(json);
  });
};

var funGetTransactionDetails = function funGetTransactionDetails(BASE_URL, payload, callback) {

  var transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transaction Id is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/getTransactionDetails?transactionId=' + transactionId;
  axios.post(url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = CircularJSON.stringify(error);
    return callback(json);
  });
};

var funGetTransactionStats = function funGetTransactionStats(BASE_URL, payload, callback) {

  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/getTransactionStats?merchantId=' + merchantId;
  axios.post(url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = CircularJSON.stringify(error);
    return callback(json);
  });
};

var funGetPayerTransactionStats = function funGetPayerTransactionStats(BASE_URL, payload, callback) {

  var payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/getPayerTransactionStats?payerId=' + payerId;
  axios.post(url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = CircularJSON.stringify(error);
    return callback(json);
  });
};

var funGetNonPayersListing = function funGetNonPayersListing(BASE_URL, payload, callback) {

  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/getNonPayersListing?merchantId=' + merchantId;
  axios.post(url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = CircularJSON.stringify(error);
    return callback(json);
  });
};

var funGetPayersTransactions = function funGetPayersTransactions(BASE_URL, payload, callback) {

  var payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }
  var pageNo = 0;
  if (!isNull(payload["meta"]["pageNo"])) {
    pageNo = payload["meta"]["pageNo"];
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/getPayersTransactions?payerId=' + payerId + '&pageNo=' + pageNo;
  axios.post(url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = CircularJSON.stringify(error);
    return callback(json);
  });
};

module.exports = paymentServices;