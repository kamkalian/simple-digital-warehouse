import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ColoredBadge from './ColoredBadge';


class ProductItem extends React.Component{

    render(){
        return(
            <ColoredBadge 
                className='main-badge'
                count={this.props.product_count}
                >
            <Card style={{flex:1, width:'100%'}}>
                <CardContent style={{padding:'30px'}}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {this.props.product_name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {this.props.product_barcode}
                    </Typography>
                </CardContent>
            </Card>
            </ColoredBadge>
        );
    }

}

export default ProductItem;