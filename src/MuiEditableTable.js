import React from "react";
import IconButton from "@material-ui/core/Button";
import TextField from "@material-ui/core//TextField";
import SelectField from "@material-ui/core//Select";
import Switch from "@material-ui/core//Switch";
import MenuItem from "@material-ui/core/MenuItem";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Clear';
import PromoteIcon from '@material-ui/icons/ArrowDropUp';
import DemoteIcon from '@material-ui/icons/ArrowDropDown';
import $ from "jquery";

class MuiEditableTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            containerStyle: this.props.containerStyle || {},
            rowData: [],
            colSpec: [],
            reorderable: false,
            onChange: function () {
            }
        };

        this.onFieldChange = this.onFieldChange.bind(this);
        this.onAddRow = this.onAddRow.bind(this);
        this.onDeleteRow = this.onDeleteRow.bind(this);
        this.onReorderRow = this.onReorderRow.bind(this);
    }

    componentDidMount() {
        this.setState(
            {
                rowData: $.extend(true, [], this.props.rowData),
                colSpec: this.props.colSpec,
                reorderable: this.props.reorderable || false,
                onChange: this.props.onChange
            }
        );
    }

    render() {
        const editableTableStyle = {
            display: "flex",
            flexFlow: "column nowrap",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Roboto, sans-serif",
        };
        const editableTableRowsStyle = {
            display: "flex",
            flexFlow: "column nowrap",
            justifyContent: "flex-start",
            alignItems: "center",
            fontFamily: "Roboto, sans-serif",
            width: '100%'
        };

        return (
            <div className="container" style={this.state.containerStyle}>
                <div className="mui-editable-table" style={editableTableStyle}>
                    {this.renderHeader()}

                    <div className="mui-editable-table-rows" style={editableTableRowsStyle}>
                        {this.state.rowData.map((dataRow, i) => (
                            this.renderRow(dataRow, i)
                        ))}
                        <input
                            type="hidden"
                            id="mui-editable-table-count"
                            value={this.state.rowData.length}
                            readOnly="readOnly"
                        />
                    </div>
                </div>
            </div>
        )
    }

    renderHeader() {
        const headerRowStyle = {
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

        return (
            <div className="mui-editable-table-row header-row" style={headerRowStyle}>
                {this.state.colSpec.map((col) => (
                    <div
                        className={"row-cell header-cell " + col.fieldName}
                        key={col.fieldName}
                        style={{width: col.width}}
                    >
                        {col.title}
                    </div>
                ))}
                <div className={"row-cell header-cell actions"} style={{width: "100px"}}>
                    {this.iconButton('', 'add', this.onAddRow(), <AddIcon />)}
                </div>
            </div>
        )
    }

    renderRow(dataRow, index) {
        const dataRowStyle = {
            width: "100%",
            display: "flex",
            flexFlow: "row nowrap",
            border: "0",
            height: "40px",
            borderBottom: "1px solid rgb(224, 224, 224)"
        };

        return (
            <div className="mui-editable-table-row" key={index} style={dataRowStyle}>
                {this.state.colSpec.map((col) => (
                    <div
                        className={"cell " + col.fieldName}
                        key={col.fieldName + index}
                        style={{width: col.width}}
                    >
                        {this.renderInputField(col, index, dataRow)}
                    </div>
                ))}
                {this.renderRowButtons(index)}
            </div>
        )
    }

    renderInputField(column, index, rowData) {
        if (column.isReadOnly && column.isReadOnly(rowData)){
            return (<div style={{width: "100%"}}></div>)
        }

        if (column.inputType === "TextField") {
            return (
                <TextField
                    id={column.fieldName + index}
                    style={{width: "100%"}}
                    value={column.fieldName in rowData ? rowData[column.fieldName] : ''}
                    onChange={this.onFieldChange(index, column.fieldName)}
                />
            )
        } else if (column.inputType === "SelectField") {
            return (
                <SelectField
                    id={column.fieldName + index}
                    style={{width: "100%"}}
                    value={column.fieldName in rowData ? rowData[column.fieldName] : ''}
                    onChange={this.onFieldChange(index, column.fieldName)}
                >
                    {column.selectOptions.map((option) => (
                        this.createSelectOption(option)
                    ))}
                </SelectField>
            )
        } else if (column.inputType === "Toggle") {
            return (
                <Switch
                    id={column.fieldName + index}
                    style={{width: "100%"}}
                    checked={column.fieldName in rowData ? rowData[column.fieldName] : false}
                    onChange={this.onSwitchChange(index, column.fieldName)}
                />
            )
        }
        throw new Error("Input field type " + column.inputType + " not supported");
    }

    createSelectOption(option) {
        const key = option.key ? option.key : option;
        const value = option.value ? option.value : option;

        return (<MenuItem value={value} primaryText={value} key={key}/>);
    }

    renderRowButtons(index) {
        let buttons = [
            this.iconButton(index, 'delete', this.onDeleteRow(index), <DeleteIcon />)
        ];

        if (this.state.reorderable) {
            if (index < (this.state.rowData.length - 1) && this.state.rowData.length > 1) {
                buttons.push(
                    this.iconButton(index, 'demote', this.onReorderRow(index, +1), <DemoteIcon  />)
                )
            }
            if (index > 0) {
                buttons.push(
                    this.iconButton(index, 'promote', this.onReorderRow(index, -1), <PromoteIcon/>)
                )
            }
        }

        return (
            <div className={"cell actions"} style={{width: "100px"}}>
                {buttons}
            </div>
        )
    }

    iconButton(rowKey, action, clickEvent, muiIcon) {
        return (
            <div className="cell action" key={"action" + action + rowKey} style={{width: "45px", display: "inline"}}>

                <IconButton
                    className={"action-button " + action + "-row-button" + rowKey}
                    onClick={clickEvent}
                    style={{minWidth: "45px"}}>
                    {muiIcon}
                </IconButton>
            </div>
        )
    }

    onAddRow() {
        const self = this;
        return function () {
            let tempDataRow = $.extend(true, [], self.state.rowData);

            let newRow = {};
            self.state.colSpec.map((column) => (
                newRow[column.fieldName] = column.defaultValue || ''
            ));

            tempDataRow.push(newRow);

            self.setState({rowData: tempDataRow});
            self.state.onChange(tempDataRow)
        }
    }

    onDeleteRow(rowId) {
        const self = this;
        return function () {
            let tempDataRow = $.extend(true, [], self.state.rowData);

            tempDataRow.splice(rowId, 1);

            self.setState({rowData: tempDataRow});
            self.state.onChange(tempDataRow)
        }
    }

    onReorderRow(rowId, direction) {
        const self = this;
        return function () {
            let tempDataRow = $.extend(true, [], self.state.rowData);

            let oldIndex = rowId;
            let newIndex = rowId + direction;

            tempDataRow.splice(newIndex, 0, tempDataRow.splice(oldIndex, 1)[0]);

            self.setState({rowData: tempDataRow});
            self.state.onChange(tempDataRow)
        }
    }

    onFieldChange(rowId, fieldName) {
        return (event) => {
            const newValue = event.target.value;
            let tempDataRow = $.extend(true, [], this.state.rowData);

            tempDataRow[rowId][fieldName] = newValue;

            this.setState({rowData: tempDataRow});
            this.state.onChange(tempDataRow)
        }
    }

    onSwitchChange(rowId, fieldName) {
        return (event) => {
            const newValue = event.target.checked;
            let tempDataRow = $.extend(true, [], this.state.rowData);

            tempDataRow[rowId][fieldName] = newValue;

            this.setState({rowData: tempDataRow});
            this.state.onChange(tempDataRow)
        }
    }
}

export default MuiEditableTable;
