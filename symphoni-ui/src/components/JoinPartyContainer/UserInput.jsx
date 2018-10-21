import React, { Component } from 'react';
import './JoinPartyContainer.css';

class UserInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value : null
        };
    }
  
    handleInput = (event) => {
        const {value} = event.target;
        if(value.length ===1 || value.length===0){
            this.setState({value:event.key});
            
            if(this.myTextInput.nextSibling){
                this.myTextInput.nextSibling.focus();
            }
        }  
       
    }
    handlePress = (event) =>{
        const {value} = event.target;
        if(event.key === "Backspace"){
            
            if(this.myTextInput.previousElementSibling){
                if(value.length==="1"){
                    this.myTextInput.value="";
                }
                this.setState({value:''});
                
                this.myTextInput.previousSibling.focus(); 
                
            }
        }
        if(event.key === "ArrowLeft"){
            if(this.myTextInput.previousSibling){
                this.myTextInput.previousSibling.focus(); 
            }
        }
        if(event.key === "Enter" || event.key === "ArrowRight"){
            
            if(this.myTextInput.nextSibling){
                this.myTextInput.nextSibling.focus(); 
            }
        }
    }


    render() { 
        return (  <input ref={(input) =>{
            this.myTextInput = input;
        }}
        onChange = {this.handleInput}
        onKeyDown = {this.handlePress}
        placeholder= "_"
        maxLength="1"/> );
    }
}
export default UserInput;