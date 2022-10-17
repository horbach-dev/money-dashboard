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
        while (_) try {
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
exports.__esModule = true;
var google_spreadsheet_1 = require("google-spreadsheet");
var moneydashboard_creds_json_1 = __importDefault(require("./moneydashboard-creds.json"));
var binance_1 = require("./binance");
var tableId = '17qfGGGHeZ4WgCu6kMvf-cqFCM3vWqWI7aM4D6d3myjc';
function bootstrap() {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var data, data2, priceRUB, priceIDR, spreadsheetInstance, sheet, cellRUB, cellIDR, e_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, binance_1.getP2PPrice({
                        type: 'BUY',
                        asset: 'USDT',
                        fiat: 'RUB',
                        payTypes: ['TinkoffNew'],
                        amount: 100000
                    })];
                case 1:
                    data = (_e.sent()).data;
                    return [4 /*yield*/, binance_1.getP2PPrice({
                            type: 'BUY',
                            asset: 'USDT',
                            fiat: 'IDR',
                            amount: 10000000
                        })];
                case 2:
                    data2 = (_e.sent()).data;
                    priceRUB = (_b = (_a = data === null || data === void 0 ? void 0 : data[0]) === null || _a === void 0 ? void 0 : _a.adv) === null || _b === void 0 ? void 0 : _b.price;
                    priceIDR = (_d = (_c = data2 === null || data2 === void 0 ? void 0 : data2[0]) === null || _c === void 0 ? void 0 : _c.adv) === null || _d === void 0 ? void 0 : _d.price;
                    _e.label = 3;
                case 3:
                    _e.trys.push([3, 9, , 10]);
                    spreadsheetInstance = new google_spreadsheet_1.GoogleSpreadsheet(tableId);
                    return [4 /*yield*/, spreadsheetInstance.useServiceAccountAuth(moneydashboard_creds_json_1["default"])];
                case 4:
                    _e.sent();
                    return [4 /*yield*/, spreadsheetInstance.loadInfo()];
                case 5:
                    _e.sent();
                    return [4 /*yield*/, spreadsheetInstance.sheetsByIndex[0]
                        // select cells scope
                    ];
                case 6:
                    sheet = _e.sent();
                    // select cells scope
                    return [4 /*yield*/, sheet.loadCells('A1:E20')];
                case 7:
                    // select cells scope
                    _e.sent();
                    cellRUB = sheet.getCellByA1('A6');
                    cellIDR = sheet.getCellByA1('D6');
                    cellRUB.value = priceRUB && Number(priceRUB) || 'none';
                    cellIDR.value = priceIDR && Number(priceIDR) || 'none';
                    return [4 /*yield*/, sheet.saveUpdatedCells()];
                case 8:
                    _e.sent();
                    return [3 /*break*/, 10];
                case 9:
                    e_1 = _e.sent();
                    console.log('error', e_1);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports["default"] = bootstrap;
