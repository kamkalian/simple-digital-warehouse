import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


class Selector extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            count: 0
        }
    }

    render(){
        const flexContainer = {
            display: 'flex',
            flexDirection: 'row',
          };
        return(
            <FormControl>
                <FormLabel component="legend">Aktion</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" style={flexContainer} onChange={this.props.handleActionClicked}>
                    <FormControlLabel value="in" control={<Radio />} label="Einlagern" />
                    <FormControlLabel value="out" control={<Radio />} label="Auslagern" />
                    <FormControlLabel value="info" control={<Radio />} label="Status" />
                </RadioGroup>
            </FormControl>
        );
    }
}

export default Selector