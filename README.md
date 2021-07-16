[![npm](https://img.shields.io/npm/v/fraudlabspro-nodejs.svg)](http://npm.im/fraudlabspro-nodejs)
[![npm](https://img.shields.io/npm/dm/fraudlabspro-nodejs.svg)](http://npm.im/fraudlabspro-nodejs)

FraudLabs Pro Node.js SDK
=========================

This Node.js module enables user to easily implement fraud detection feature into their solution using the API from https://www.fraudlabspro.com.

Below are the features of this Node.js module:
- Fraud analysis and scoring
- IP address geolocation & proxy validation
- Email address validation
- Credit card issuing bank validation
- Transaction velocity validation
- Device transaction validation
- Blacklist validation
- Custom rules trigger
- Email notification of fraud orders
- Mobile app notification of fraud orders

This module requires an API key to function. You may subscribe for a free API key at https://www.fraudlabspro.com


Installation
============

To install this module type the following:

   npm install fraudlabspro-nodejs


Usage Example
=============
### Validate Order

#### Object Properties

| Property Name                     | Property Type | Description                                                  |
| --------------------------------- | ------------- | ------------------------------------------------------------ |
| ip                                | string        | IP address of online transaction. It supports both IPv4 and IPv6 address format. |
| first_name   | string        | User's first name.                                           |
| last_name    | string        | User's last name.                                            |
| username    | string        | User's username.                                             |
| email       | string        | User's email address.                                        |
| user_phone       | string        | User's phone number.                                         |
| bill_addr     | string        | Street address of billing address.                           |
| bill_city        | string        | City of billing address.                                     |
| bill_state       | string        | State of billing address. It supports state codes, e.g. NY (New York), for state or province of United States or Canada. Please refer to [State & Province Codes](https://www.fraudlabspro.com/developer/reference/state-and-province-codes) for complete list. |
| bill_zip_code    | string        | Postal or ZIP code of billing address.                       |
| bill_country     | string        | Country of billing address. It requires the input of ISO-3166 alpha-2 country code, e.g. US for United States. Please refer to [Country Codes](https://www.fraudlabspro.com/developer/reference/country-codes) for complete list. |
| user_order_id       | string        | Merchant identifier to uniquely identify a transaction. It supports maximum of 15 characters user order id input. |
| user_order_memo          | string        | Merchant description of an order transaction. It supports maximum of 200 characters. |
| amount        | float         | Amount of the transaction.                                   |
| quantity      | integer       | Total quantity of the transaction.                           |
| currency      | string        | Currency code used in the transaction. It requires the input of ISO-4217 (3 characters) currency code, e.g. USD for US Dollar. Please refer to [Currency Codes](https://www.fraudlabspro.com/developer/reference/currency-codes) for complete list. |
| department    | string        | Merchant identifier to uniquely identify a product or service department. |
| payment_mode | string        | Payment mode of transaction. Valid values: creditcard, affirm, paypal, googlecheckout, bitcoin, cod, moneyorder, wired, bankdeposit, elviauthorized, paymitco, cybersource, sezzle, viabill, amazonpay, pmnts_gateway, giftcard, others.   |
| number         | string        | Billing credit card number or BIN number.                    |
| avs_result            | string        | The single character AVS result returned by the credit card processor. Please refer to [AVS & CVV2 Response Codes](https://www.fraudlabspro.com/developer/reference/avs-and-cvv2-response-codes) for details. |
| cvv_result            | string        | The single character CVV2 result returned by the credit card processor. Please refer to [AVS & CVV2 Response Codes](https://www.fraudlabspro.com/developer/reference/avs-and-cvv2-response-codes) for details. |
| ship_addr    | string        | Street address of shipping address.                          |
| ship_city       | string        | City of shipping address.                                    |
| ship_state      | string        | State of shipping address. It supports state codes, e.g. NY - New York, for state or province of United States or Canada. Please refer to [State & Province Codes](https://www.fraudlabspro.com/developer/reference/state-and-province-codes) for complete list. |
| ship_zip_code   | string        | Postal or ZIP code of shipping address.                      |
| ship_country    | string        | Country of shipping address. It requires the input of ISO-3166 alpha-2 country code, e.g. US for United States. Please refer to [Country Codes](https://www.fraudlabspro.com/developer/reference/country-codes) for complete list. |


```javascript
const {FraudValidation} = require("fraudlabspro-nodejs");

var flp = new FraudValidation('YOUR API KEY');

params = {
	ip: '146.112.62.105',
	user_order_id: '67398',
	user_order_memo: 'Online shop',
	currency: 'USD',
	amount: '79.89',
	quantity: 1,
	number: '4556553172971283',
	payment_mode: 'creditcard',
	first_name: 'Hector',
	last_name: 'Henderson',
	email: 'hh5566@gmail.com',
	user_phone: '561-628-8674',
	bill_addr: '1766 Powder House Road',
	bill_city: 'West Palm Beach',
	bill_state: 'FL',
	bill_zip_code: '33401',
	bill_country: 'US',
	ship_addr: '4469 Chestnut Street',
	ship_city: 'Tampa',
	ship_state: 'FL',
	ship_zip_code: '33602',
	ship_country: 'US',
};
flp.validate(params, (err, data) => {
	if (!err) {
		console.log(data);
	}
});
```


### Get Transaction

#### Parameter Properties

| Parameter Name | Parameter Type | Description                                                  |
| -------------- | -------------- | ------------------------------------------------------------ |
| id            | string         | FraudLabs Pro transaction ID or Order ID.                    |
| id_type          | string         | ID type. Valid values: fraudlabspro_id, user_order_id |


```javascript
const {FraudValidation} = require("fraudlabspro-nodejs");

var flp = new FraudValidation('YOUR API KEY');

params = {
	id: '20170906MXFHSTRF',
	id_type: 'fraudlabspro_id',
};
flp.getTransaction(params, (err, data) => {
	if (!err) {
		console.log(data);
	}
});
```


### Feedback

#### Object Properties

| Property Name | Property Type | Description                                                  |
| ------------- | ------------- | ------------------------------------------------------------ |
| id            | string        | Unique transaction ID generated from **Validate** function.  |
| action        | string        | Perform APPROVE, REJECT, or REJECT_BLACKLIST action to transaction. |
| note          | string        | Notes for the feedback request.                              |


```javascript
const {FraudValidation} = require("fraudlabspro-nodejs");

var flp = new FraudValidation('YOUR API KEY');

params = {
	id: '20170906MXFHSTRF',
	action: 'APPROVE',
	note: 'This customer made a valid purchase before.',
};
flp.feedback(params, (err, data) => {
	if (!err) {
		console.log(data);
	}
});
```


***


## SMS Verification

### Send SMS Verification

#### Object Properties

| Property Name | Property Type | Description                                                  |
| ------------- | :-----------: | ------------------------------------------------------------ |
| tel           |    string     | The recipient mobile phone number in E164 format which is a plus followed by just numbers with no spaces or parentheses. |
| mesg          |    string     | The message template for the SMS. Add <otp> as placeholder for the actual OTP to be generated. Max length is 140 characters. |
| otp_timeout   |    integer    | Timeout feature for OTP value in seconds. Default is 3600 seconds(1 hour). Max timeout is 86400 seconds(24 hours). |
| country_code  |    string     | ISO 3166 country code for the recipient mobile phone number. If parameter is supplied, then some basic telephone number validation is done. |


```javascript
const {SMSVerification} = require("fraudlabspro-nodejs");

var sms = new SMSVerification('YOUR API KEY');

params = {
	tel: '+123456789',
	mesg: 'Hi, your OTP is <otp>.',
	otp_timeout: 3600,
	country_code: 'US',
};
sms.sendSMS(params, (err, data) => {
	if (!err) {
		console.log(data);
	}
});
```


### Get SMS Verification Result

#### Object Properties

| Property Name | Property Type | Description                                                  |
| ------------- | :-----------: | ------------------------------------------------------------ |
| tran_id       |    string     | The unique ID that was returned by the Send SMS Verification that triggered the OTP sms. |
| otp           |    string     | The OTP that was sent to the recipient’s phone. |


```javascript
const {SMSVerification} = require("fraudlabspro-nodejs");

var sms = new SMSVerification('YOUR API KEY');

params = {
	tran_id: 'UNIQUE_TRANS_ID',
	otp: 'OTP_RECEIVED',
};
sms.verifyOTP(params, (err, data) => {
	if (!err) {
		console.log(data);
	}
});
```