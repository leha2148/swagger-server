'use strict';
const path = require('path');
/**
 * Возвращает картинку из папки public
 *
 * imgName String Имя картинки
 * returns File
 **/
exports.publicGetImg = function(imgName) {
    return new Promise(function(resolve, reject) {
        resolve(path.join(__dirname, '../public', imgName));
    });
};


/**
 * Получить информацию о диалоге
 *
 * body Body_3 ID диалога и ID отправителя
 * returns inline_response_200_2
 **/
exports.getDialogInfo = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "last_msg" : {
    "msg_text" : "Здравстуйте! Подскажите, пожалуйста, лучший наркологический диспансер в Липецке",
    "msg_dt" : "2018-11-04T00:42:36-03:00",
    "msg_id" : 5,
    "msg_fromyou" : true
  },
  "role" : "Volunteer",
  "interlocutor" : "Петров Александр",
  "create_dt" : "2018-11-04T00:42:36-03:00",
  "status" : "OK"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Получить все сообщения диалога
 *
 * body Body_2 ID диалога и ID отправителя
 * returns inline_response_200_1
 **/
exports.getDialogMsgs = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "array_msg" : [ {
    "msg_text" : "Здравстуйте! Подскажите, пожалуйста, лучший наркологический диспансер в Липецке",
    "msg_dt" : "2018-11-04T00:42:36-03:00",
    "msg_id" : 5,
    "msg_fromyou" : true
  }, {
    "msg_text" : "Здравстуйте! Подскажите, пожалуйста, лучший наркологический диспансер в Липецке",
    "msg_dt" : "2018-11-04T00:42:36-03:00",
    "msg_id" : 5,
    "msg_fromyou" : true
  } ],
  "status" : "OK"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Получить последнее сообщение в диалоге
 *
 * body Body_1 ID диалога и ID отправителя
 * returns inline_response_200_1
 **/
exports.getLastMsg = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "array_msg" : [ {
    "msg_text" : "Здравстуйте! Подскажите, пожалуйста, лучший наркологический диспансер в Липецке",
    "msg_dt" : "2018-11-04T00:42:36-03:00",
    "msg_id" : 5,
    "msg_fromyou" : true
  }, {
    "msg_text" : "Здравстуйте! Подскажите, пожалуйста, лучший наркологический диспансер в Липецке",
    "msg_dt" : "2018-11-04T00:42:36-03:00",
    "msg_id" : 5,
    "msg_fromyou" : true
  } ],
  "status" : "OK"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Отправить сообщение
 *
 * body Body ID диалога, ID отправителя и текст сообщения
 * returns inline_response_200
 **/
exports.sendMsg = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "msg_id" : 5,
  "status" : "OK"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

exports.newMethod = function(body) {
    return new Promise(function(resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "status" : "OK"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}

