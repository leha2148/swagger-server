'use strict';

exports.insertClient = function (knex, client) {
    return knex('client').insert(client).returning('cli_id');
};