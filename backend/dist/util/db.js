"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var promise_1 = __importDefault(require("mysql2/promise"));
var host = process.env.MYSQL_ADDON_HOST;
var user = process.env.MYSQL_ADDON_USER;
var database = process.env.MYSQL_ADDON_DB;
var password = process.env.MYSQL_ADDON_PASSWORD;
console.log(host, user, database, password);
var db = promise_1.default.createPool({
    host: host,
    user: user,
    password: password,
    database: database
});
exports.default = db;
