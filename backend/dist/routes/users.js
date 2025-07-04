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
var express_1 = __importDefault(require("express"));
var users_1 = require("../controllers/users");
var tokenHandler_1 = require("../util/tokenHandler");
var router = express_1.default.Router();
router.post('/create', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, username, creation, login, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password, username = _a.username;
                return [4 /*yield*/, (0, users_1.createUser)(email, username, password, req)];
            case 1:
                creation = _b.sent();
                if (creation.error) {
                    return [2 /*return*/, res.status(200).send({ error: true, msg: creation.msg })];
                }
                return [4 /*yield*/, (0, users_1.loginUser)(email, password, req)];
            case 2:
                login = _b.sent();
                token = undefined;
                if (!login.error) {
                    token = (0, tokenHandler_1.assignToken)(login.user, { expiresIn: '1h' });
                }
                console.log(login.msg);
                res.status(200).send({ token: token, msg: login.msg });
                return [2 /*return*/];
        }
    });
}); });
router.get('/:id', function (req, res) {
    console.log('hej det er fra id');
});
router.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, login, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, (0, users_1.loginUser)(email, password, req)];
            case 1:
                login = _b.sent();
                token = undefined;
                if (!login.error) {
                    token = (0, tokenHandler_1.assignToken)(login.user, { expiresIn: '1h' });
                }
                // res.status(200).send(login)
                console.log('login');
                res.status(200).send({ token: token, msg: login.msg });
                return [2 /*return*/];
        }
    });
}); });
router.post('/update', tokenHandler_1.authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, bio, location, link, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, bio = _a.bio, location = _a.location, link = _a.link;
                return [4 /*yield*/, (0, users_1.updateUserProfile)(req.user.id, bio, location, link)];
            case 1:
                user = _b.sent();
                res.status(200).send({ updated: true, userData: user });
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
