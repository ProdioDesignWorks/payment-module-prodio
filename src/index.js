//Payment Module
// eslint-disable-next-line import/prefer-default-export
const axios = require('axios');
const BASE_URL = `https://5m4hb8aet1.execute-api.us-west-2.amazonaws.com/prod/`;
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

function paymentServices() {
  this.execute = function (payload,callback) {
    // action key calls api.
    if(payload.action){
      switch(payload.action){
        case "CREATE_MERCHANT":
          return funCreateMerchant(payload,callback);
        break;
        case "GET_MERCHANT_ACTIVATION_STATUS":
          return funMerchantActionvationStatus(payload,callback);
        break;
        case "GET_MERCHANT_PROFILE":
          return funMerchantProfile(payload,callback);
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


//creating user in  notification consumer model.
const funCreateMerchant = function (payload,callback) {
  console.log("typeof =="+typeof callback);
  let userId = payload["meta"]["userId"];
  if (isNull(userId)) {
    return callback(new HttpErrors.BadRequest('User Id is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}ezpayMerchants/createMerchant?userId=${userId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    console.log("333333", error);
    return callback(new HttpErrors.InternalServerError('Please try again.', { expose: false }));
  });
}

const funMerchantActionvationStatus = function (payload,callback) {
  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  let url = `${BASE_URL}ezpayMerchants/getMerchantActivationStatus?merchantId=${merchantId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    return callback(new HttpErrors.InternalServerError('Please try again.', { expose: false }));
  });
}

const funMerchantProfile = function (payload,callback) {
  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  let url = `${BASE_URL}ezpayMerchants/getMerchantProfile?merchantId=${merchantId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    return callback(new HttpErrors.InternalServerError('Please try again.', { expose: false }));
  });
}

module.exports = paymentServices;