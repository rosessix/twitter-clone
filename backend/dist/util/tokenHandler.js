"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.assignToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JWT_KEY = 'omega_secret_key_lol_kekw';
var assignToken = function (user, data) {
    return jsonwebtoken_1.default.sign(user, JWT_KEY, data);
};
exports.assignToken = assignToken;
var authenticateToken = function (req, res, next) {
    var authHeader = req.headers['authorization'];
    if (authHeader == undefined) {
        return res.status(401).send({ error: true, errorMsg: 'No token found. Please login.' }); // no token found
    }
    var token = authHeader.split(' ')[1]; // Assuming Bearer token format
    jsonwebtoken_1.default.verify(token, JWT_KEY, function (err, user) {
        if (err) {
            return res.status(403).send({ error: true, errorMsg: 'Invalid token. Please login, again.' }); // Invalid token
        }
        req.user = user; // Add user to the request object
        next(); // Proceed to the next middleware or route
    });
};
exports.authenticateToken = authenticateToken;
