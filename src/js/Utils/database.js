/**
 * Created by davidzaludek on 29/04/17.
 */

import Dexie from "dexie";

var db = new Dexie("AFT_DB");

db.version(1).stores({
    users: "&uid, name, passHash",
    files: "&uid, userUID , name, dateFrom, dateTo, bankName",
    records: "&uid, fileUID, userUID , amount, transactionType, date, currency, bankName, optionalData"
});

var User = db.users.defineClass({
    uid: String,
    name: String,
    passHash: String,
    salt: String
});

User.prototype.save = function () {
    return db.users.put(this);
}

var File = db.files.defineClass({
    uid: String,
    userUID: String,
    name: String,
    dateFrom: String,
    dateTo: String,
    bankName: String
});

File.prototype.save = function () {
    return db.files.put(this);
}

var Record = db.files.defineClass({
    uid: String,
    fileUID: String,
    userUID: String,
    amount: Number,
    currency: String,
    date: String,
    bankName: String,
    transactionType: String,
    optionalData: Object
});

Record.prototype.save = function () {
    return db.records.put(this);
}

db.open().catch(function (e) {
    console.error("Open failed: " + e);
});

export var currencyDb = new Dexie("Currency_DB");

currencyDb.version(1).stores({
    currenciesConvert:"&id,base,rates"}
    );

currencyDb.open().catch(function (e) {
    console.error("Open failed: " + e);
});

export default db;

