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
          funCreateMerchant(payload,BASE_URL);
        break;
        case "GET_MERCHANT_ACTIVATION_STATUS":
          funMerchantActionvationStatus(payload,BASE_URL);
        break;
        case "GET_MERCHANT_PROFILE":
          funMerchantProfile(payload,BASE_URL);
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
const funCreateMerchant = function (payload, baseUrl) {
  let url = `${baseUrl}ezpayMerchants/createMerchant`;
  axios.post(url, payload).then(response => {
    if (response.status === 200) {
      console.log("111111");
    }
    else {
      console.log("222222");

    }
  }).catch((error) => {
    console.log("333333", error);
  });
}

const funMerchantActionvationStatus = function (payload, baseUrl) {
  let url = `${baseUrl}ezpayMerchants/getMerchantActivationStatus`;
  axios.post(url, payload).then(response => {
    if (response.status === 200) {
      console.log("111111");
    }
    else {
      console.log("222222");
    }
  }).catch((error) => {
    console.log("333333", error);
  });
}

const funMerchantProfile = function (payload, baseUrl) {
  let url = `${baseUrl}ezpayMerchants/getMerchantProfile`;
  axios.post(url, payload).then(response => {
    if (response.status === 200) {
      console.log("111111");
    }
    else {
      console.log("222222");
    }
  }).catch((error) => {
    console.log("333333", error);
  });
}

module.exports = paymentServices;