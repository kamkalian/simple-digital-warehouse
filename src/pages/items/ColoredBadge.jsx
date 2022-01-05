import React from 'react';
import Badge from '@material-ui/core/Badge';


export default class ColoredBadge extends React.Component{
    render(){
        let color = this.props.count<2 ? 'red': this.props.count<3 ? 'orange' : 'green';

        return(
            <Badge
                classes={{badge:'badge-'+color+' '+this.props.className}}
                style={{display:'block'}}
                badgeContent={this.props.count}
                showZero={true}>
                {this.props.children}
            </Badge>
        );
    }
}

