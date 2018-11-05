'use strict';

var utils = require('../utils/writer.js');
var Volunteer = require('../service/VolunteerService');

module.exports.getRequest = function getRequest (req, res, next) {
  Volunteer.getRequest()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
