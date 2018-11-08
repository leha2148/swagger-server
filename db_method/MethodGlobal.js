'use strict';

exports.insertMessage = function (knex, msg) {
    return knex('message').insert(msg).returning('msg_id');
};

exports.insertDlgMsg = function (knex, data) {
    return knex('dlg_msg').insert(data).returning('msg_id');
};

exports.selectDialogMsgs = function (knex, dlg_id) {
    const list_msg_id = knex.column('msg_id').select().from('dlg_msg').where('dlg_id', dlg_id);
    return knex.select().from('message').where('msg_id', 'in', list_msg_id);
};

exports.selectDialog = function(knex, dlg_id) {
    return knex.select().from('dialog').where('dlg_id', dlg_id);
};