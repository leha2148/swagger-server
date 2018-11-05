'use strict';

const MethodDB = require('../db_method/MethodClient');
const knex = require('../index').knex;
var webshot = require('webshot');
var uniqid = require('uniqid');

/**
 * Создание диалога (НЕ привязанного к заявке) клиентом
 *
 * cli_id Integer ID клиента
 * returns inline_response_200_8
 **/
exports.clientSetDialog = function (cli_id) {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "dlg_id": 4,
            "status": "OK"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * Создать клиента и получить его ID
 *
 *
 * body Client Данные клиента
 * returns inline_response_200_11
 **/
exports.getClient = function (body, IP) {
    // Создание записи посещения для хранения в БД
    const this_cilent =
        {
            cli_ip: IP,
            cli_fullname: body.cli_fullname,
            cli_email: body.cli_email,
            cli_phone: body.cli_phone,
            cli_address: body.cli_address,
            cli_passeries: body.cli_passeries,
            cli_pasnumber: body.cli_pasnumber,
            cli_pasissued: body.cli_pasissued,
            cli_pasdateissued: body.cli_pasdateissued,
            cli_pasdeviscode: body.cli_pasdeviscode
        };

    return new Promise(function (resolve, reject) {
        const result = {};
        result['application/json'] = {
            "cli_id": null,
            "status": "SERVER ERROR"
        };

        try {
            MethodDB.insertClient(knex, this_cilent)
                .then((res) => {
                    result['application/json'] = {
                        "cli_id": res[0],
                        "status": "OK"
                    };
                })
                .catch((err) => {
                    result['application/json'] = {
                        "cli_id": null,
                        "status": "ERROR"
                    };
                })
                .finally(() => {
                    console.log("getClient -> result: " + result[Object.keys(result)[0]]);
                    resolve(result[Object.keys(result)[0]]);
                });
        }
        catch (e) {
            result['application/json'] = {
                "cli_id": null,
                "status": "SERVER ERROR"
            };
            console.log("getClient -> result: " + result[Object.keys(result)[0]]);
            reject(result[Object.keys(result)[0]]);
        }
    });
};


/**
 * Получить скриншот от сервера
 *
 *
 * uRL String URL ресурса, скриншот которого необходимо получить
 * returns inline_response_200_10
 **/
exports.getScreen = function (uRL, host) {
    const options = {
        streamType: 'png',
        windowSize: {
            width: 1920,
            height: 1080
        },
        shotSize: {
            width: 'all',
            height: 1080
        }
    };

    const imgName = uniqid();

    const result = {};
    result['application/json'] = {
        "imgsource": null,
        "status": "SERVER ERROR"
    };

    return new Promise(function (resolve, reject) {
        webshot(uRL, "./public/" + imgName + "." + options.streamType, options, (err) => {
            if (err) {
                console.error(err);
                result['application/json'] = {
                    "imgsource": null,
                    "status": "ERROR"
                };
                resolve(result[Object.keys(result)[0]]);
            }
            result['application/json'] = {
                "imgsource": host + "/public/" + imgName + "." + options.streamType,
                "status": "OK"
            };
            resolve(result[Object.keys(result)[0]]);
        });
    });

};


/**
 * Создание диалога, привязанного к заявке
 *
 * body Body_8 ID запроса и ID клиента
 * returns inline_response_200_8
 **/
exports.setDialogForRqt = function (body) {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "dlg_id": 4,
            "status": "OK"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * Создать заявку по ID клиента
 *
 *
 * body Request Данные заявки
 * returns inline_response_200_12
 **/
exports.setRequest = function (body) {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "rqt_id": 3,
            "status": "OK"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}

