'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _constant = require('./config/constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** 
 * By Shashikant Sharma 
 * 
 * This code will take the user action and based on the user action and payload it will call the respective payment service.
 *  
 */
// eslint-disable-next-line import/prefer-default-export
var axios = require('axios');

var _require = require('flatted/cjs'),
    parse = _require.parse,
    stringify = _require.stringify;
//const BASE_URL = `https://5m4hb8aet1.execute-api.us-west-2.amazonaws.com/prod/`;


var HttpErrors = require('http-errors');
var rp = require('request-promise');

var paymentModuleClient = null;

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

var rpRequest = function rpRequest(requestType, _url, payload) {
  var options = {
    method: requestType,
    uri: _url,
    json: true // Automatically stringifies the body to JSON
  };

  if (requestType === "POST") {
    options["body"] = payload;
  }

  return new Promise(function (resolve, reject) {
    rp(options).then(function (response) {
      return resolve(response);
    }).catch(function (error) {
      var json = stringify(error);
      return reject(json);
    });
  });
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
        case "UPDATE_TRANSACTION":
          return funUpdateTransaction(BASE_URL, payload, callback);
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
        case "PROCESS_MACHINE_PAYMENT":
          return funProcessMachinePayment(BASE_URL, payload, callback);
          break;
        case "PROCESS_DIRECT_PAYMENT":
          return funProcessDirectPayment(BASE_URL, payload, callback);
          break;
        case "DIRECT_PAYMENT":
          return funDirectPayment(BASE_URL, payload, callback);
          break;
        case "GET_TRANSACTIONS_LISTING":
          return funGetTransactionsListing(BASE_URL, payload, callback);
          break;
        case "GET_TRANSACTION_DETAILS":
          return funGetTransactionDetails(BASE_URL, payload, callback);
          break;
        case "GET_TRANSACTION_INSTALLMENTS":
          return funGetTransactionInstallments(BASE_URL, payload, callback);
          break;
        case "GET_NON_PAYERS_LISTING":
          return funGetNonPayersListing(BASE_URL, payload, callback);
          break;
        case "GET_REVENUE_PER_PAYER":
          return funGetRevenuePerPayer(BASE_URL, payload, callback);
          break;
        case "GET_TRANSACTION_STATS":
          return funGetTransactionStats(BASE_URL, payload, callback);
          break;
        case "GET_PROJECT_TRANSACTION_STATS":
          return funGetProjectTransactionStats(BASE_URL, payload, callback);
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
        case "ATTACH_PAYER_MERCHANT":
          return funAttachPayerWithMerchant(BASE_URL, payload, callback);
          break;
        case "GET_MERCHANTS_OF_PAYER":
          return funGetMerchantsForPayer(BASE_URL, payload, callback);
          break;
        case "MAKE_REFUND":
          return funMakeRefund(BASE_URL, payload, callback);
          break;
        case "VERIFY_CARD":
          return funVerifyCardOE(BASE_URL, payload, callback);
          break;
        case "GET_ORDER_DETAILS":
          return funGetOrderDetails(BASE_URL, payload, callback);
          break;
        case "PAY_WITH_SAVED_CARD":
          return funPayWithSavedCard(BASE_URL, payload, callback);
          break;
        case "ADD_INSTALLMENT":
          return funAddInstallment(BASE_URL, payload, callback);
          break;
        case "EDIT_INSTALLMENT":
          return funEditInstallment(BASE_URL, payload, callback);
          break;
        case "EDIT_MULTIPLE_INSTALLMENTS":
          return funEditMultipleInstallment(BASE_URL, payload, callback);
          break;
        case "REMOVE_INSTALLMENT":
          return funRemoveInstallment(BASE_URL, payload, callback);
          break;
        case "ENABLE_INSTALLMENTS":
          return funEnableInstallments(BASE_URL, payload, callback);
          break;
        case "DISABLE_INSTALLMENTS":
          return funDisableInstallments(BASE_URL, payload, callback);
          break;
        case "PROCESS_INSTALLMENT_PAYMENT":
          return funProcessInstallmentPayment(BASE_URL, payload, callback);
          break;
        case "INSTALLMENT_ACH_PAYMENT":
          return funInstallmentACHPayment(BASE_URL, payload, callback);
          break;
        case "UPDATE_TRANSACTION_STATUS":
          return funUpdateTransactionStatus(BASE_URL, payload, callback);
          break;
        case "UPDATE_TRANSACTION_OPENDENTAL_STATUS":
          return funUpdateTransactionOpenDentalStatus(BASE_URL, payload, callback);
          break;
        case "GET_REVENUE_GRAPH":
          return funGetRevenueGraph(BASE_URL, payload, callback);
          break;
        case "GET_TRANSACTION_GRAPH":
          return funGetTransactionGraph(BASE_URL, payload, callback);
          break;
        case "GET_PROJECT_PAYERS_LISTING":
          return funGetProjectPayersListing(BASE_URL, payload, callback);
          break;
        case "ACH_PAYMENT":
          return funMakeACHPayment(BASE_URL, payload, callback);
          break;
        case "CREATE_ORDER":
          return funCreateOrder(BASE_URL, payload, callback);
          break;
        case "GET_ORDER_PROFILE":
          return funGetOrderProfile(BASE_URL, payload, callback);
          break;
        case "CREATE_TRANSFER":
          return funCreateTransfer(BASE_URL, payload, callback);
          break;
        case "SEARCH_TRANSACTION_FILTER":
          return funSearchTransactionsByFilter(BASE_URL, payload, callback);
        case "ADD_SITE":
          return funAddBusinessSite(BASE_URL, payload, callback);
          break;
        case "EDIT_SITE":
          return funEditBusinessSite(BASE_URL, payload, callback);
          break;
        case "DELETE_SITE":
          return funDeleteBusinessSite(BASE_URL, payload, callback);
          break;
        case "LIST_SITES":
          return funListBusinessSites(BASE_URL, payload, callback);
          break;
        case "LIST_SITE_CREDENTIALS":
          return funListSiteCredentials(BASE_URL, payload, callback);
          break;
        case "SET_SITE_DEFAULT_CREDENTIALS":
          return funSetDefaultCredentials(BASE_URL, payload, callback);
          break;
        case "GET_SITE_DEFAULT_CREDENTIALS":
          return funGetDefaultCredentials(BASE_URL, payload, callback);
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
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funGetAllMerchants = function funGetAllMerchants(BASE_URL, payload, callback) {

  var url = BASE_URL + 'ezpayMerchants/getAllActiveMerchants';
  rpRequest("GET", url, "").then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
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
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funGetMerchantId = function funGetMerchantId(BASE_URL, payload, callback) {
  var userId = payload["meta"]["userId"];
  if (isNull(userId)) {
    return callback(new HttpErrors.BadRequest('user Id is mandatory.', { expose: false }));
  }
  var url = BASE_URL + 'ezpayMerchants/getMerchantFromUserId?userId=' + userId;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funMerchantProfile = function funMerchantProfile(BASE_URL, payload, callback) {
  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  var url = BASE_URL + 'ezpayMerchants/getMerchantProfile?merchantId=' + merchantId;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funUpdateMerchantProfile = function funUpdateMerchantProfile(BASE_URL, payload, callback) {
  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  var url = BASE_URL + 'ezpayMerchants/updateMerchantProfile?merchantId=' + merchantId;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funDeactivateAccount = function funDeactivateAccount(BASE_URL, payload, callback) {
  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  var url = BASE_URL + 'ezpayMerchants/deactivateMerchant?merchantId=' + merchantId;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funCreatePayer = function funCreatePayer(BASE_URL, payload, callback) {
  var merchantId = "";

  if (!isNull(payload["meta"]["merchantId"])) {
    merchantId = payload["meta"]["merchantId"];
  }

  var url = BASE_URL + 'ezpayPayees/addPayee?merchantId=' + merchantId;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funEditPayer = function funEditPayer(BASE_URL, payload, callback) {
  var payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }
  var url = BASE_URL + 'ezpayPayees/editPayee?payerId=' + payerId;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funRemovePayer = function funRemovePayer(BASE_URL, payload, callback) {
  var payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }
  var url = BASE_URL + 'ezpayPayees/removePayees?payerIds=' + payerId;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funImportPayers = function funImportPayers(BASE_URL, payload, callback) {
  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  var url = BASE_URL + 'ezpayPayees/importPayees?merchantId=' + merchantId;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funGetPayersListing = function funGetPayersListing(BASE_URL, payload, callback) {
  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  var url = BASE_URL + 'ezpayMerchants/getPayeesListing?merchantId=' + merchantId;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funGetPayerProfile = function funGetPayerProfile(BASE_URL, payload, callback) {
  var payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }
  var url = BASE_URL + 'ezpayPayees/getPayerProfile?payerId=' + payerId;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
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

  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funUpdateTransaction = function funUpdateTransaction(BASE_URL, payload, callback) {
  var transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transaction Id is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/updateTransaction?transactionId=' + transactionId;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funSaveCard = function funSaveCard(BASE_URL, payload, callback) {

  var payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayPayees/addCardForPayee?payerId=' + payerId;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
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
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funSavedCardsListing = function funSavedCardsListing(BASE_URL, payload, callback) {

  var payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayPayees/getSavedCards?payerId=' + payerId;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
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
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funSearchTransactionsByFilter = function funSearchTransactionsByFilter(BASE_URL, payload, callback) {
  var _payload$meta = payload.meta,
      pageNo = _payload$meta.pageNo,
      merchantId = _payload$meta.merchantId,
      payerId = _payload$meta.payerId,
      startDate = _payload$meta.startDate,
      endDate = _payload$meta.endDate,
      orderId = _payload$meta.orderId,
      invoiceId = _payload$meta.invoiceId,
      transactionType = _payload$meta.transactionType;

  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  if (isNull(pageNo)) {
    pageNo = 0;
  }
  var url = BASE_URL + 'ezpayPaymentTransactions/getTransactionByFilter?pageNo=' + pageNo + '&merchantId=' + merchantId + '&payerId=' + payerId + '&startDate=' + startDate + '&endDate=' + endDate + '&orderId=' + orderId + '&transactionType=' + transactionType + '&invoiceId=' + invoiceId;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
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

  var hostBaseURL = payload["meta"]["hostBaseURL"];
  if (isNull(hostBaseURL)) {
    return callback(new HttpErrors.BadRequest('hostBaseURL Id is mandatory.', { expose: false }));
  }

  var cardId = "";
  if (!isNull(payload["meta"]["cardId"])) {
    cardId = payload["meta"]["cardId"];
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/processPayment?payerId=' + payerId + '&transactionId=' + transactionId + '&cardId=' + cardId + '&hostBaseURL=' + hostBaseURL;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funProcessMachinePayment = function funProcessMachinePayment(BASE_URL, payload, callback) {

  var payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  var transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transaction Id is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/paymentWithMachine?payerId=' + payerId + '&transactionId=' + transactionId;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funProcessDirectPayment = function funProcessDirectPayment(BASE_URL, payload, callback) {

  var payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  var transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transaction Id is mandatory.', { expose: false }));
  }

  var hostBaseURL = payload["meta"]["hostBaseURL"];
  if (isNull(hostBaseURL)) {
    return callback(new HttpErrors.BadRequest('hostBaseURL Id is mandatory.', { expose: false }));
  }

  var cardId = "";
  if (!isNull(payload["meta"]["cardId"])) {
    cardId = payload["meta"]["cardId"];
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/processDirectPayment?payerId=' + payerId + '&transactionId=' + transactionId + '&cardId=' + cardId + '&hostBaseURL=' + hostBaseURL;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funDirectPayment = function funDirectPayment(BASE_URL, payload, callback) {
  payload["BASE_URL"] = BASE_URL;
  console.log("payload==>" + JSON.stringify(payload));
  var url = BASE_URL + 'ezpayPaymentTransactions/directPayment';
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funGetTransactionDetails = function funGetTransactionDetails(BASE_URL, payload, callback) {

  var transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transaction Id is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/getTransactionDetails?transactionId=' + transactionId;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funGetTransactionInstallments = function funGetTransactionInstallments(BASE_URL, payload, callback) {

  var transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transaction Id is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/getTransactionInstallments?transactionId=' + transactionId;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funGetProjectTransactionStats = function funGetProjectTransactionStats(BASE_URL, payload, callback) {

  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }

  var projectId = payload["meta"]["projectId"];
  if (isNull(projectId)) {
    return callback(new HttpErrors.BadRequest('project Id is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/getProjectTransactionStats?merchantId=' + merchantId + '&projectId=' + projectId;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funGetTransactionStats = function funGetTransactionStats(BASE_URL, payload, callback) {
  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/getTransactionStats?merchantId=' + merchantId;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funGetPayerTransactionStats = function funGetPayerTransactionStats(BASE_URL, payload, callback) {
  var _payload$meta2 = payload.meta,
      startDate = _payload$meta2.startDate,
      endDate = _payload$meta2.endDate,
      orderId = _payload$meta2.orderId,
      invoiceId = _payload$meta2.invoiceId,
      transactionType = _payload$meta2.transactionType;


  var payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  var merchantId = "";
  if (typeof payload["meta"]["merchantId"] !== "undefined" && _typeof(payload["meta"]["merchantId"]) !== undefined) {
    merchantId = payload["meta"]["merchantId"];
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/getPayerTransactionStats?payerId=' + payerId + '&merchantId=' + merchantId + '&startDate=' + startDate + '&endDate=' + endDate + '&orderId=' + orderId + '&transactionType=' + transactionType + '&invoiceId=' + invoiceId;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funGetNonPayersListing = function funGetNonPayersListing(BASE_URL, payload, callback) {

  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/getNonPayersListing?merchantId=' + merchantId;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funGetRevenuePerPayer = function funGetRevenuePerPayer(BASE_URL, payload, callback) {

  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/getRevenuePerPayer?merchantId=' + merchantId;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
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

  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funAttachPayerWithMerchant = function funAttachPayerWithMerchant(BASE_URL, payload, callback) {

  var url = BASE_URL + 'ezpayMerchants/attachPayerWithMerchants';
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funGetMerchantsForPayer = function funGetMerchantsForPayer(BASE_URL, payload, callback) {

  var payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayMerchants/getMerchantListingForPayer?payerId=' + payerId;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funMakeRefund = function funMakeRefund(BASE_URL, payload, callback) {

  var url = BASE_URL + 'ezpayPaymentTransactions/makeRefund';
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funVerifyCardOE = function funVerifyCardOE(BASE_URL, payload, callback) {

  var payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/verifyCreditCardOE';
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funGetOrderDetails = function funGetOrderDetails(BASE_URL, payload, callback) {

  var url = BASE_URL + 'ezpayPaymentTransactions/getOrderDetails';
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funPayWithSavedCard = function funPayWithSavedCard(BASE_URL, payload, callback) {

  var payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    //return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }

  var cardId = payload["meta"]["cardId"];
  if (isNull(cardId)) {
    return callback(new HttpErrors.BadRequest('card Id is mandatory.', { expose: false }));
  }

  var amount = payload["meta"]["amount"];
  if (isNull(amount)) {
    //return callback(new HttpErrors.BadRequest('amount is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/paymentWithSavedCard';
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funAddInstallment = function funAddInstallment(BASE_URL, payload, callback) {

  var transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transaction Id is mandatory.', { expose: false }));
  }

  var amount = payload["meta"]["amount"];
  if (isNull(amount)) {
    return callback(new HttpErrors.BadRequest('amount is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'PaymentInstallments/addNewInstallment';
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funEditInstallment = function funEditInstallment(BASE_URL, payload, callback) {

  var installmentId = payload["meta"]["installmentId"];
  if (isNull(installmentId)) {
    return callback(new HttpErrors.BadRequest('installment Id is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'PaymentInstallments/editInstallment';
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funEnableInstallments = function funEnableInstallments(BASE_URL, payload, callback) {

  var transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transactionId is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'PaymentInstallments/enableInstallments';
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funDisableInstallments = function funDisableInstallments(BASE_URL, payload, callback) {

  var transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transactionId is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'PaymentInstallments/disbleInstallments';
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funEditMultipleInstallment = function funEditMultipleInstallment(BASE_URL, payload, callback) {

  var transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transactionId is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'PaymentInstallments/editMultipleInstallments';
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funRemoveInstallment = function funRemoveInstallment(BASE_URL, payload, callback) {

  var installmentId = payload["meta"]["installmentId"];
  if (isNull(installmentId)) {
    return callback(new HttpErrors.BadRequest('installment Id is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'PaymentInstallments/removeInstallment';
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funProcessInstallmentPayment = function funProcessInstallmentPayment(BASE_URL, payload, callback) {

  var payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  var transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transaction Id is mandatory.', { expose: false }));
  }

  var installmentId = payload["meta"]["installmentId"];
  if (isNull(installmentId)) {
    return callback(new HttpErrors.BadRequest('installment Id is mandatory.', { expose: false }));
  }

  var hostBaseURL = payload["meta"]["hostBaseURL"];
  if (isNull(hostBaseURL)) {
    return callback(new HttpErrors.BadRequest('hostBaseURL Id is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/processInstallmentPayment?payerId=' + payerId + '&transactionId=' + transactionId + '&installmentId=' + installmentId + '&hostBaseURL=' + hostBaseURL;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funInstallmentACHPayment = function funInstallmentACHPayment(BASE_URL, payload, callback) {
  var url = BASE_URL + 'ezpayPaymentTransactions/installmentACHPayment';
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funUpdateTransactionStatus = function funUpdateTransactionStatus(BASE_URL, payload, callback) {

  var transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transactionId is mandatory.', { expose: false }));
  }

  var transactionStatus = payload["meta"]["transactionStatus"];
  if (isNull(transactionStatus)) {
    return callback(new HttpErrors.BadRequest('transactionStatus is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/setTransactionStatusManually?transactionId=' + transactionId + '&transactionStatus=' + transactionStatus;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funUpdateTransactionOpenDentalStatus = function funUpdateTransactionOpenDentalStatus(BASE_URL, payload, callback) {

  var transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transactionId is mandatory.', { expose: false }));
  }

  var processStatus = payload["meta"]["processStatus"];
  if (isNull(processStatus)) {
    return callback(new HttpErrors.BadRequest('processStatus is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/setOpenDentalStatus?transactionId=' + transactionId + '&processStatus=' + processStatus;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funGetRevenueGraph = function funGetRevenueGraph(BASE_URL, payload, callback) {

  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchantId is mandatory.', { expose: false }));
  }

  var year = "";
  if (!isNull(payload["meta"]["year"])) {
    year = payload["meta"]["year"];
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/getRevenueGraphData?merchantId=' + merchantId + '&year=' + year;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funGetTransactionGraph = function funGetTransactionGraph(BASE_URL, payload, callback) {

  var merchantId = payload["meta"]["merchantId"];
  var url = '';
  var year = '';
  if (isNull(merchantId)) {
    url = BASE_URL + 'ezpayPaymentTransactions/getTransactionGraphData?year=' + year;
  } else {
    url = BASE_URL + 'ezpayPaymentTransactions/getTransactionGraphData?merchantId=' + merchantId + '&year=' + year;
  }
  if (!isNull(payload["meta"]["year"])) {
    year = payload["meta"]["year"];
  }
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funMakeACHPayment = function funMakeACHPayment(BASE_URL, payload, callback) {
  var url = BASE_URL + 'ezpayPaymentTransactions/processACHPayment';
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funCreateOrder = function funCreateOrder(BASE_URL, payload, callback) {
  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  var payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }
  var url = '' + BASE_URL + _constant2.default.PAYMENT_URL.CREATE_ORDER + '?merchantId=' + merchantId;
  console.log("createOrsder", url);
  console.log("payload", payload);
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funGetOrderProfile = function funGetOrderProfile(BASE_URL, payload, callback) {
  var orderId = "";
  if (!isNull(payload["meta"])) {
    if (!isNull(payload["meta"]["orderId"])) {
      orderId = payload["meta"]["orderId"];
    }
  }

  var url = '' + BASE_URL + _constant2.default.PAYMENT_URL.GET_ORDER_PROFILE;
  url = url + "?orderId=" + orderId;

  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funCreateTransfer = function funCreateTransfer(BASE_URL, payload, callback) {
  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchantId is mandatory.', { expose: false }));
  }

  var url = '' + BASE_URL + _constant2.default.PAYMENT_URL.CREATE_FUND_TRANSFER + '?merchantId=' + merchantId;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};
var funGetProjectPayersListing = function funGetProjectPayersListing(BASE_URL, payload, callback) {

  var merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchantId is mandatory.', { expose: false }));
  }

  var projectId = payload["meta"]["projectId"];
  if (isNull(projectId)) {
    return callback(new HttpErrors.BadRequest('projectId is mandatory.', { expose: false }));
  }

  var pageNo = "";
  if (!isNull(payload["meta"]["pageNo"])) {
    pageNo = payload["meta"]["pageNo"];
  }

  var url = BASE_URL + 'ezpayPaymentTransactions/getPayersListOfProject?merchantId=' + merchantId + '&projectId=' + projectId + '&pageNo=' + pageNo;
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funAddBusinessSite = function funAddBusinessSite(BASE_URL, payload, callback) {

  var businessId = payload["meta"]["businessId"];
  if (isNull(businessId)) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  var locationId = payload["meta"]["locationId"];
  if (isNull(locationId)) {
    return callback(new HttpErrors.BadRequest('locationId is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpaySites/addSite';
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funEditBusinessSite = function funEditBusinessSite(BASE_URL, payload, callback) {

  var siteId = payload["meta"]["siteId"];
  if (isNull(siteId)) {
    return callback(new HttpErrors.BadRequest('siteId is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpaySites/editSite';
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funDeleteBusinessSite = function funDeleteBusinessSite(BASE_URL, payload, callback) {

  var siteId = payload["meta"]["siteId"];
  if (isNull(siteId)) {
    return callback(new HttpErrors.BadRequest('siteId is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpaySites/deleteSite';
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funListBusinessSites = function funListBusinessSites(BASE_URL, payload, callback) {

  var businessId = payload["meta"]["businessId"];
  if (isNull(businessId)) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpaySites/listSites';
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funListSiteCredentials = function funListSiteCredentials(BASE_URL, payload, callback) {

  var businessId = payload["meta"]["businessId"];
  if (isNull(businessId)) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  var locationId = payload["meta"]["locationId"];
  if (isNull(locationId)) {
    return callback(new HttpErrors.BadRequest('locationId is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpaySites/listSiteCredentials';
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funSetDefaultCredentials = function funSetDefaultCredentials(BASE_URL, payload, callback) {

  var businessId = payload["meta"]["businessId"];
  if (isNull(businessId)) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }
  var locationId = payload["meta"]["locationId"];
  if (isNull(locationId)) {
    return callback(new HttpErrors.BadRequest('locationId is mandatory.', { expose: false }));
  }
  var siteId = payload["meta"]["siteId"];
  if (isNull(siteId)) {
    return callback(new HttpErrors.BadRequest('siteId is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpaySites/setDefault';
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funGetDefaultCredentials = function funGetDefaultCredentials(BASE_URL, payload, callback) {

  var businessId = payload["meta"]["businessId"];
  if (isNull(businessId)) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }
  var locationId = payload["meta"]["locationId"];
  if (isNull(locationId)) {
    return callback(new HttpErrors.BadRequest('locationId is mandatory.', { expose: false }));
  }
  var siteId = payload["meta"]["siteId"];
  if (isNull(siteId)) {
    return callback(new HttpErrors.BadRequest('siteId is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpaySites/siteDefaultCredential';
  rpRequest("POST", url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

module.exports = paymentServices;