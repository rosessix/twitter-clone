"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.fetchAllUsers = exports.getUserFromId = exports.loginUser = exports.createUser = void 0;
var uuid_1 = require("uuid");
var db_1 = __importDefault(require("../util/db"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var SALT_ROUNDS = 12;
var DEFAULT_IMAGE = 'https://picsum.photos/200'; // this is a random image
var createUser = function (email, username, password, req) { return __awaiter(void 0, void 0, void 0, function () {
    var con, data, hashedPassword, gUid, query, values, creation, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default.getConnection()];
            case 1:
                con = _a.sent();
                return [4 /*yield*/, con.execute('SELECT * FROM users WHERE email = ? OR username = ?', [email, username])];
            case 2:
                data = _a.sent();
                con.release();
                if (!(data[0][0] == undefined)) return [3 /*break*/, 6];
                return [4 /*yield*/, bcrypt_1.default.hash(password, SALT_ROUNDS)];
            case 3:
                hashedPassword = _a.sent();
                return [4 /*yield*/, (0, uuid_1.v4)()];
            case 4:
                gUid = _a.sent();
                query = 'INSERT INTO users (id, email, username, password, img) VALUES (?, ?, ?, ?, ?)';
                values = [gUid, email, username, hashedPassword, DEFAULT_IMAGE];
                return [4 /*yield*/, con.execute(query, values)];
            case 5:
                creation = _a.sent();
                user = (0, exports.loginUser)(email, password, req);
                return [2 /*return*/, { error: false, msg: "Your account has been created.", user: user }];
            case 6:
                if (data[0][0].email === email) {
                    return [2 /*return*/, { error: true, msg: "This email is already in use." }];
                }
                con.release();
                if (data[0][0].username === username) {
                    return [2 /*return*/, { error: true, msg: "There is already a user with this username." }];
                }
                _a.label = 7;
            case 7: return [2 /*return*/, { error: true, msg: 'Unknown error occured.' }];
        }
    });
}); };
exports.createUser = createUser;
var loginUser = function (email, password, req) { return __awaiter(void 0, void 0, void 0, function () {
    var con, NO_USER_MSG, query, values, data, user, MATCH;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default.getConnection()];
            case 1:
                con = _a.sent();
                NO_USER_MSG = 'The credentials given, did not match a user.';
                query = 'SELECT * FROM users WHERE email = ?';
                values = [email];
                return [4 /*yield*/, con.execute(query, values)];
            case 2:
                data = _a.sent();
                con.release();
                user = data[0][0];
                if (user == undefined) {
                    return [2 /*return*/, { error: true, msg: NO_USER_MSG }];
                }
                if (!user || !user.password) {
                    return [2 /*return*/, { error: true, msg: NO_USER_MSG }];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 3:
                MATCH = _a.sent();
                if (!MATCH) {
                    return [2 /*return*/, { error: true, msg: NO_USER_MSG }];
                }
                user.password = undefined; // remove it for security reasons
                user.avatar = user.avatar || DEFAULT_IMAGE;
                // (req.session as any).user = {
                //     user
                // }
                return [2 /*return*/, { error: false, user: user }];
        }
    });
}); };
exports.loginUser = loginUser;
var getUserFromId = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var con, data, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!id)
                    throw new Error('getUserFromId must have a valid id parsed.');
                return [4 /*yield*/, db_1.default.getConnection()];
            case 1:
                con = _a.sent();
                return [4 /*yield*/, con.execute('SELECT * FROM users WHERE id = ?', [id])];
            case 2:
                data = _a.sent();
                con.release();
                user = data[0][0];
                user.password = undefined;
                if (!user)
                    return [2 /*return*/, console.log("Could not find user ".concat(id, " in the database."))];
                return [2 /*return*/, user];
        }
    });
}); };
exports.getUserFromId = getUserFromId;
var fetchAllUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var con, data, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default.getConnection()];
            case 1:
                con = _a.sent();
                return [4 /*yield*/, con.execute('SELECT * FROM users')];
            case 2:
                data = _a.sent();
                con.release();
                users = data[0];
                return [2 /*return*/, users];
        }
    });
}); };
exports.fetchAllUsers = fetchAllUsers;
var updateUserProfile = function (id, bio, location, link) { return __awaiter(void 0, void 0, void 0, function () {
    var con, query, values, edited, userData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default.getConnection()];
            case 1:
                con = _a.sent();
                query = 'UPDATE users SET bio = ?, location = ?, link = ? WHERE id = ?';
                values = [bio, location, link, id];
                return [4 /*yield*/, con.execute(query, values)];
            case 2:
                edited = _a.sent();
                con.release();
                return [4 /*yield*/, (0, exports.getUserFromId)(id)];
            case 3:
                userData = _a.sent();
                console.log(userData);
                return [2 /*return*/, userData];
        }
    });
}); };
exports.updateUserProfile = updateUserProfile;
