"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var preservedFileName = 'index.html';
var distDirectory = path_1["default"].resolve(__dirname, '..', 'dist');
fs_1["default"].readdir(distDirectory, function (err, files) {
    if (err) {
        console.error(err);
    }
    files.forEach(function (file) {
        var fileDir = distDirectory + "/" + file;
        if (file !== preservedFileName) {
            fs_1["default"].unlinkSync(fileDir);
        }
    });
});
