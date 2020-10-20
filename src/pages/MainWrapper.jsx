import React from 'react';
import ProductItem from './items/ProductItem';
import NewProductItem from './items/NewProductItem';
import BarcodeField from './barcode/BarcodeField';
import Selector from './barcode/Selector';
import { Container, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

export default class MainWrapper extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            barcode: '',
            product_barcode: '',
            product_count: 0,
            product_name: '',
            not_found: false,
            scan_done: false,
            actionSelected: false,
            actionName: '',
            new_product_name: '',
            new_product_saved: false
        };
        this.barcodeInput = React.createRef();
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleActionClicked = this.handleActionClicked.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNewProductSaveButton = this.handleNewProductSaveButton.bind(this);
        this.apiCall = this.apiCall.bind(this);
    }

    apiCall(barcode_value){
        fetch('/product_'+this.state.actionName+'/'+barcode_value, {
            method: 'POST', // or 'PUT'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        scan_done: true
                    });
                    if(result.not_found){
                        this.setState({
                            not_found: true,
                            product_barcode: barcode_value
                        });
                    }else{
                        this.setState({
                            product_barcode: result.barcode,
                            product_name: result.product_name,
                            product_count: result.count,
                            not_found: false
                        });
                    }
                },
                (error) => {
                    this.setState({
                        scan_done: false
                    });
                }
                );
    }

    handleKeyPress(event){
        let barcode = event.target;
        if(event.keyCode === 13){
            if(this.state.actionSelected && barcode.value !== ''){
                event.preventDefault();
                this.apiCall(barcode.value);
                setTimeout(() => {
                    barcode.value = '';
                }, 100);
            }
            this.setState({
                new_product_saved: false
            });
        }
        
     }

    handleActionClicked(event){
        setTimeout(() => {
            this.barcodeInput.current.focus();
        }, 100);
        this.setState({
            actionSelected: true,
            actionName: event.target.value,
            scan_done: false
        });
    }

    handleNewProductSaveButton(event){
        const data = { product_name: this.state.new_product_name };
        fetch('/product_new/'+this.state.product_barcode, {
            method: 'POST', // or 'PUT'
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        new_product_saved: true
                    });                    
                },
                (error) => {
                    this.setState({
                        scan_done: false
                    });
                }
            );
            
        this.apiCall(this.state.product_barcode);
        setTimeout(() => {
            this.barcodeInput.current.focus();
        }, 1000);
    }

    handleNameChange(event){
        this.setState({
            new_product_name: event.target.value
        })
    }

    render(){
        const styles = {
            marginTop:'50px',
            maxWidth: '940px'
        };

        const alertStyles = {
            fontWeight: 'bold'
        }

        // Alert Message ermitteln.
        let alertMessage = '';
        let alertSeverity = '';
        if(!this.state.actionSelected){
            alertMessage = 'Wähle eine Aktion aus!';
            alertSeverity = 'error';
        }else{
            if(this.state.new_product_saved){
                alertMessage = 'Produkt geespeichert :)';
                alertSeverity = 'success';
            }else{
                if(this.state.scan_done){
                    if(this.state.not_found){
                        alertMessage = 'Produkt nicht gefunden :(';
                        alertSeverity = 'warning';
                    }else{
                        alertSeverity = 'success';
                        if(this.state.actionName === 'in') alertMessage = 'Anzahl wurde um 1 erhöht.';
                        if(this.state.actionName === 'out') alertMessage = 'Anzahl wurde um 1 verringert.';
                        if(this.state.actionName === 'info') alertMessage = 'Produkt gefunden :)';
                    }
                }else{
                    alertMessage = 'Scanne ein Produkt...';
                    alertSeverity = 'info';
                }
            }
        }

        let productItem = (
            <ProductItem 
                product_barcode={this.state.product_barcode}
                product_name={this.state.product_name} 
                product_count={this.state.product_count}
                not_found={this.state.not_found}
                scan_done={this.state.scan_done}/>
        );

        if(this.state.scan_done && this.state.actionSelected){
            if(this.state.not_found) productItem = (
                <NewProductItem 
                    product_barcode={this.state.product_barcode}
                    new_product_name={this.state.new_product_name}
                    handleNameChange={this.handleNameChange}
                    handleNewProductSaveButton={this.handleNewProductSaveButton}/>
                
            );
        }else productItem = null;

        return(
            <Container style={styles}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <Selector
                        handleActionClicked={this.handleActionClicked} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <BarcodeField
                        handleKeyPress={this.handleKeyPress}
                        barcodeInput={this.barcodeInput}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <Alert severity={alertSeverity} variant="filled" style={alertStyles}>
                        {alertMessage}
                    </Alert>
                    </Grid>
                    <Grid item xs={12}>
                        {productItem}
                    </Grid>
                </Grid>      
            </Container>
        );
    }
}