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
exports.likePostWithId = exports.fetchAllPosts = exports.fetchPost = exports.getPostFromId = exports.createPost = void 0;
var db_1 = __importDefault(require("../util/db"));
var users_1 = require("./users");
var uuid_1 = require("uuid");
var createPost = function (authorId, text) { return __awaiter(void 0, void 0, void 0, function () {
    var con, randomId, postId, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!authorId)
                    throw new Error('createPost authorId must be a valid string.');
                if (!text)
                    throw new Error('createPost text, must have a valid text form, and has to be a string.');
                return [4 /*yield*/, db_1.default.getConnection()];
            case 1:
                con = _a.sent();
                randomId = (0, uuid_1.v4)();
                postId = "".concat(authorId, "-").concat(randomId);
                return [4 /*yield*/, con.execute('INSERT INTO posts (id, authorId, text) VALUES (?, ? ,?)', [postId, authorId, text])];
            case 2:
                data = _a.sent();
                con.release();
                if (!data)
                    return [2 /*return*/, { error: true, errorMsg: 'An error occured. Please try again.' }];
                return [2 /*return*/, data];
        }
    });
}); };
exports.createPost = createPost;
var getPostFromId = function (postId) { return __awaiter(void 0, void 0, void 0, function () {
    var NO_POST_FOUND, con, data, post, likeData, likeCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                NO_POST_FOUND = "The given postId (".concat(postId, ") did not return a post from the database. Please contact a developer if this issue persists.");
                return [4 /*yield*/, db_1.default.getConnection()];
            case 1:
                con = _a.sent();
                return [4 /*yield*/, con.execute('SELECT * FROM posts WHERE id = ?', [postId])];
            case 2:
                data = _a.sent();
                post = data[0][0];
                if (!post)
                    return [2 /*return*/, console.log(NO_POST_FOUND)];
                return [4 /*yield*/, con.execute('SELECT COUNT(*) as likeCount FROM post_likes WHERE post_id = ?', [postId])];
            case 3:
                likeData = _a.sent();
                likeCount = likeData[0][0].likeCount;
                post.likeCount = likeCount;
                con.release();
                return [2 /*return*/, post];
        }
    });
}); };
exports.getPostFromId = getPostFromId;
var fetchPost = function (authorId, postId) { return __awaiter(void 0, void 0, void 0, function () {
    var NO_USER_FOUND, NO_POST_FOUND, user, post;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                NO_USER_FOUND = "Could not find any user with given authorId (".concat(authorId, ")");
                NO_POST_FOUND = "The given postId (".concat(postId, ") did not give a post back from the database. Please contact a developer if this issue persists.");
                if (!authorId)
                    throw new Error('fetchPost authorId must be a valid string.');
                return [4 /*yield*/, (0, users_1.getUserFromId)(authorId)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, { error: true, erorrMsg: NO_USER_FOUND }];
                return [4 /*yield*/, (0, exports.getPostFromId)(postId)];
            case 2:
                post = _a.sent();
                if (!post)
                    return [2 /*return*/, { error: true, NO_POST_FOUND: NO_POST_FOUND }];
                return [2 /*return*/, post];
        }
    });
}); };
exports.fetchPost = fetchPost;
var fetchAllPosts = function () { return __awaiter(void 0, void 0, void 0, function () {
    var con, data, posts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default.getConnection()];
            case 1:
                con = _a.sent();
                return [4 /*yield*/, con.execute("\n        SELECT \n            posts.id AS post_id,  -- Alias the post's id\n            posts.authorId, \n            posts.text, \n            users.id AS user_id,  -- Alias the user's id\n            users.username, \n            users.email,\n            users.img,\n            posts.created_at,\n            COUNT(post_likes.post_id) AS likeCount\n        FROM posts\n        INNER JOIN users ON posts.authorId = users.id\n        LEFT JOIN post_likes ON posts.id = post_likes.post_id\n        GROUP BY posts.id, users.id\n        ORDER BY posts.created_at DESC\n    ")];
            case 2:
                data = _a.sent();
                posts = data[0];
                con.release();
                return [2 /*return*/, posts];
        }
    });
}); };
exports.fetchAllPosts = fetchAllPosts;
var likePostWithId = function (user, postId) { return __awaiter(void 0, void 0, void 0, function () {
    var con, rows, inserted, deleted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default.getConnection()];
            case 1:
                con = _a.sent();
                return [4 /*yield*/, con.execute("SELECT * FROM post_likes WHERE user_id = ? AND post_id = ?", [user.id, postId])];
            case 2:
                rows = (_a.sent())[0];
                if (!(rows.length == 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, con.execute("INSERT INTO post_likes (post_id, user_id) VALUES(?, ?)", [postId, user.id])];
            case 3:
                inserted = _a.sent();
                con.release();
                return [2 /*return*/, { liked: true }];
            case 4: return [4 /*yield*/, con.execute("DELETE FROM post_likes WHERE post_id = ? AND user_id = ?", [postId, user.id])];
            case 5:
                deleted = _a.sent();
                con.release();
                return [2 /*return*/, { liked: false }];
        }
    });
}); };
exports.likePostWithId = likePostWithId;
