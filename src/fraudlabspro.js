var https = require('https');
var crypto = require('crypto');
var VERSION = '2.0.0';
var SOURCE = 'FraudLabsPro Node.js SDK';
var FORMAT = 'json';

function doHash(myStr) {
    let stuff = 'fraudlabspro_';
    let hashStr = stuff + myStr;
    for (let i = 0; i < 65536; i++) {
        let hash = crypto.createHash('sha1');
        hash.update(stuff + hashStr);
        hashStr = hash.digest('hex');
    }
    return hashStr;
}

class FraudValidation {
    constructor(key) {
        this.apiKey = key;
    }

    validate(params, callback) {
        let data = {
            key: this.apiKey,
            format: FORMAT,
            source: SOURCE,
            source_version: VERSION,
            flp_checksum:
                'flp_checksum' in params ? params['flp_checksum'] : '',

            // Billing information
            ip: 'ip' in params ? params['ip'] : '',
            first_name: 'first_name' in params ? params['first_name'] : '',
            last_name: 'last_name' in params ? params['last_name'] : '',
            username_hash:
                'username_hash' in params ? params['username_hash'] : '',
            email: 'email' in params ? params['email'] : '',
            email_domain:
                'email_domain' in params ? params['email_domain'] : '',
            email_hash: 'email_hash' in params ? params['email_hash'] : '',
            user_phone: 'user_phone' in params ? params['user_phone'] : '',
            bill_addr: 'bill_addr' in params ? params['bill_addr'] : '',
            bill_city: 'bill_city' in params ? params['bill_city'] : '',
            bill_state: 'bill_state' in params ? params['bill_state'] : '',
            bill_zip_code:
                'bill_zip_code' in params ? params['bill_zip_code'] : '',
            bill_country:
                'bill_country' in params ? params['bill_country'] : '',

            // Order information
            user_order_id:
                'user_order_id' in params ? params['user_order_id'] : '',
            user_order_memo:
                'user_order_memo' in params ? params['user_order_memo'] : '',
            amount: 'amount' in params ? params['amount'] : '',
            quantity: 'quantity' in params ? params['quantity'] : '',
            currency: 'currency' in params ? params['currency'] : 'USD',
            department: 'department' in params ? params['department'] : '',
            payment_mode:
                'payment_mode' in params ? params['payment_mode'] : '',

            // Credit card information
            bin_no: 'bin_no' in params ? params['bin_no'] : '',
            card_hash: 'card_hash' in params ? params['card_hash'] : '',
            avs_result: 'avs_result' in params ? params['avs_result'] : '',
            cvv_result: 'cvv_result' in params ? params['cvv_result'] : '',

            // Shipping information
            ship_addr: 'ship_addr' in params ? params['ship_addr'] : '',
            ship_city: 'ship_city' in params ? params['ship_city'] : '',
            ship_state: 'ship_state' in params ? params['ship_state'] : '',
            ship_zip_code:
                'ship_zip_code' in params ? params['ship_zip_code'] : '',
            ship_country:
                'ship_country' in params ? params['ship_country'] : '',
        };

        // here we do additional processing/filtering if need be
        if (
            data['username_hash'] == '' &&
            'username' in params &&
            params['username'] != ''
        ) {
            data['username_hash'] = doHash(params['username']);
        }
        if (
            data['email_domain'] == '' &&
            'email' in params &&
            params['email'].indexOf('@') != -1
        ) {
            data['email_domain'] = params['email'].substring(
                params['email'].indexOf('@') + 1
            );
        }
        if (
            data['email_hash'] == '' &&
            'email' in params &&
            params['email'].indexOf('@') != -1
        ) {
            data['email_hash'] = doHash(params['email']);
        }
        if (data['card_hash'] == '' && 'number' in params) {
            data['card_hash'] = doHash(params['number']);
        }
        if (data['bin_no'] == '' && 'number' in params) {
            data['bin_no'] = params['number'].substring(0, 9);
        }
        data['user_phone'] = data['user_phone'].replace(/\D/g, '');
        if (data['amount'] != '' && !isNaN(data['amount'])) {
            data['amount'] = parseFloat(data['amount']).toFixed(2);
        }

        let dataStr = '';

        Object.keys(data).forEach(function (key, index) {
            if (this[key] != '') {
                dataStr += key + '=' + encodeURIComponent(this[key]) + '&';
            }
        }, data);

        dataStr = dataStr.substring(0, dataStr.length - 1);

        let options = {
            hostname: 'api.fraudlabspro.com',
            port: 443,
            path: '/v1/order/screen',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(dataStr),
            },
        };

        let d = '';
        let req = https.request(options, function (res) {
            res.on('data', (chunk) => (d = d + chunk));
            res.on('end', function () {
                callback(null, res, JSON.parse(d));
            });
        });

        req.write(dataStr);
        req.end();
        req.on('error', function (e) {
            callback(e);
        });
    }

    feedback(params, callback) {
        let data = {
            key: this.apiKey,
            format: FORMAT,
            source: SOURCE,
            source_version: VERSION,

            id: 'id' in params ? params['id'] : '',
            action: 'action' in params ? params['action'] : '',
            note: 'note' in params ? params['note'] : '',
        };

        let dataStr = '';

        Object.keys(data).forEach(function (key, index) {
            if (this[key] != '') {
                dataStr += key + '=' + encodeURIComponent(this[key]) + '&';
            }
        }, data);

        dataStr = dataStr.substring(0, dataStr.length - 1);

        let options = {
            hostname: 'api.fraudlabspro.com',
            port: 443,
            path: '/v1/order/feedback',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(dataStr),
            },
        };

        let d = '';
        let req = https.request(options, function (res) {
            res.on('data', (chunk) => (d = d + chunk));
            res.on('end', function () {
                callback(null, res, JSON.parse(d));
            });
        });

        req.write(dataStr);
        req.end();
        req.on('error', function (e) {
            callback(e);
        });
    }

    getTransaction(params, callback) {
        let data = {
            key: this.apiKey,
            format: FORMAT,
            source: SOURCE,
            source_version: VERSION,

            id: 'id' in params ? params['id'] : '',
            id_type: 'id_type' in params ? params['id_type'] : '',
        };

        let urlStr = 'https://api.fraudlabspro.com/v1/order/result?';

        Object.keys(data).forEach(function (key, index) {
            if (this[key] != '') {
                urlStr += key + '=' + encodeURIComponent(this[key]) + '&';
            }
        }, data);

        urlStr = urlStr.substring(0, urlStr.length - 1);

        let d = '';
        let req = https.get(urlStr, function (res) {
            res.on('data', (chunk) => (d = d + chunk));
            res.on('end', function () {
                callback(null, res, JSON.parse(d));
            });
        });

        req.on('error', function (e) {
            callback(e);
        });
    }
}

class SMSVerification {
    constructor(key) {
        this.apiKey = key;
    }

    sendSMS(params, callback) {
        let data = {
            key: this.apiKey,
            format: FORMAT,
            source: SOURCE,
            source_version: VERSION,

            tel: 'tel' in params ? params['tel'] : '',
            otp_timeout:
                'otp_timeout' in params ? params['otp_timeout'] : '3600',
            mesg: 'mesg' in params ? params['mesg'] : '',
            country_code:
                'country_code' in params ? params['country_code'] : '',
        };

        let dataStr = '';

        Object.keys(data).forEach(function (key, index) {
            if (this[key] != '') {
                dataStr += key + '=' + encodeURIComponent(this[key]) + '&';
            }
        }, data);

        dataStr = dataStr.substring(0, dataStr.length - 1);

        let options = {
            hostname: 'api.fraudlabspro.com',
            port: 443,
            path: '/v1/verification/send',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(dataStr),
            },
        };

        let d = '';
        let req = https.request(options, function (res) {
            res.on('data', (chunk) => (d = d + chunk));
            res.on('end', function () {
                callback(null, res, JSON.parse(d));
            });
        });

        req.write(dataStr);
        req.end();
        req.on('error', function (e) {
            callback(e);
        });
    }

    verifyOTP(params, callback) {
        let data = {
            key: this.apiKey,
            format: FORMAT,
            source: SOURCE,
            source_version: VERSION,

            tran_id: 'tran_id' in params ? params['tran_id'] : '',
            otp: 'otp' in params ? params['otp'] : '',
        };

        let dataStr = '';

        Object.keys(data).forEach(function (key, index) {
            if (this[key] != '') {
                dataStr += key + '=' + encodeURIComponent(this[key]) + '&';
            }
        }, data);

        dataStr = dataStr.substring(0, dataStr.length - 1);

        let options = {
            hostname: 'api.fraudlabspro.com',
            port: 443,
            path: '/v1/verification/result',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(dataStr),
            },
        };

        let d = '';
        let req = https.request(options, function (res) {
            res.on('data', (chunk) => (d = d + chunk));
            res.on('end', function () {
                callback(null, res, JSON.parse(d));
            });
        });

        req.write(dataStr);
        req.end();
        req.on('error', function (e) {
            callback(e);
        });
    }
}

module.exports = {
    FraudValidation: FraudValidation,
    SMSVerification: SMSVerification,
};
