// const {FraudValidation, SMSVerification, Payment} = require("fraudlabspro-nodejs");
// const {FraudValidation, SMSVerification, Payment} = require("./fraudlabspro.js");
// const {FraudValidation} = require("./fraudlabspro.js");
// const {SMSVerification} = require("./fraudlabspro.js");
// const {Payment} = require("./fraudlabspro.js");

// var flp = new FraudValidation('YOUR API KEY');
// var sms = new SMSVerification('YOUR API KEY');
// var pay = new Payment('YOUR API KEY');

// params = {
	// ip: '8.8.8.8'
// };
// flp.validate(params, (err, data) => {
	// if (!err) {
		// console.log(data);
	// }
// });

// params = {
	// id: '20210716AZ1ZIC',
	// action: 'REJECT',
// };
// flp.feedback(params, (err, data) => {
	// if (!err) {
		// console.log(data);
	// }
// });

// params = {
	// id: '20210716AZ1ZIC',
	// id_type: 'fraudlabspro_id',
// };
// flp.getTransaction(params, (err, data) => {
	// if (!err) {
		// console.log(data);
	// }
// });

// params = {
	// tel: '+1234567890',
	// mesg: 'Hello, your OTP is <otp>.',
// };
// sms.sendSMS(params, (err, data) => {
	// if (!err) {
		// console.log(data);
	// }
// });

// params = {
	// tran_id: 'fG8Ee2w88DBD3HjzBz0',
	// otp: '649114',
// };
// sms.verifyOTP(params, (err, data) => {
	// if (!err) {
		// console.log(data);
	// }
// });

// params = {
	// email: 'hh5566@gmail.com',
	// status: 'declined',
	// message: 'Call Issuer. Pick Up Card. (2047)',
	// fraudlabspro_id: '20260131-O263CR',
// };
// pay.feedback(params, (err, data) => {
	// if (!err) {
		// console.log(data);
	// }
// });
