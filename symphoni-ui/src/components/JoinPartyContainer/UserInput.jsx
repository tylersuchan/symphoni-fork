import React, { Component } from 'react';
import './JoinPartyContainer.css';

class UserInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value : "_"
        };
    }
   
    handleInput = (event) => {
        const {value} = event.target;
        this.props.onChange(this.props.idx,event);
        if(value.length ===1 || value.length===0){
            if(this.myTextInput.nextSibling){
                this.myTextInput.nextSibling.focus();    
            }
        }  
    }

    handlePress = (event) =>{
        // BACKSPACE EVENT- Deletes value(Sets its value back to), then moves focus backward and
        if(event.key === "Backspace"){
            event.preventDefault();
            this.myTextInput.value= "";
            if(this.myTextInput.previousSibling){
                this.myTextInput.previousSibling.focus(); 
            }
        }

        //Left arrow key does the same thing as backspace without deletion
        if(event.key === "ArrowLeft"){
            
            if(this.myTextInput.previousSibling){
                event.preventDefault();
                this.myTextInput.previousSibling.focus();  
            }
        }

        //Right arrow key just traverses right on the values
        if(event.key === "ArrowRight"){
            if(this.myTextInput.nextSibling){
                this.myTextInput.nextSibling.focus(); 
            }
        }
    }


    render() { 
        return (  
            <input 
                ref={(input) =>{ this.myTextInput = input;  }}
                onChange = {this.handleInput}
                onKeyDown = {this.handlePress}
                placeholder = "_"
                maxLength="1"
            /> 

        );
    }
}
export default UserInput;