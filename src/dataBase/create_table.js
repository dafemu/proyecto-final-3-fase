// MYSQL
import optionsMysql from './options/mariaDB.js';
import Knex from 'knex';

const knexMysql = Knex(optionsMysql);

knexMysql.schema.dropTable('products')
.then(() => {
    console.log("Product table deleted");
});;
knexMysql.schema.createTable('products', (table) => {
    table.increments('id')
    table.string('title')
    table.integer('price')
    table.string('thumbnail')
}).then(() => {
    console.log("table products created");
}).catch(err => {
    console.log(err);
}).finally(()=>{
    knexMysql.destroy();
})

// SQLITE3
import optionsSqlite from './options/sqliteDB.js';
const knexSqlite = Knex(optionsSqlite);

knexSqlite.schema.dropTable('messages')
.then(() => {
    console.log("Messages table deleted");
});
knexSqlite.schema.createTable('messages', (table) => {
    table.increments('id')
    table.string('author')
    table.string('text')
    table.date('date')
}).then(() => {
    console.log("table messages created");
}).catch(err => {
    console.log(err);
}).finally(()=>{
    knexSqlite.destroy();
})