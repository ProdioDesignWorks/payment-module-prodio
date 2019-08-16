const APP_NOTIFICATION_TEMPLATE = "APP_NOTIFICATION_TEMPLATE";
const EMAIL_NOTIFICATION_TEMPLATE = "EMAIL_NOTIFICATION_TEMPLATE";
const SMS_NOTIFICATION_TEMPLATE = "SMS_NOTIFICATION_TEMPLATE";

const ANDROID_TYPE_TOKEN = "ANDROID_TYPE_TOKEN";
const IOS_TYPE_TOKEN = "IOS_TYPE_TOKEN";
const WEB_TYPE_TOKEN = "WEB_TYPE_TOKEN";

exports.APP_NOTIFICATION_TEMPLATE = APP_NOTIFICATION_TEMPLATE;
exports.EMAIL_NOTIFICATION_TEMPLATE = EMAIL_NOTIFICATION_TEMPLATE;
exports.SMS_NOTIFICATION_TEMPLATE = SMS_NOTIFICATION_TEMPLATE;
exports.TEMPLATE_TYPES = [
     APP_NOTIFICATION_TEMPLATE, 
     EMAIL_NOTIFICATION_TEMPLATE, 
     SMS_NOTIFICATION_TEMPLATE,
];

exports.ANDROID_TYPE_TOKEN = ANDROID_TYPE_TOKEN;
exports.IOS_TYPE_TOKEN = IOS_TYPE_TOKEN;
exports.WEB_TYPE_TOKEN = WEB_TYPE_TOKEN;
exports.TOKEN_TYPES = [
     ANDROID_TYPE_TOKEN,
     IOS_TYPE_TOKEN,
     WEB_TYPE_TOKEN,
];
exports.PAYMENT_URL = {
    "CREATE_ORDER":"ezpayPaymentTransactions/createOrder",
    "GET_ORDER_PROFILE":"ezpayPaymentTransactions/getOrderProfile",
    "CREATE_FUND_TRANSFER":"ezpayPaymentTransactions/createTransfer"
}
exports.PAYMENT_TERMS = {
	"PAID": "PAID",
	"FAILED": "FAILED",
	"PARTIALLY_PAID": "PARTIALLY_PAID",
	"PENDING": "PENDING",
	"RECURRING": "RECURRING",
	"INSTALLMENTS": "INSTALLMENTS"
}