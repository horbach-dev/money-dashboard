"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
exports.__esModule = true;
var fastify_1 = __importDefault(require("fastify"));
var fastify_static_1 = __importDefault(require("fastify-static"));
var path_1 = __importDefault(require("path"));
var bootstrap_1 = __importDefault(require("../server/bootstrap"));
var port = (_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.port) !== null && _b !== void 0 ? _b : 3000;
var Fastify = fastify_1["default"]();
Fastify.register(fastify_static_1["default"], {
    root: path_1["default"].resolve(__dirname, '..', 'dist')
});
Fastify.listen(port, function (err, address) {
    if (err)
        throw err;
    console.log("Server is now listening on " + address);
    setInterval(function () {
        bootstrap_1["default"]();
    }, 60000 * 10);
});
