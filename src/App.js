"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var CurrenciesTable_1 = __importDefault(require("./components/__layouts/components/CurrenciesTable/CurrenciesTable"));
require("./styles/app.css");
var App = function () {
    return (react_1["default"].createElement("div", { className: "application" },
        react_1["default"].createElement(CurrenciesTable_1["default"], null)));
};
exports["default"] = App;
