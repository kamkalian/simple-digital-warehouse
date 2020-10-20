import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Badge} from '@material-ui/core';


class ProductItem extends React.Component{

    render(){
        return(
            <Badge 
                badgeContent={this.props.product_count}
                color="primary"
                showZero={true}>
            <Card style={{flex:1, width:100, padding:20}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {this.props.product_name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {this.props.product_barcode}
                    </Typography>
                </CardContent>
            </Card>
            </Badge>
        );
    }

}

export default ProductItem;