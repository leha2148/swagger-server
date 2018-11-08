'use strict';

const MethodDB = require('../db_method/MethodAdmin');
const knex = require('../index').knex;

/**
 * Регистрация волонтера или нового администратора
 *
 * body Volunteer Данные волонтера/администратора
 * returns inline_response_200_3
 **/
exports.registration = function (body) {
    const TAG = "registration";

    const this_vol = {
        vol_fullname: body.vol_fullname,
        vol_email: body.vol_email,
        vol_hashpass: body.vol_hashpass,
        vol_phone: body.vol_phone,
        vol_address: body.vol_address,
        vol_passeries: body.vol_passeries,
        vol_pasnumber: body.vol_pasnumber,
        vol_pasissued: body.vol_pasissued,
        vol_pasdateissued: body.vol_pasdateissued,
        vol_pasdeviscode: body.vol_pasdeviscode,
        vol_admin: body.vol_admin
    };

    return new Promise(function (resolve, reject) {
        const result = {};
        result['application/json'] = {
            "vol_fullname": null,
            "vol_admin": null,
            "vol_id": null,
            "status": "SERVER ERROR"
        };

        MethodDB.insertVol(knex, this_vol)
            .then((res) => {
                console.log(TAG + " -> result: good");
                result['application/json'] = {
                    "vol_fullname": res[0].vol_fullname,
                    "vol_admin": res[0].vol_admin,
                    "vol_id": res[0].vol_id,
                    "status": "OK"
                };
            })
            .catch((err) => {
                console.error(TAG + " -> result: " + err);
                result['application/json'] = {
                    "vol_fullname": null,
                    "vol_admin": null,
                    "vol_id": null,
                    "status": "ERROR"
                };
            })
            .finally(() => {
                resolve(result[Object.keys(result)[0]]);
            });
    });
};

