"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var promise_1 = __importDefault(require("mysql2/promise"));
var host = 'localhost';
var user = 'root';
var database = 'daydream';
var password = '';
var db = promise_1.default.createPool({
    host: host,
    user: user,
    password: password,
    database: database
});
exports.default = db;
