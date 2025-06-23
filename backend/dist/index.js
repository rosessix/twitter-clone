"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_1 = __importDefault(require("./routes/users"));
var posts_1 = __importDefault(require("./routes/posts"));
var cors_1 = __importDefault(require("cors"));
var PORT = 8080;
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    // origin: 'http://localhost:5173',
    // origin: '*',
    origin: true,
}));
// app.use(session({
//     secret: 'daydream_total_secret_key_mayn',
//     resave: false,
//     saveUninitialized: false
// }))
app.use(express_1.default.json());
app.use('/api/users/', users_1.default);
app.use('/api/posts/', posts_1.default);
app.listen(PORT, function () {
    console.log("Server is running at port : ".concat(PORT));
});
