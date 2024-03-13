# Quickstart

## Dependencies

This module requires API key to function. You may subscribe a free API key at https://www.fraudlabspro.com

## Installation

To install this module type the following:

```bash
   npm install fraudlabspro-nodejs
```

## Sample Codes

### Validate Order

You can validate your order as below:

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

You can get the details of a transaction as below:

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

You can approve, reject or ignore a transaction as below:

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

### Send SMS Verification

You can send SMS verification for authentication purpose as below:

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

You can verify the OTP sent by Fraudlabs Pro SMS verification API as below:

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