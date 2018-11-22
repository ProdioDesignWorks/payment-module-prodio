'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//Payment Module
// eslint-disable-next-line import/prefer-default-export
var axios = require('axios');
var CircularJSON = require('circular-json');
//const BASE_URL = `https://5m4hb8aet1.execute-api.us-west-2.amazonaws.com/prod/`;
var BASE_URL = 'http://app.ezpay-dental.com:3010/api/';
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

function paymentServices() {
  this.execute = function (payload, callback) {
    // action key calls api.
    if (payload.action) {
      switch (payload.action) {
        case "CREATE_MERCHANT":
          return funCreateMerchant(payload, callback);
          break;
        case "GET_MERCHANT_ID":
          return funGetMerchantId(payload, callback);
          break;
        case "GET_MERCHANT_STATUS":
          return funMerchantActionvationStatus(payload, callback);
          break;
        case "GET_MERCHANT_PROFILE":
          return funMerchantProfile(payload, callback);
          break;
        case "CREATE_PAYER":
          return funCreatePayer(payload, callback);
          break;
        case "IMPORT_PAYERS":
          return funImportPayers(payload, callback);
          break;
        case "CREATE_TRANSACTION":
          return funCreateTransaction(payload, callback);
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

//creating user in  notification consumer model.
var funCreateMerchant = function funCreateMerchant(payload, callback) {
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

var funMerchantActionvationStatus = function funMerchantActionvationStatus(payload, callback) {
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

var funGetMerchantId = function funGetMerchantId(payload, callback) {
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

var funMerchantProfile = function funMerchantProfile(payload, callback) {
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

var funCreatePayer = function funCreatePayer(payload, callback) {
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

var funImportPayers = function funImportPayers(payload, callback) {
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

var funCreateTransaction = function funCreateTransaction(payload, callback) {
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

module.exports = paymentServices;