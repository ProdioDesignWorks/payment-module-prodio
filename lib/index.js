'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//Payment Module
// eslint-disable-next-line import/prefer-default-export
var axios = require('axios');
var BASE_URL = 'https://5m4hb8aet1.execute-api.us-west-2.amazonaws.com/prod/';
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
        case "GET_MERCHANT_ACTIVATION_STATUS":
          return funMerchantActionvationStatus(payload, callback);
          break;
        case "GET_MERCHANT_PROFILE":
          return funMerchantProfile(payload, callback);
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
  console.log("typeof ==" + (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
  var userId = payload["meta"]["userId"];
  if (isNull(userId)) {
    return callback(new HttpErrors.BadRequest('User Id is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'ezpayMerchants/createMerchant?userId=' + userId;
  axios.post(url, payload).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    console.log("333333", error);
    return callback(new HttpErrors.InternalServerError('Please try again.', { expose: false }));
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
    return callback(new HttpErrors.InternalServerError('Please try again.', { expose: false }));
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
    return callback(new HttpErrors.InternalServerError('Please try again.', { expose: false }));
  });
};

module.exports = paymentServices;