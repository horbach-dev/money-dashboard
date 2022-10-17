"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var React = __importStar(require("react"));
var Paper_1 = __importDefault(require("@mui/material/Paper"));
var Table_1 = __importDefault(require("@mui/material/Table"));
var TableBody_1 = __importDefault(require("@mui/material/TableBody"));
var TableContainer_1 = __importDefault(require("@mui/material/TableContainer"));
var TableRow_1 = __importDefault(require("./components/TableRow"));
require("./CurrenciesTable.css");
var react_1 = require("react");
var columns = [
    { id: 'position', label: 'Позиция', minWidth: 50 },
    { id: 'type', label: 'Cделка', minWidth: 125 },
    { id: 'currency', label: 'Крипта', minWidth: 100 },
    { id: 'fiat', label: 'Фиат', minWidth: 100 },
    { id: 'amount', label: 'Сумма', minWidth: 150, align: 'right' },
];
function createData(id, position, type, currency, fiat, amount) {
    return { id: id, position: position, type: type, currency: currency, fiat: fiat, amount: amount };
}
var rows = [
    createData('1', 'A6', 'BUY', 'USDT', 'RUB', 100000),
    createData('2', 'D6', 'BUY', 'USDT', 'IDR', 10000000),
];
function CurrenciesTable() {
    var _a = React.useState([]), list = _a[0], setList = _a[1];
    react_1.useEffect(function () {
        setList(rows);
    }, []);
    var handleDeleteItem = function (id) {
        setList(function (list) { return list.filter(function (i) { return i.id !== id; }); });
    };
    return (React.createElement("div", { className: 'currencies-table' },
        React.createElement("h3", null, list.length ? 'Активные ячейки' : 'Нет активных трекеров цены'),
        React.createElement(Paper_1["default"], { sx: { width: '100%', overflow: 'hidden' } }, list.length ? (React.createElement(TableContainer_1["default"], { sx: { maxHeight: 440 } },
            React.createElement(Table_1["default"], { stickyHeader: true, "aria-label": "sticky table" },
                React.createElement(TableBody_1["default"], null, list.map(function (row, index) {
                    return (React.createElement(TableRow_1["default"], { key: index, row: row, columns: columns, handleDeleteItem: handleDeleteItem }));
                }))))) : null)));
}
exports["default"] = CurrenciesTable;
