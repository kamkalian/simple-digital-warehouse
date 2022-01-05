import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import ColoredBadge from './ColoredBadge';


export default class ItemList extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            products: []
        };
    }

    apiListCall(){
        fetch('/product_list/', {
            method: 'POST', // or 'PUT'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        products: result
                    });
                },
                (error) => {
                    alert("Ups, die Liste konnte nicht geladen werden.");
                }
                );
    }


    componentDidMount(){
        this.apiListCall();
    }


    render(){
        const products = this.state.products.map((product, index) => (
            <ColoredBadge
                count={product.count}
                className={'list-badge'}
                >
                <ListItem button>
                    <Typography gutterBottom variant="h5" component="h2">
                        {product.product_name}
                    </Typography>
                </ListItem>
            </ColoredBadge>
        ));
        return(
            
            <List component='nav' style={{marginTop:'20px'}}>
                {products}
            </List>
        )
    }
}
