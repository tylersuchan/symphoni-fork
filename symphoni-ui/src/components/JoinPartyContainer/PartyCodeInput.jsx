import React, {Component} from 'react';
import UserInput from './UserInput';

class PartyCodeInput extends Component {
    constructor(props){
        super(props);
        this.state={
            enterCode : Array(6),
        }
        
    }
    checkCode = (event) => {
        const val= "HELLO";
        
        if(event.key === "Enter"){
            console.log(val);
        }
        else{
            console.log(val);
        }
    }


    arrayHandler = (i, event) => {
        event.preventDefault();
        const inputVals = this.state.enterCode.splice();
        inputVals[i] = event.target.value;
        console.log(inputVals)
        this.setState({enterCode: inputVals});
    }

    
    render(){
        return (
            <div>
                <UserInput idx='0'  onChange={this.arrayHandler} onKeyPress={this.checkCode}/>
                <UserInput idx='1'  onChange={this.arrayHandler} onKeyPress={this.checkCode}/>
                <UserInput idx='2'  onChange={this.arrayHandler} onKeyPress={this.checkCode}/>
                <UserInput idx='3'  onChange={this.arrayHandler} onKeyPress={this.checkCode}/>
                <UserInput idx='4'  onChange={this.arrayHandler} onKeyPress={this.checkCode}/>
                <UserInput idx='5'  onChange={this.arrayHandler} onKeyPress={this.checkCode}/>
                <a className="waves-effect waves-light btn-small" onClick={this.checkCode}><i className="material-icons">arrow_drop_down</i></a>
            </div>
        );
    }

}

export default PartyCodeInput;