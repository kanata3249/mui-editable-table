"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _TextField = _interopRequireDefault(require("@material-ui/core//TextField"));

var _Select = _interopRequireDefault(require("@material-ui/core//Select"));

var _Switch = _interopRequireDefault(require("@material-ui/core//Switch"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _Add = _interopRequireDefault(require("@material-ui/icons/Add"));

var _Clear = _interopRequireDefault(require("@material-ui/icons/Clear"));

var _ArrowDropUp = _interopRequireDefault(require("@material-ui/icons/ArrowDropUp"));

var _ArrowDropDown = _interopRequireDefault(require("@material-ui/icons/ArrowDropDown"));

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MuiEditableTable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MuiEditableTable, _React$Component);

  function MuiEditableTable(props) {
    var _this;

    _classCallCheck(this, MuiEditableTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MuiEditableTable).call(this, props));
    _this.state = {
      containerStyle: _this.props.containerStyle || {},
      rowData: [],
      colSpec: [],
      reorderable: false,
      onChange: function onChange() {}
    };
    _this.onFieldChange = _this.onFieldChange.bind(_assertThisInitialized(_this));
    _this.onAddRow = _this.onAddRow.bind(_assertThisInitialized(_this));
    _this.onDeleteRow = _this.onDeleteRow.bind(_assertThisInitialized(_this));
    _this.onReorderRow = _this.onReorderRow.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MuiEditableTable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        rowData: _jquery["default"].extend(true, [], this.props.rowData),
        colSpec: this.props.colSpec,
        reorderable: this.props.reorderable || false,
        onChange: this.props.onChange
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var editableTableStyle = {
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "Roboto, sans-serif"
      };
      return _react["default"].createElement("div", {
        className: "container",
        style: this.state.containerStyle
      }, _react["default"].createElement("div", {
        className: "mui-editable-table",
        style: editableTableStyle
      }, this.renderHeader(), this.state.rowData.map(function (dataRow, i) {
        return _this2.renderRow(dataRow, i);
      }), _react["default"].createElement("input", {
        type: "hidden",
        id: "mui-editable-table-count",
        value: this.state.rowData.length,
        readOnly: "readOnly"
      })));
    }
  }, {
    key: "renderHeader",
    value: function renderHeader() {
      var headerRowStyle = {
        width: "100%",
        display: "flex",
        flexFlow: "row nowrap",
        border: "0",
        height: "40px",
        color: "rgb(158, 158, 158)",
        fontSize: "12px",
        borderBottom: "1px solid #ccc",
        paddingTop: "10px"
      };
      return _react["default"].createElement("div", {
        className: "mui-editable-table-row header-row",
        style: headerRowStyle
      }, this.state.colSpec.map(function (col) {
        return _react["default"].createElement("div", {
          className: "row-cell header-cell " + col.fieldName,
          key: col.fieldName,
          style: {
            width: col.width
          }
        }, col.title);
      }), _react["default"].createElement("div", {
        className: "row-cell header-cell action",
        style: {
          width: "100px"
        }
      }, this.iconButton('', 'add', this.onAddRow(), _react["default"].createElement(_Add["default"], null))));
    }
  }, {
    key: "renderRow",
    value: function renderRow(dataRow, index) {
      var _this3 = this;

      var dataRowStyle = {
        width: "100%",
        display: "flex",
        flexFlow: "row nowrap",
        border: "0",
        height: "40px",
        borderBottom: "1px solid rgb(224, 224, 224)"
      };
      return _react["default"].createElement("div", {
        className: "mui-editable-table-row",
        key: index,
        style: dataRowStyle
      }, this.state.colSpec.map(function (col) {
        return _react["default"].createElement("div", {
          className: "cell " + col.fieldName,
          key: col.fieldName + index,
          style: {
            width: col.width
          }
        }, _this3.renderInputField(col, index, dataRow));
      }), this.renderRowButtons(index));
    }
  }, {
    key: "renderInputField",
    value: function renderInputField(column, index, rowData) {
      var _this4 = this;

      if (column.isReadOnly && column.isReadOnly(rowData)) {
        return _react["default"].createElement("div", {
          style: {
            width: column.width
          }
        });
      }

      if (column.inputType === "TextField") {
        return _react["default"].createElement(_TextField["default"], {
          id: column.fieldName + index,
          style: {
            width: column.width
          },
          value: column.fieldName in rowData ? rowData[column.fieldName] : '',
          onChange: this.onFieldChange(index, column.fieldName)
        });
      } else if (column.inputType === "SelectField") {
        return _react["default"].createElement(_Select["default"], {
          id: column.fieldName + index,
          style: {
            width: column.width
          },
          value: column.fieldName in rowData ? rowData[column.fieldName] : '',
          onChange: this.onFieldChange(index, column.fieldName)
        }, column.selectOptions.map(function (option) {
          return _this4.createSelectOption(option);
        }));
      } else if (column.inputType === "Toggle") {
        return _react["default"].createElement(_Switch["default"], {
          id: column.fieldName + index,
          style: {
            width: column.width
          },
          checked: column.fieldName in rowData ? rowData[column.fieldName] : false,
          onChange: this.onSwitchChange(index, column.fieldName)
        });
      }

      throw new Error("Input field type " + column.inputType + " not supported");
    }
  }, {
    key: "createSelectOption",
    value: function createSelectOption(option) {
      var key = option.key ? option.key : option;
      var value = option.value ? option.value : option;
      return _react["default"].createElement(_MenuItem["default"], {
        value: value,
        primaryText: value,
        key: key
      });
    }
  }, {
    key: "renderRowButtons",
    value: function renderRowButtons(index) {
      var buttons = [this.iconButton(index, 'delete', this.onDeleteRow(index), _react["default"].createElement(_Clear["default"], null))];

      if (this.state.reorderable) {
        if (index < this.state.rowData.length - 1 && this.state.rowData.length > 1) {
          buttons.push(this.iconButton(index, 'demote', this.onReorderRow(index, +1), _react["default"].createElement(_ArrowDropDown["default"], null)));
        }

        if (index > 0) {
          buttons.push(this.iconButton(index, 'promote', this.onReorderRow(index, -1), _react["default"].createElement(_ArrowDropUp["default"], null)));
        }
      }

      return _react["default"].createElement("div", {
        className: "cell actions",
        style: {
          width: "100px"
        }
      }, buttons);
    }
  }, {
    key: "iconButton",
    value: function iconButton(rowKey, action, clickEvent, muiIcon) {
      return _react["default"].createElement("div", {
        className: "cell action",
        key: "action" + action + rowKey,
        style: {
          width: "45px",
          display: "inline"
        }
      }, _react["default"].createElement(_Button["default"], {
        className: "action-button " + action + "-row-button" + rowKey,
        onClick: clickEvent,
        style: {
          minWidth: "45px"
        }
      }, muiIcon));
    }
  }, {
    key: "onAddRow",
    value: function onAddRow() {
      var self = this;
      return function () {
        var tempDataRow = _jquery["default"].extend(true, [], self.state.rowData);

        var newRow = {};
        self.state.colSpec.map(function (column) {
          return newRow[column.fieldName] = column.defaultValue || '';
        });
        tempDataRow.push(newRow);
        self.setState({
          rowData: tempDataRow
        });
        self.state.onChange(tempDataRow);
      };
    }
  }, {
    key: "onDeleteRow",
    value: function onDeleteRow(rowId) {
      var self = this;
      return function () {
        var tempDataRow = _jquery["default"].extend(true, [], self.state.rowData);

        tempDataRow.splice(rowId, 1);
        self.setState({
          rowData: tempDataRow
        });
        self.state.onChange(tempDataRow);
      };
    }
  }, {
    key: "onReorderRow",
    value: function onReorderRow(rowId, direction) {
      var self = this;
      return function () {
        var tempDataRow = _jquery["default"].extend(true, [], self.state.rowData);

        var oldIndex = rowId;
        var newIndex = rowId + direction;
        tempDataRow.splice(newIndex, 0, tempDataRow.splice(oldIndex, 1)[0]);
        self.setState({
          rowData: tempDataRow
        });
        self.state.onChange(tempDataRow);
      };
    }
  }, {
    key: "onFieldChange",
    value: function onFieldChange(rowId, fieldName) {
      var _this5 = this;

      return function (event) {
        var newValue = event.target.value;

        var tempDataRow = _jquery["default"].extend(true, [], _this5.state.rowData);

        tempDataRow[rowId][fieldName] = newValue;

        _this5.setState({
          rowData: tempDataRow
        });

        _this5.state.onChange(tempDataRow);
      };
    }
  }, {
    key: "onSwitchChange",
    value: function onSwitchChange(rowId, fieldName) {
      var _this6 = this;

      return function (event) {
        var newValue = event.target.checked;

        var tempDataRow = _jquery["default"].extend(true, [], _this6.state.rowData);

        tempDataRow[rowId][fieldName] = newValue;

        _this6.setState({
          rowData: tempDataRow
        });

        _this6.state.onChange(tempDataRow);
      };
    }
  }]);

  return MuiEditableTable;
}(_react["default"].Component);

var _default = MuiEditableTable;
exports["default"] = _default;