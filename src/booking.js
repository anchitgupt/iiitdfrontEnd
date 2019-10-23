import React from 'react';

class Booking extends React.Component{
    constructor(props){
        super(props);
        this.name = props.name;
    }

    render(){
        return(
          <div class="list-group">
            <h4 class="list-group-item-heading">{this.name}</h4>
          </div>
        )  
    }

}

export default Booking;