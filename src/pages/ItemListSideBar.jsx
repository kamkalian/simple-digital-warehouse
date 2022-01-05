import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Container} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ItemList from './items/ItemList';


export default class ItemListSideBar extends React.Component{
    render(){
        return(
            <Container>
                <h1>Produkte im Lager</h1>
                <Button
                    variant="contained"
                    startIcon={<CloseIcon />}
                    onClick={this.props.handleSideBarCloseButtonClick}
                >
                    Close
                </Button>
                <ItemList />
            </Container>
        )
    }
}