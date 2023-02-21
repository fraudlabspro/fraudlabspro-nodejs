var https = require('https');
var crypto = require('crypto');
var VERSION = '2.1.0';
var SOURCE = 'sdk-nodejs';
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
            ip: 'ip' in params ? params['ip'] : '',
            username: 'username' in params ? params['username'] : '',
            flp_checksum: 'flp_checksum' in params ? params['flp_checksum'] : '',

            // Billing information
            last_name: (typeof(params['billing']['last_name']) !== 'undefined') ? params['billing']['last_name'] : '',
            first_name: (typeof(params['billing']['first_name']) !== 'undefined') ? params['billing']['first_name'] : '',
            bill_addr: (typeof(params['billing']['address']) !== 'undefined') ? params['billing']['address'] : '',
            bill_city: (typeof(params['billing']['city']) !== 'undefined') ? params['billing']['city'] : '',
            bill_state: (typeof(params['billing']['state']) !== 'undefined') ? params['billing']['state'] : '',
            bill_country: (typeof(params['billing']['country']) !== 'undefined') ? params['billing']['country'] : '',
            bill_zip_code: (typeof(params['billing']['zip_code']) !== 'undefined') ? params['billing']['zip_code'] : '',
            user_phone: (typeof(params['billing']['phone']) !== 'undefined') ? params['billing']['phone'] : '',
            email: (typeof(params['billing']['email']) !== 'undefined') ? params['billing']['email'] : '',

            // Shipping information
            ship_last_name: (typeof(params['shipping']['last_name']) !== 'undefined') ? params['shipping']['last_name'] : '',
            ship_first_name: (typeof(params['shipping']['first_name']) !== 'undefined') ? params['shipping']['first_name'] : '',
            ship_addr: (typeof(params['shipping']['address']) !== 'undefined') ? params['shipping']['address'] : '',
            ship_city: (typeof(params['shipping']['city']) !== 'undefined') ? params['shipping']['city'] : '',
            ship_state: (typeof(params['shipping']['state']) !== 'undefined') ? params['shipping']['state'] : '',
            ship_country: (typeof(params['shipping']['country']) !== 'undefined') ? params['shipping']['country'] : '',
            ship_zip_code: (typeof(params['shipping']['zip_code']) !== 'undefined') ? params['shipping']['zip_code'] : '',

            // Order information
            user_order_id: (typeof(params['order']['order_id']) !== 'undefined') ? params['order']['order_id'] : '',
            currency: (typeof(params['order']['currency']) !== 'undefined') ? params['order']['currency'] : 'USD',
            amount: (typeof(params['order']['amount']) !== 'undefined') ? params['order']['amount'] : 0,
            quantity: (typeof(params['order']['quantity']) !== 'undefined') ? params['order']['quantity'] : 0,
            user_order_memo: (typeof(params['order']['order_memo']) !== 'undefined') ? params['order']['order_memo'] : '',
            department: (typeof(params['order']['department']) !== 'undefined') ? params['order']['department'] : '',
            payment_gateway: (typeof(params['order']['payment_gateway']) !== 'undefined') ? params['order']['payment_gateway'] : '',
            payment_mode: (typeof(params['order']['payment_mode']) !== 'undefined') ? params['order']['payment_mode'] : '',
            bin_no: (typeof(params['order']['bin_no']) !== 'undefined') ? params['order']['bin_no'] : '',
            avs_result: (typeof(params['order']['avs_result']) !== 'undefined') ? params['order']['avs_result'] : '',
            cvv_result: (typeof(params['order']['cvv_result']) !== 'undefined') ? params['order']['cvv_result'] : '',
        };

        // Item information
        if (typeof(params['items']) !== 'undefined') {
            data['items'] = '';
            if (params['items'].length > 0) {
                params['items'].forEach(function (item) {
                    if (typeof(item['sku']) !== 'undefined') {
                        data['items'] += item['sku'] + ':' + item['quantity'] + ':' + item['type'] + ','
                    }
                });
                if (data['items'].slice(-1) == ',') {
                    data['items'] = data['items'].slice(0, -1);
                }
            }
        }

        // here we do additional processing/filtering if need be
        if (data['email'] !== '') {
            if (data['email'].indexOf('@') != -1) {
                data['email_hash'] = doHash(data['email']);
                data['email_domain'] = data['email'].substring(data['email'].indexOf('@') + 1);
            }
        }

        if (data['bin_no'] !== '') {
            data['bin_no'] = data['bin_no'].substring(0, 9);
            data['card_hash'] = doHash(data['bin_no']);
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
                callback(null, JSON.parse(d));
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
                callback(null, JSON.parse(d));
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
                callback(null, JSON.parse(d));
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
                callback(null, JSON.parse(d));
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
                callback(null, JSON.parse(d));
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
