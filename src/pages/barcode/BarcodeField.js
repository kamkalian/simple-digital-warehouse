import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

export default class BarcodeField extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            barcode: ''
        };
        this.barcodeInput = React.createRef();
        this.handleBarcodeChange = this.handleBarcodeChange.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
    }

    handleBarcodeChange(event){
        // Damit das Textfeld wieder funktioniert :)
        this.setState({
            barcode: event.target.value
        })
    }

    handleOnBlur(event){
        this.setState({
            barcode: ''
        })
    }

    render(){
        return(
            <FormControl fullWidth={true}>
                <TextField
                    id={this.props.inputID}
                    value={this.state.barcode}
                    onChange={this.handleBarcodeChange}
                    onKeyDown={this.props.handleKeyPress}
                    onBlur={this.handleOnBlur}
                    label="Barcode"
                    variant="outlined"
                    inputRef={this.props.barcodeInput}
                    />
            </FormControl>
        );
    }
}
