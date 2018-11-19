//Payment Module
// eslint-disable-next-line import/prefer-default-export
const axios = require('axios');
const BASE_URL = `https://5m4hb8aet1.execute-api.us-west-2.amazonaws.com/prod/`;


function paymentServices(payload) {
  this.execute = function (payload) {
    // action key calls api.
    if(payload.action){
      switch(payload.action){
        case "CREATE_MERCHANT":
          return funCreateMerchant(payload,BASE_URL);
        break;
        case "GET_MERCHANT_ACTIVATION_STATUS":
          return funMerchantActionvationStatus(payload,BASE_URL);
        break;
        case "GET_MERCHANT_PROFILE":
          return funMerchantProfile(payload,BASE_URL);
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
const funCreateMerchant = function (payload, baseUrl,callback) {
  let userId = payload["meta"]["userId"];
  if (isNull(userId)) {
    return callback(new HttpErrors.BadRequest('User Id is mandatory.', { expose: false }));
  }

  let url = `${baseUrl}ezpayMerchants/createMerchant?userId=${userId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    console.log("333333", error);
    return callback(new HttpErrors.InternalServerError('Please try again.', { expose: false }));
  });
}

const funMerchantActionvationStatus = function (payload, baseUrl) {
  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  let url = `${baseUrl}ezpayMerchants/getMerchantActivationStatus?merchantId=${merchantId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    return callback(new HttpErrors.InternalServerError('Please try again.', { expose: false }));
  });
}

const funMerchantProfile = function (payload, baseUrl) {
  let merchantId = payload["meta"]["merchantId"];
  if (isNull(merchantId)) {
    return callback(new HttpErrors.BadRequest('merchant Id is mandatory.', { expose: false }));
  }
  let url = `${baseUrl}ezpayMerchants/getMerchantProfile?merchantId=${merchantId}`;
  axios.post(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    return callback(new HttpErrors.InternalServerError('Please try again.', { expose: false }));
  });
}

module.exports = paymentServices;