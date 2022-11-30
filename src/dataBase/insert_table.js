// MYSQL
import optionsMysql from './options/mariaDB.js';
import Knex from 'knex';

const knexMysql = Knex(optionsMysql);

function insertProductMysql(producto){
    knexMysql("products")
    .insert(producto)
    .then(() => {
        console.log("Product inserted");
    })
    .catch((err) => {
        console.log(err);
    })
    // .finally(() => {
    //     knexMysql.destroy();
    // });
}

import optionsSqlite from './options/sqliteDB.js';

const knexSqlite = Knex(optionsSqlite);

function insertProductSqlite(message){
    knexSqlite("messages")
    .insert(message)
    .then(() => {
        console.log("Message inserted");
    })
    .catch((err) => {
        console.log(err);
    })
    // .finally(() => {
    //     knexSqlite.destroy();
    // });
}

module.exports = {
    insertProductMysql,
    insertProductSqlite,
}
