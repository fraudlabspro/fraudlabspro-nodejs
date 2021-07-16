// const {FraudValidation, SMSVerification} = require("fraudlabspro-nodejs");
// const {FraudValidation, SMSVerification} = require("./fraudlabspro.js");
// const {FraudValidation} = require("./fraudlabspro.js");
// const {SMSVerification} = require("./fraudlabspro.js");

// var flp = new FraudValidation('YOUR API KEY');
// var sms = new SMSVerification('YOUR API KEY');

// params = {
	// ip: '8.8.8.8'
// };
// flp.validate(params, flpResults);

// params = {
	// id: '20210716AZ1ZIC',
	// action: 'REJECT',
// };
// flp.feedback(params, flpResults);

// params = {
	// id: '20210716AZ1ZIC',
	// id_type: 'fraudlabspro_id',
// };
// flp.getTransaction(params, flpResults);

// params = {
	// tel: '+1234567890',
	// mesg: 'Hello, your OTP is <otp>.',
// };
// sms.sendSMS(params, flpResults);

// params = {
	// tran_id: 'fG8Ee2w88DBD3HjzBz0',
	// otp: '649114',
// };
// sms.verifyOTP(params, flpResults);

function flpResults(err, res, data) {
	if (!err && res.statusCode == 200) {
		console.log(data);
	}
}
