'use strict';


/**
 * Получить необработанную заявку
 *
 * returns inline_response_200_13
 **/
exports.getRequest = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "request_data" : {
    "client" : {
      "cli_address" : "г. Липецк, ул. 60 лет СССР, д. 13, кв. 7",
      "cli_phone" : "9204001000",
      "cli_pasdateissued" : "2018-11-04",
      "cli_passeries" : 1122,
      "cli_pasdeviscode" : 333111,
      "cli_pasissued" : "отделом УФМС России по Липецкой области в Советском округе гор. Липецка",
      "cli_fullname" : "Смоленцев Игорь Сергеевич",
      "cli_email" : "smolencev@gmail.com",
      "cli_pasnumber" : 122133
    },
    "rqt_url" : "https://www.postgresql.org/docs/9.1/static/datatype-numeric.html",
    "rqt_imgsource" : "http://voice-gen-220-900.appspot.com/screen1.jpg",
    "rqt_comment" : "Там нужен пароль при входе P@ss и логин Coco"
  },
  "status" : "OK"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

