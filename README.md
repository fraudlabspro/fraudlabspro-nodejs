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

```bash
   npm install fraudlabspro-nodejs
```

Usage Example
=============
### Validate Order

#### Object Properties

| Property Name          | Property Type | Description                                                   |
| -----------------------| ------------- | ------------------------------------------------------------- |
| ip                     | string        | (required) IP address of online transaction. It supports both IPv4 and IPv6 address format. |
| billing->first_name    | string        | (optional) User's first name.                                 |
| billing->last_name     | string        | (optional) User's last name.                                  |
| billing->address       | string        | (optional) Street address of billing address.                 |
| billing->city          | string        | (optional) City of billing address.                           |
| billing->state         | string        | (optional) State of billing address. It supports state codes, e.g. NY (New York), for state or province of United States or Canada. Please refer to [State & Province Codes](https://www.fraudlabspro.com/developer/reference/state-and-province-codes) for complete list. |
| billing->zip_code      | string        | (optional) Postal or ZIP code of billing address.             |
| billing->country       | string        | (optional) Country of billing address. It requires the input of ISO-3166 alpha-2 country code, e.g. US for United States. Please refer to [Country Codes](https://www.fraudlabspro.com/developer/reference/country-codes) for complete list. |
| billing->phone         | string        | (optional) User's phone number.                               |
| billing->email         | string        | (optional) User's email address.                              |
| shipping->first_name   | string        | (optional) Shipping user's first name.                        |
| shipping->last_name    | string        | (optional) Shipping user's last name.                         |
| shipping->address      | string        | (optional) Street address of shipping address.                |
| shipping->city         | string        | (optional) City of shipping address.                          |
| shipping->state        | string        | (optional) State of shipping address. It supports state codes, e.g. NY - New York, for state or province of United States or Canada. Please refer to [State & Province Codes](https://www.fraudlabspro.com/developer/reference/state-and-province-codes) for complete list. |
| shipping->zip_code     | string        | (optional) Postal or ZIP code of shipping address.            |
| shipping->country      | string        | (optional) Country of shipping address. It requires the input of ISO-3166 alpha-2 country code, e.g. US for United States. Please refer to [Country Codes](https://www.fraudlabspro.com/developer/reference/country-codes) for complete list. |
| order->order_id        | string        | (optiopnal) Merchant identifier to uniquely identify a transaction. It supports maximum of 15 characters user order id input. |
| order->currency        | string        | (optional) Currency code used in the transaction. It requires the input of ISO-4217 (3 characters) currency code, e.g. USD for US Dollar. Please refer to [Currency Codes](https://www.fraudlabspro.com/developer/reference/currency-codes) for complete list. |
| order->amount          | float         | (optional) Amount of the transaction.                         |
| order->quantity        | integer       | (optional) Total quantity of the transaction.                 |
| order->order_memo      | string        | (optional) Merchant description of an order transaction. It supports maximum of 200 characters. |
| order->department      | string        | (optional) Merchant identifier to uniquely identify a product or service department. |
| order->payment_gateway | string        | (optional) The name of payment gateway used to capture the payment. |
| order->payment_mode    | string        | (optional) Payment mode of transaction. Valid values: creditcard, affirm, paypal, googlecheckout, bitcoin, cod, moneyorder, wired, bankdeposit, elviauthorized, paymitco, cybersource, sezzle, viabill, amazonpay, pmnts_gateway, giftcard, others. |
| order->bin_no          | string        | (optional) First 6-9 digits of credit card number to identify issuing bank. |
| order->avs_result      | string        | (optional) The single character AVS result returned by the credit card processor. Please refer to [AVS & CVV2 Response Codes](https://www.fraudlabspro.com/developer/reference/avs-and-cvv2-response-codes) for details. |
| order->cvv_result      | string        | (optional) The single character CVV2 result returned by the credit card processor. Please refer to [AVS & CVV2 Response Codes](https://www.fraudlabspro.com/developer/reference/avs-and-cvv2-response-codes) for details. |
| items[]->sku           | string        | (optional) Product SKU of the transaction.                    |
| items[]->quantity      | integer       | (optional) Product quantity of the transaction.               |
| items[]->type          | string        | (optional) Product type of the transaction.                   |
| username               | string        | (optional) User's username.                                   |
| flp_checksum           | string        | (optional) Checksum for the device validation. Please visit [Agent Javascript](https://www.fraudlabspro.com/developer/javascript) to learn about the use of this parameter. |


```javascript
const {FraudValidation} = require("fraudlabspro-nodejs");

var flp = new FraudValidation('YOUR API KEY');

params = {
	ip: '146.112.62.105',
	billing: {
            last_name: 'Henderson',
            first_name: 'Hector',
            address: '1766 Powder House Road',
            city: 'West Palm Beach',
            state: 'FL',
            zip_code: '33401',
            country: 'US',
            phone: '561-628-8674',
            email: 'hh5566@gmail.com',
        },
        shipping: {
            last_name: 'John',
            first_name: 'Doe',
            address: '4469 Chestnut Street',
            city: 'Tampa',
            state: 'FL',
            zip_code: '33602',
            country: 'US',
        },
        order: {
            order_id: '67398',
            currency: 'USD',
            amount: '79.89',
            quantity: 1,
            order_memo: 'Online shop',
            department: 'Online Store',
            payment_gateway: 'stripe',
            payment_mode: 'creditcard',
            bin_no: '455655',
            avs_result: 'Y',
            cvv_result: 'M',
        },
        items: [{
            sku: '10001',
            quantity: 1,
            type: 'physical'
	}],
        username: 'hh5566',
        flp_checksum: ''
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
| id             | string         | (required) FraudLabs Pro transaction ID or Order ID.         |
| id_type        | string         | (optional) ID type. Valid values: fraudlabspro_id, user_order_id |


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
| id            | string        | (required) Unique transaction ID generated from **Validate** function. |
| action        | string        | (required) Perform APPROVE, REJECT, or REJECT_BLACKLIST action to transaction. |
| note          | string        | (optional) Notes for the feedback request.                   |


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
| ------------- | ------------- | ------------------------------------------------------------ |
| tel           | string        | (required) The recipient mobile phone number in E164 format which is a plus followed by just numbers with no spaces or parentheses. |
| mesg          | string        | (required) The message template for the SMS. Add <otp> as placeholder for the actual OTP to be generated. Max length is 140 characters. |
| otp_timeout   | integer       | (optional) Timeout feature for OTP value in seconds. Default is 3600 seconds(1 hour). Max timeout is 86400 seconds(24 hours). |
| country_code  | string        | (optional) ISO 3166 country code for the recipient mobile phone number. If parameter is supplied, then some basic telephone number validation is done. |


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
| ------------- | ------------- | ------------------------------------------------------------ |
| tran_id       | string        | (required) The unique ID that was returned by the Send SMS Verification that triggered the OTP sms. |
| otp           | string        | (required) The OTP that was sent to the recipient’s phone.   |


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
