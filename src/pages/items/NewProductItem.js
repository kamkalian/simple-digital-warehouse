import React from 'react';
import {Card, CardContent} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { Button, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';


class ProductItem extends React.Component{

    render(){

        return(            
            <Card>
                <CardContent>            
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Alert severity='info'>
                                Zum Hinzufügen gib einen Namen für {this.props.product_barcode} ein und klicke anschließend auf Speichern.
                            </Alert>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth={true}>
                                <TextField
                                label="Produkt Name"
                                variant="outlined"
                                value={this.props.new_propuct_name}
                                onChange={this.props.handleNameChange}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={this.props.handleNewProductSaveButton}>
                                    Speichern
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                
                </CardContent>
            </Card>
        );
    }

}

export default ProductItem;