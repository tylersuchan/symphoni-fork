import React, {Component} from 'react';
import UserInput from './UserInput';
import config from '../../config';
class PartyCodeInput extends Component {
    constructor(props){
        super(props);
        this.state={
            enterCode : Array(6),
        }
        
    }
    
    checkCode = (event) => {
        event.preventDefault();
        const partyURI = `${config.url}party/${this.state.enterCode}`;
        fetch(partyURI, {
            method: 'GET',
        }).then(response => response.json().then((data)=>{
            const {partyCode} = this.props;
            if(data.code && data.code === this.state.enterCode){
                console.log("YAY");
            }
        }));
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
                <UserInput idx='0'  onChange={this.arrayHandler} onKeyPress={this.checkCode} />
                <UserInput idx='1'  onChange={this.arrayHandler} onKeyPress={this.checkCode} />
                <UserInput idx='2'  onChange={this.arrayHandler} onKeyPress={this.checkCode} />
                <UserInput idx='3'  onChange={this.arrayHandler} onKeyPress={this.checkCode} />
                <UserInput idx='4'  onChange={this.arrayHandler} onKeyPress={this.checkCode} />
                <UserInput idx='5'  onChange={this.arrayHandler} onKeyPress={this.checkCode} />
                <a className="waves-effect waves-light btn-small" onClick={this.checkCode}><i className="material-icons">arrow_drop_down</i></a>
            </div>
        );
    }

}

export default PartyCodeInput;