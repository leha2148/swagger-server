'use strict';
const path = require('path');
const MethodDB = require('../db_method/MethodGlobal');
const knex = require('../index').knex;
/**
 * Возвращает картинку из папки public
 *
 * imgName String Имя картинки
 * returns File
 **/
exports.publicGetImg = function (imgName) {
    return new Promise(function (resolve) {
        resolve(path.join(__dirname, '../public', imgName));
    });
};


/**
 * Получить информацию о диалоге
 *
 * body Body_3 ID диалога и ID отправителя
 * returns inline_response_200_2
 **/
exports.getDialogInfo = function (body) {
    return new Promise(function (resolve, reject) {
        const examples = {};
        examples['application/json'] = {
            "last_msg": {
                "msg_text": "Здравстуйте! Подскажите, пожалуйста, лучший наркологический диспансер в Липецке",
                "msg_dt": "2018-11-04T00:42:36-03:00",
                "msg_id": 5,
                "msg_fromyou": true
            },
            "role": "Volunteer",
            "interlocutor": "Петров Александр",
            "create_dt": "2018-11-04T00:42:36-03:00",
            "status": "OK"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
};


/**
 * Получить все сообщения диалога
 *
 * body Body_2 ID диалога и ID отправителя
 * returns inline_response_200_1
 **/
exports.getDialogMsgs = function (body) {
    const TAG = "getDialogMsgs";

    return new Promise(function (resolve, reject) {
        const result = {};
        result['application/json'] = {
            "array_msg": [],
            "status": "SERVER ERROR"
        };
        try {
            MethodDB.selectDialogMsgs(knex, body.dlg_id)
                .then((res) => {
                    console.log(TAG + "  -> result: good");
                    if (res.length === 0) {
                        result['application/json'] = {
                            "array_msg": [],
                            "status": "OK"
                        };
                    }
                    else {
                        res.forEach((el) => {
                            if(el.msg_sendercliid!=null && body.msg_sendercliid!==undefined &&
                                el.msg_sendercliid === body.msg_sendercliid){
                                Object.defineProperty(el, 'msg_fromyou',
                                    Object.getOwnPropertyDescriptor(el, 'msg_sendercliid'));
                                delete el['msg_sendercliid'];
                                delete el['msg_sendervolid'];
                                el.msg_fromyou = true;
                                return;
                            }
                            if(el.msg_sendervolid!=null && body.msg_sendervolid!==undefined &&
                                el.msg_sendervolid === body.msg_sendervolid){
                                Object.defineProperty(el, 'msg_fromyou',
                                    Object.getOwnPropertyDescriptor(el, 'msg_sendervolid'));
                                delete el['msg_sendercliid'];
                                delete el['msg_sendervolid'];
                                el.msg_fromyou = true;
                                return;
                            }
                            delete el['msg_sendercliid'];
                            delete el['msg_sendervolid'];
                            el.msg_fromyou = false;
                        });
                        result['application/json'] = {
                            "array_msg": res,
                            "status": "OK"
                        };
                    }
                })
                .catch((err) => {
                    console.error(TAG + "  -> result: " + err);
                })
                .finally(() => {
                    resolve(result[Object.keys(result)[0]]);
                });
        }
        catch (err) {
            console.error(TAG + " -> result: " + err);
            reject(result[Object.keys(result)[0]]);
        }
    });
};


/**
 * Получить последнее сообщение в диалоге
 *
 * body Body_1 ID диалога и ID отправителя
 * returns inline_response_200_1
 **/
exports.getLastMsg = function (body) {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "array_msg": [{
                "msg_text": "Здравстуйте! Подскажите, пожалуйста, лучший наркологический диспансер в Липецке",
                "msg_dt": "2018-11-04T00:42:36-03:00",
                "msg_id": 5,
                "msg_fromyou": true
            }, {
                "msg_text": "Здравстуйте! Подскажите, пожалуйста, лучший наркологический диспансер в Липецке",
                "msg_dt": "2018-11-04T00:42:36-03:00",
                "msg_id": 5,
                "msg_fromyou": true
            }],
            "status": "OK"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
};


/**
 * Отправить сообщение
 *
 * body Body ID диалога, ID отправителя и текст сообщения
 * returns inline_response_200
 **/

exports.sendMsg = function (body) {
    const TAG = "sendMsg";

    // Создание записи посещения для хранения в БД
    const this_msg =
        {
            msg_text: body.msg_text,
            msg_sendercliid: body.msg_sendercliid,
            msg_sendervolid: body.msg_sendervolid,
            msg_dt: new Date()
        };

    return new Promise(function (resolve, reject) {
            const result = {};
            result['application/json'] = {
                "msg_id": null,
                "status": "SERVER ERROR"
            };

            try {
                MethodDB.selectDialog(knex, body.dlg_id)
                    .then((res) => {
                        if (res.length === 0) throw new Error("Not Found Dialog");
                        if ((res[0].cli_id === body.msg_sendercliid && body.msg_sendervolid === undefined) ||
                            ((res[0].vol1_id === body.msg_sendervolid || res[0].vol2_id === body.msg_sendervolid) &&
                                body.msg_sendercliid === undefined))
                            return {set_vol1: false};
                        else {
                            if (res[0].vol1_id === null && body.msg_sendervolid !== undefined
                                && body.msg_sendercliid === undefined)
                                return {set_vol1: true};
                            else throw new Error('Dialog Not Found');
                        }
                    })
                    .then((res) => {
                        if (res.set_vol1)
                            return knex('dialog').update('vol1_id', body.msg_sendervolid).where('dlg_id', body.dlg_id);
                    })
                    .then((res) => {
                        if (res != null && res.length === 0) throw new Error("Could not bind message to dialog");
                        return MethodDB.insertMessage(knex, this_msg);
                    })
                    .then((res) => {
                        return MethodDB.insertDlgMsg(knex, { msg_id: res[0], dlg_id: body.dlg_id })
                    })
                    .then((res) => {
                        console.log(TAG + " -> result: good");
                        result['application/json'] = {
                            "msg_id": res[0],
                            "status": "OK"
                        };
                    })
                    .catch((err) => {
                        console.error(TAG + " -> result: " + err);
                        result['application/json'] = {
                            "msg_id": null,
                            "status": "ERROR"
                        };
                    })
                    .finally(() => {
                        resolve(result[Object.keys(result)[0]]);
                    });
            }
            catch
                (err) {
                result['application/json'] = {
                    "msg_id": null,
                    "status": "SERVER ERROR"
                };
                console.error(TAG + " -> result: " + err);
                reject(result[Object.keys(result)[0]]);
            }

        }
    );
};