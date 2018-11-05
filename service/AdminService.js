'use strict';


/**
 * Регистрация волонтера или нового администратора
 *
 * body Volunteer Данные волонтера/администратора
 * returns inline_response_200_3
 **/
exports.registration = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "vol_name" : "Сергиенко Дмитрий Владимирович",
  "vol_admin" : false,
  "vol_id" : 2,
  "status" : "OK"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

