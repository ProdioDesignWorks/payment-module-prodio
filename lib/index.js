"use strict";

//Payment Module
// eslint-disable-next-line import/prefer-default-export
var axios = require('axios');
var BASE_URL = "https://5m4hb8aet1.execute-api.us-west-2.amazonaws.com/prod/";

function paymentServices(payload) {
  this.execute = function (payload) {
    // action key calls api.
    if (payload.action) {
      switch (payload.action) {
        case "CREATE_MERCHANT":
          funCreateMerchant(payload, BASE_URL);
          break;
        case "GET_MERCHANT_ACTIVATION_STATUS":
          funMerchantActionvationStatus(payload, BASE_URL);
          break;
        case "GET_MERCHANT_PROFILE":
          funMerchantProfile(payload, BASE_URL);
          break;
        default:
          var errorMessage = "Please add BaseUrl.";
          return errorMessage;
          break;
      }
    } else {
      return "Please provide valid action";
    }
  };
}

//creating user in  notification consumer model.
var funCreateMerchant = function funCreateMerchant(payload, baseUrl) {
  var url = baseUrl + "ezpayMerchants/createMerchant";
  axios.post(url, payload).then(function (response) {
    if (response.status === 200) {
      console.log("111111");
    } else {
      console.log("222222");
    }
  }).catch(function (error) {
    console.log("333333", error);
  });
};

var funMerchantActionvationStatus = function funMerchantActionvationStatus(payload, baseUrl) {
  var url = baseUrl + "ezpayMerchants/getMerchantActivationStatus";
  axios.post(url, payload).then(function (response) {
    if (response.status === 200) {
      console.log("111111");
    } else {
      console.log("222222");
    }
  }).catch(function (error) {
    console.log("333333", error);
  });
};

var funMerchantProfile = function funMerchantProfile(payload, baseUrl) {
  var url = baseUrl + "ezpayMerchants/getMerchantProfile";
  axios.post(url, payload).then(function (response) {
    if (response.status === 200) {
      console.log("111111");
    } else {
      console.log("222222");
    }
  }).catch(function (error) {
    console.log("333333", error);
  });
};

module.exports = paymentServices;