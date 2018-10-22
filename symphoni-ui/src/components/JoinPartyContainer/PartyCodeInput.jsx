import React, {Component} from 'react';
import UserInput from './UserInput';
import config from '../../config';
class PartyCodeInput extends Component {
    constructor(props){
        super(props);
        this.state={
            userCode : Array(6),
        }
        
    }
    
    checkCode = (event) => {
        event.preventDefault();
        const {userCode} = this.state;
        //localhost::5000/party/"ARRAY"
        const partyURI = `http://127.0.0.1:5000/party/${userCode.join("")}`;
        fetch(partyURI, {
            method: 'GET',
        }).then(response => response.json().then((data)=>{
            const {setPartyCode} = this.props;
            if(data.code){
                this.props.changeFoundStatus(true);
            }
            else{
                this.props.changeFoundStatus(false);
            }
        }));
    }

    arrayHandler = (i, event) => {
        event.preventDefault();
        const inputVals = this.state.userCode.splice();
        inputVals[i] = event.target.value;
        console.log(inputVals)
        this.setState({userCode: inputVals});
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