"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var TableCell_1 = __importDefault(require("@mui/material/TableCell"));
var TableRow_1 = __importDefault(require("@mui/material/TableRow"));
var Button_1 = __importDefault(require("@mui/material/Button"));
var Dialog_1 = __importDefault(require("@mui/material/Dialog"));
var DialogActions_1 = __importDefault(require("@mui/material/DialogActions"));
var DialogContent_1 = __importDefault(require("@mui/material/DialogContent"));
var DialogTitle_1 = __importDefault(require("@mui/material/DialogTitle"));
var DeleteOutlined_1 = __importDefault(require("@mui/icons-material/DeleteOutlined"));
var EditOutlined_1 = __importDefault(require("@mui/icons-material/EditOutlined"));
var SaveOutlined_1 = __importDefault(require("@mui/icons-material/SaveOutlined"));
var MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
var Box_1 = __importDefault(require("@mui/material/Box"));
var FormControl_1 = __importDefault(require("@mui/material/FormControl"));
var Select_1 = __importDefault(require("@mui/material/Select"));
var TextField_1 = __importDefault(require("@mui/material/TextField"));
var style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};
var TableRowCustom = function (_a) {
    var columns = _a.columns, row = _a.row, handleDeleteItem = _a.handleDeleteItem;
    var _b = react_1["default"].useState(false), open = _b[0], setOpen = _b[1];
    var _c = react_1["default"].useState(false), isEdit = _c[0], setEdit = _c[1];
    var _d = react_1["default"].useState({
        position: '',
        type: '',
        currency: '',
        fiat: '',
        amount: ''
    }), values = _d[0], setValue = _d[1];
    var handleOpen = function () { return setOpen(true); };
    var handleClose = function () { return setOpen(false); };
    var handleChange = function (_a) {
        var target = _a.target;
        setValue(function (val) {
            var _a;
            return (__assign(__assign({}, val), (_a = {}, _a[target.name] = target.value, _a)));
        });
    };
    var renderEditor = function (type, val) {
        var value = values[type] || val;
        switch (type) {
            case 'position':
                return (react_1["default"].createElement(TextField_1["default"], { size: 'small', value: value, onChange: handleChange, variant: "outlined", name: 'position', label: '\u041F\u043E\u0437\u0438\u0446\u0438\u044F', disabled: !isEdit }));
            case 'type':
                return (react_1["default"].createElement(FormControl_1["default"], { fullWidth: true, disabled: !isEdit },
                    react_1["default"].createElement(Select_1["default"], { size: 'small', value: value, onChange: handleChange, name: 'type' },
                        react_1["default"].createElement(MenuItem_1["default"], { value: 'BUY' }, "\u041F\u043E\u043A\u0443\u043F\u043A\u0430"),
                        react_1["default"].createElement(MenuItem_1["default"], { value: 'SELL' }, "\u041F\u0440\u043E\u0434\u0430\u0436\u0430"))));
            case 'currency':
                return (react_1["default"].createElement(FormControl_1["default"], { fullWidth: true, disabled: !isEdit },
                    react_1["default"].createElement(Select_1["default"], { labelId: "currency-label", id: "currency-select", size: 'small', value: value, onChange: handleChange, name: 'currency' },
                        react_1["default"].createElement(MenuItem_1["default"], { value: 'USDT' }, "USDT"),
                        react_1["default"].createElement(MenuItem_1["default"], { value: 'BUSD' }, "BUSD"))));
            case 'fiat':
                return (react_1["default"].createElement(FormControl_1["default"], { fullWidth: true, disabled: !isEdit },
                    react_1["default"].createElement(Select_1["default"], { size: 'small', value: value, onChange: handleChange, name: 'fiat' },
                        react_1["default"].createElement(MenuItem_1["default"], { value: 'RUB' }, "RUB"),
                        react_1["default"].createElement(MenuItem_1["default"], { value: 'IDR' }, "IDR"))));
            case 'amount':
                return (react_1["default"].createElement(TextField_1["default"], { id: "outlined-basic", size: 'small', value: value, onChange: handleChange, variant: "outlined", name: 'amount', label: '\u0421\u0443\u043C\u043C\u0430', disabled: !isEdit }));
            default:
                return react_1["default"].createElement("div", null, "123");
        }
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(Dialog_1["default"], { open: open, onClose: handleClose, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" },
            react_1["default"].createElement(DialogTitle_1["default"], { id: "alert-dialog-title", fontSize: 18 }, "Удалить трекер цены?"),
            react_1["default"].createElement(DialogContent_1["default"], null),
            react_1["default"].createElement(DialogActions_1["default"], null,
                react_1["default"].createElement(Button_1["default"], { onClick: handleClose, size: 'small', sx: { marginRight: '16px' } }, "\u041E\u0442\u043C\u0435\u043D\u0430"),
                react_1["default"].createElement(Button_1["default"], { onClick: function () {
                        handleDeleteItem(row.id);
                        handleClose();
                    }, size: 'small', autoFocus: true, variant: "contained" }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C"))),
        react_1["default"].createElement(TableRow_1["default"], { hover: true, role: "checkbox", tabIndex: -1 },
            columns.map(function (column) {
                var value = row[column.id];
                return (react_1["default"].createElement(TableCell_1["default"], { key: column.id, align: column.align }, renderEditor(column.id, value)));
            }),
            react_1["default"].createElement(TableCell_1["default"], { align: 'center' },
                react_1["default"].createElement(Box_1["default"], { sx: { '& > :not(style)': { m: 0.5 }, display: 'flex' } },
                    isEdit ? (react_1["default"].createElement(SaveOutlined_1["default"], { fontSize: "small", onClick: function () { return setEdit(false); } })) : react_1["default"].createElement(EditOutlined_1["default"], { fontSize: "small", onClick: function () { return setEdit(true); } }),
                    react_1["default"].createElement(DeleteOutlined_1["default"], { fontSize: "small", onClick: handleOpen }))))));
};
exports["default"] = TableRowCustom;
