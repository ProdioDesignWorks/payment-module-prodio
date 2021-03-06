/** 
 * By Shashikant Sharma 
 * 
 * This code will take the user action and based on the user action and payload it will call the respective payment service.
 *  
 */
// eslint-disable-next-line import/prefer-default-export
const axios = require('axios');
const { parse, stringify } = require('flatted/cjs');
//const BASE_URL = `https://5m4hb8aet1.execute-api.us-west-2.amazonaws.com/prod/`;
const HttpErrors = require('http-errors');
var rp = require('request-promise');

let paymentModuleClient = null;

import constant from './config/constant';
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

const rpRequest = function (requestType,_url,payload) {
  var options = {
      method: requestType,
      uri: _url,
      json: true // Automatically stringifies the body to JSON
  };

  if(requestType === "POST"){
    options["body"] = payload;
  }

  return new Promise((resolve,reject)=>{
      rp(options).then(response => {
        return resolve(response);
      }).catch((error) => {
        let json = stringify(error);
        return reject(json);
      });
  }) 
}

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
          let errorMessage = `Please add BaseUrl.`;
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
const funCreateMerchant = function (BASE_URL, payload, callback) {
  let userId = payload["meta"]["userId"];
  if (isNull(userId)) {
    return callback(new HttpErrors.BadRequest('User Id is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpayMerchants/createMerchant?userId=${userId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

const funGetAllMerchants = function (BASE_URL, payload, callback) {

  let url = `${BASE_URL}ezpayMerchants/getAllActiveMerchants`;
  rpRequest("GET",url,"").then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

/**
* This function will get merchant account activation status.
* @param payload - the required payload JSON to perform the operations.
* @param callback - to send the response back to the requester.
*/

const funMerchantActionvationStatus = function (BASE_URL, payload, callback) {
  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  let url = `${BASE_URL}ezpayMerchants/getMerchantActivationStatus?merchantId=${merchantId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}


const funGetMerchantId = function (BASE_URL, payload, callback) {
  let userId = payload["meta"]["userId"];
  if (isNull(userId)) {
    return callback(new HttpErrors.BadRequest('user Id is mandatory.', { expose: false }));
  }
  let url = `${BASE_URL}ezpayMerchants/getMerchantFromUserId?userId=${userId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

const funMerchantProfile = function (BASE_URL, payload, callback) {
  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  let url = `${BASE_URL}ezpayMerchants/getMerchantProfile?merchantId=${merchantId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}


const funUpdateMerchantProfile = function (BASE_URL, payload, callback) {
  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  let url = `${BASE_URL}ezpayMerchants/updateMerchantProfile?merchantId=${merchantId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

const funDeactivateAccount = function (BASE_URL, payload, callback) {
  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  let url = `${BASE_URL}ezpayMerchants/deactivateMerchant?merchantId=${merchantId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}


const funCreatePayer = function (BASE_URL, payload, callback) {
  let merchantId = "";

  if (!isNull(payload["meta"]["merchantId"])) {
    merchantId = payload["meta"]["merchantId"];
  }

  let url = `${BASE_URL}ezpayPayees/addPayee?merchantId=${merchantId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}

const funEditPayer = function (BASE_URL, payload, callback) {
  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }
  let url = `${BASE_URL}ezpayPayees/editPayee?payerId=${payerId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}

const funRemovePayer = function (BASE_URL, payload, callback) {
  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }
  let url = `${BASE_URL}ezpayPayees/removePayees?payerIds=${payerId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}


const funImportPayers = function (BASE_URL, payload, callback) {
  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  let url = `${BASE_URL}ezpayPayees/importPayees?merchantId=${merchantId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}


const funGetPayersListing = function (BASE_URL, payload, callback) {
  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  let url = `${BASE_URL}ezpayMerchants/getPayeesListing?merchantId=${merchantId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}


const funGetPayerProfile = function (BASE_URL, payload, callback) {
  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }
  let url = `${BASE_URL}ezpayPayees/getPayerProfile?payerId=${payerId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}


const funCreateTransaction = function (BASE_URL, payload, callback) {
  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }



  let url = `${BASE_URL}ezpayPaymentTransactions/requestPayment?merchantId=${merchantId}&payerId=${payerId}`;
  
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

const funUpdateTransaction = function (BASE_URL, payload, callback) {
  let transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transaction Id is mandatory.', { expose: false }));
  }
  
  let url = `${BASE_URL}ezpayPaymentTransactions/updateTransaction?transactionId=${transactionId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

const funSaveCard = function (BASE_URL, payload, callback) {

  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpayPayees/addCardForPayee?payerId=${payerId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

const funRemoveCard = function (BASE_URL, payload, callback) {

  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  let cardId = payload["meta"]["cardId"];
  if (isNull(cardId)) {
    return callback(new HttpErrors.BadRequest('card Id is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpayPayees/removeCard?payerId=${payerId}&cardId=${cardId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}

const funSavedCardsListing = function (BASE_URL, payload, callback) {

  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpayPayees/getSavedCards?payerId=${payerId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

const funGetTransactionsListing = function (BASE_URL, payload, callback) {

  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  let pageNo = 0;
  if (!isNull(payload["meta"]["pageNo"])) {
    pageNo = payload["meta"]["pageNo"];
  }

  let url = `${BASE_URL}ezpayPaymentTransactions/getTransactionsListing?merchantId=${merchantId}&pageNo=${pageNo}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}

const funSearchTransactionsByFilter = function (BASE_URL,payload,callback){
  let {
    pageNo,
    merchantId,
    payerId,
    startDate,
    endDate,
    orderId,
    invoiceId,
    transactionType
  } = payload.meta;
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  if(isNull(pageNo)){
       pageNo = 0;
  }
  let url = `${BASE_URL}ezpayPaymentTransactions/getTransactionByFilter?pageNo=${pageNo}&merchantId=${merchantId}&payerId=${payerId}&startDate=${startDate}&endDate=${endDate}&orderId=${orderId}&transactionType=${transactionType}&invoiceId=${invoiceId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}

const funProcessPayment = function (BASE_URL, payload, callback) {

  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  let transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transaction Id is mandatory.', { expose: false }));
  }

  let hostBaseURL = payload["meta"]["hostBaseURL"];
  if (isNull(hostBaseURL)) {
    return callback(new HttpErrors.BadRequest('hostBaseURL Id is mandatory.', { expose: false }));
  }

  let cardId = "";
  if (!isNull(payload["meta"]["cardId"])) {
    cardId = payload["meta"]["cardId"];
  }

  let url = `${BASE_URL}ezpayPaymentTransactions/processPayment?payerId=${payerId}&transactionId=${transactionId}&cardId=${cardId}&hostBaseURL=${hostBaseURL}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}

const funProcessMachinePayment = function (BASE_URL, payload, callback) {

  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  let transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transaction Id is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpayPaymentTransactions/paymentWithMachine?payerId=${payerId}&transactionId=${transactionId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

const funProcessDirectPayment = function (BASE_URL, payload, callback) {

  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  let transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transaction Id is mandatory.', { expose: false }));
  }

  let hostBaseURL = payload["meta"]["hostBaseURL"];
  if (isNull(hostBaseURL)) {
    return callback(new HttpErrors.BadRequest('hostBaseURL Id is mandatory.', { expose: false }));
  }

  let cardId = "";
  if (!isNull(payload["meta"]["cardId"])) {
    cardId = payload["meta"]["cardId"];
  }

  let url = `${BASE_URL}ezpayPaymentTransactions/processDirectPayment?payerId=${payerId}&transactionId=${transactionId}&cardId=${cardId}&hostBaseURL=${hostBaseURL}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}



const funDirectPayment = function (BASE_URL, payload, callback) {
  payload["BASE_URL"] = BASE_URL;
  console.log("payload==>" + JSON.stringify(payload));
  let url = `${BASE_URL}ezpayPaymentTransactions/directPayment`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}


const funGetTransactionDetails = function (BASE_URL, payload, callback) {

  let transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transaction Id is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpayPaymentTransactions/getTransactionDetails?transactionId=${transactionId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}


const funGetTransactionInstallments = function (BASE_URL, payload, callback) {

  let transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transaction Id is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpayPaymentTransactions/getTransactionInstallments?transactionId=${transactionId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}

const funGetProjectTransactionStats = function (BASE_URL, payload, callback) {

  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }

  let projectId = payload["meta"]["projectId"];
  if (isNull(projectId)) {
    return callback(new HttpErrors.BadRequest('project Id is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpayPaymentTransactions/getProjectTransactionStats?merchantId=${merchantId}&projectId=${projectId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

const funGetTransactionStats = function (BASE_URL, payload, callback) {
  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpayPaymentTransactions/getTransactionStats?merchantId=${merchantId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

const funGetPayerTransactionStats = function (BASE_URL, payload, callback) {
  let {
    startDate,
    endDate,
    orderId,
    invoiceId,
    transactionType
  } = payload.meta;

  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  let merchantId = "";
  if (typeof payload["meta"]["merchantId"] !== "undefined" && typeof payload["meta"]["merchantId"] !== undefined) {
    merchantId = payload["meta"]["merchantId"];
  }

  let url = `${BASE_URL}ezpayPaymentTransactions/getPayerTransactionStats?payerId=${payerId}&merchantId=${merchantId}&startDate=${startDate}&endDate=${endDate}&orderId=${orderId}&transactionType=${transactionType}&invoiceId=${invoiceId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}

const funGetNonPayersListing = function (BASE_URL, payload, callback) {

  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpayPaymentTransactions/getNonPayersListing?merchantId=${merchantId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

const funGetRevenuePerPayer = function (BASE_URL, payload, callback) {

  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpayPaymentTransactions/getRevenuePerPayer?merchantId=${merchantId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}


const funGetPayersTransactions = function (BASE_URL, payload, callback) {

  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }
  let pageNo = 0;
  if (!isNull(payload["meta"]["pageNo"])) {
    pageNo = payload["meta"]["pageNo"];
  }

  let url = `${BASE_URL}ezpayPaymentTransactions/getPayersTransactions?payerId=${payerId}&pageNo=${pageNo}`;
 
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

const funAttachPayerWithMerchant = function (BASE_URL, payload, callback) {

  let url = `${BASE_URL}ezpayMerchants/attachPayerWithMerchants`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

const funGetMerchantsForPayer = function (BASE_URL, payload, callback) {

  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpayMerchants/getMerchantListingForPayer?payerId=${payerId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}



const funMakeRefund = function (BASE_URL, payload, callback) {

  let url = `${BASE_URL}ezpayPaymentTransactions/makeRefund`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

const funVerifyCardOE = function (BASE_URL, payload, callback) {

  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpayPaymentTransactions/verifyCreditCardOE`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

const funGetOrderDetails = function (BASE_URL, payload, callback) {


  let url = `${BASE_URL}ezpayPaymentTransactions/getOrderDetails`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}


const funPayWithSavedCard = function (BASE_URL, payload, callback) {

  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    //return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }

  let cardId = payload["meta"]["cardId"];
  if (isNull(cardId)) {
    return callback(new HttpErrors.BadRequest('card Id is mandatory.', { expose: false }));
  }

  let amount = payload["meta"]["amount"];
  if (isNull(amount)) {
    //return callback(new HttpErrors.BadRequest('amount is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpayPaymentTransactions/paymentWithSavedCard`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}


const funAddInstallment = function (BASE_URL, payload, callback) {

  let transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transaction Id is mandatory.', { expose: false }));
  }

  let amount = payload["meta"]["amount"];
  if (isNull(amount)) {
    return callback(new HttpErrors.BadRequest('amount is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}PaymentInstallments/addNewInstallment`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

const funEditInstallment = function (BASE_URL, payload, callback) {

  let installmentId = payload["meta"]["installmentId"];
  if (isNull(installmentId)) {
    return callback(new HttpErrors.BadRequest('installment Id is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}PaymentInstallments/editInstallment`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}


const funEnableInstallments = function (BASE_URL, payload, callback) {

  let transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transactionId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}PaymentInstallments/enableInstallments`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}


const funDisableInstallments = function (BASE_URL, payload, callback) {

  let transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transactionId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}PaymentInstallments/disbleInstallments`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}

const funEditMultipleInstallment = function (BASE_URL, payload, callback) {

  let transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transactionId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}PaymentInstallments/editMultipleInstallments`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}



const funRemoveInstallment = function (BASE_URL, payload, callback) {

  let installmentId = payload["meta"]["installmentId"];
  if (isNull(installmentId)) {
    return callback(new HttpErrors.BadRequest('installment Id is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}PaymentInstallments/removeInstallment`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}

const funProcessInstallmentPayment = function (BASE_URL, payload, callback) {

  let payerId = payload["meta"]["payerId"];
  if (isNull(payerId)) {
    return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
  }

  let transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transaction Id is mandatory.', { expose: false }));
  }

  let installmentId = payload["meta"]["installmentId"];
  if (isNull(installmentId)) {
    return callback(new HttpErrors.BadRequest('installment Id is mandatory.', { expose: false }));
  }

  let hostBaseURL = payload["meta"]["hostBaseURL"];
  if (isNull(hostBaseURL)) {
    return callback(new HttpErrors.BadRequest('hostBaseURL Id is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpayPaymentTransactions/processInstallmentPayment?payerId=${payerId}&transactionId=${transactionId}&installmentId=${installmentId}&hostBaseURL=${hostBaseURL}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}

const funInstallmentACHPayment = function (BASE_URL, payload, callback) {
  let url = `${BASE_URL}ezpayPaymentTransactions/installmentACHPayment`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
};

const funUpdateTransactionStatus = function (BASE_URL, payload, callback) {

  let transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transactionId is mandatory.', { expose: false }));
  }

  let transactionStatus = payload["meta"]["transactionStatus"];
  if (isNull(transactionStatus)) {
    return callback(new HttpErrors.BadRequest('transactionStatus is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpayPaymentTransactions/setTransactionStatusManually?transactionId=${transactionId}&transactionStatus=${transactionStatus}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}

const funUpdateTransactionOpenDentalStatus = function (BASE_URL, payload, callback) {

  let transactionId = payload["meta"]["transactionId"];
  if (isNull(transactionId)) {
    return callback(new HttpErrors.BadRequest('transactionId is mandatory.', { expose: false }));
  }

  let processStatus = payload["meta"]["processStatus"];
  if (isNull(processStatus)) {
    return callback(new HttpErrors.BadRequest('processStatus is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpayPaymentTransactions/setOpenDentalStatus?transactionId=${transactionId}&processStatus=${processStatus}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}


const funGetRevenueGraph = function (BASE_URL, payload, callback) {

  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchantId is mandatory.', { expose: false }));
  }

  let year = "";
  if (!isNull(payload["meta"]["year"])) {
    year = payload["meta"]["year"];
  }

  let url = `${BASE_URL}ezpayPaymentTransactions/getRevenueGraphData?merchantId=${merchantId}&year=${year}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}


const funGetTransactionGraph = function (BASE_URL, payload, callback) {

  let merchantId = payload["meta"]["merchantId"];
  let url = '';
  let year = '';
  if (isNull(merchantId)) {
     url = `${BASE_URL}ezpayPaymentTransactions/getTransactionGraphData?year=${year}`;
  }
  else {
    url = `${BASE_URL}ezpayPaymentTransactions/getTransactionGraphData?merchantId=${merchantId}&year=${year}`;
  }
  if (!isNull(payload["meta"]["year"])) {
    year = payload["meta"]["year"];
  }
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}


const funMakeACHPayment = function (BASE_URL, payload, callback) {
  let url = `${BASE_URL}ezpayPaymentTransactions/processACHPayment`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

};

const funCreateOrder = (BASE_URL, payload, callback) => {
    let merchantId = payload["meta"]["merchantId"];
    if (isNull(merchantId)) {
      return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
    }
    let payerId = payload["meta"]["payerId"];
    if (isNull(payerId)) {
      return callback(new HttpErrors.BadRequest('payer Id is mandatory.', { expose: false }));
    }
  let url = `${BASE_URL}${constant.PAYMENT_URL.CREATE_ORDER}?merchantId=${merchantId}`;
  console.log("createOrsder",url);
  console.log("payload",payload);
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}

const funGetOrderProfile = (BASE_URL, payload, callback) => {
  let orderId = "";
  if (!isNull(payload["meta"])) {
    if (!isNull(payload["meta"]["orderId"])) {
      orderId = payload["meta"]["orderId"];
    }
  }

  let url = `${BASE_URL}${constant.PAYMENT_URL.GET_ORDER_PROFILE}`;
  url = url+"?orderId="+orderId;

  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}

const funCreateTransfer = (BASE_URL,payload,callback)=>{
  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchantId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}${constant.PAYMENT_URL.CREATE_FUND_TRANSFER}?merchantId=${merchantId}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}
const funGetProjectPayersListing = function (BASE_URL, payload, callback) {

  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchantId is mandatory.', { expose: false }));
  }

  let projectId = payload["meta"]["projectId"];
  if (isNull(projectId)) {
    return callback(new HttpErrors.BadRequest('projectId is mandatory.', { expose: false }));
  }

  let pageNo = "";
  if (!isNull(payload["meta"]["pageNo"])) {
    pageNo = payload["meta"]["pageNo"];
  }

  let url = `${BASE_URL}ezpayPaymentTransactions/getPayersListOfProject?merchantId=${merchantId}&projectId=${projectId}&pageNo=${pageNo}`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}

const funAddBusinessSite = function (BASE_URL, payload, callback) {

  let businessId = payload["meta"]["businessId"];
  if (isNull(businessId)) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  let locationId = payload["meta"]["locationId"];
  if (isNull(locationId)) {
    return callback(new HttpErrors.BadRequest('locationId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpaySites/addSite`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}

const funEditBusinessSite = function (BASE_URL, payload, callback) {

  let siteId = payload["meta"]["siteId"];
  if (isNull(siteId)) {
    return callback(new HttpErrors.BadRequest('siteId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpaySites/editSite`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}

const funDeleteBusinessSite = function (BASE_URL, payload, callback) {

  let siteId = payload["meta"]["siteId"];
  if (isNull(siteId)) {
    return callback(new HttpErrors.BadRequest('siteId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpaySites/deleteSite`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}

const funListBusinessSites = function (BASE_URL, payload, callback) {

  let businessId = payload["meta"]["businessId"];
  if (isNull(businessId)) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpaySites/listSites`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}

const funListSiteCredentials = function (BASE_URL, payload, callback) {

  let businessId = payload["meta"]["businessId"];
  if (isNull(businessId)) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  let locationId = payload["meta"]["locationId"];
  if (isNull(locationId)) {
    return callback(new HttpErrors.BadRequest('locationId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpaySites/listSiteCredentials`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}

const funSetDefaultCredentials = function (BASE_URL, payload, callback) {

  let businessId = payload["meta"]["businessId"];
  if (isNull(businessId)) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }
  let locationId = payload["meta"]["locationId"];
  if (isNull(locationId)) {
    return callback(new HttpErrors.BadRequest('locationId is mandatory.', { expose: false }));
  }
  let siteId = payload["meta"]["siteId"];
  if (isNull(siteId)) {
    return callback(new HttpErrors.BadRequest('siteId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpaySites/setDefault`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });

}

const funGetDefaultCredentials = function (BASE_URL, payload, callback) {

  let businessId = payload["meta"]["businessId"];
  if (isNull(businessId)) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }
  let locationId = payload["meta"]["locationId"];
  if (isNull(locationId)) {
    return callback(new HttpErrors.BadRequest('locationId is mandatory.', { expose: false }));
  }
  let siteId = payload["meta"]["siteId"];
  if (isNull(siteId)) {
    return callback(new HttpErrors.BadRequest('siteId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpaySites/siteDefaultCredential`;
  rpRequest("POST",url,payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

module.exports = paymentServices;
