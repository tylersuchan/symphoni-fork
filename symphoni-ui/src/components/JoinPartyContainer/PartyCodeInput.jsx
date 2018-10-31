import React, {Component} from 'react';
import UserInput from './UserInput';
import config from '../../config';
class PartyCodeInput extends Component {
    constructor(props){
        super(props);
        this.state={
            userCode : Array(6),
            codeFound : null,
        }
    }
    
    checkCode= (event) => {
        event.preventDefault();
        const {userCode} = this.state;
        //localhost::5000/party/"ARRAY"
        console.log(userCode);
        const partyURI = `http://127.0.0.1:5000/party/${userCode.join("")}`;
        console.log(partyURI);
        fetch(partyURI, {
            method: 'GET',
        }).then(response => response.json().then((data)=>{
            const {setPartyCode, setPartyName} = this.props;
            if(data.code){
                setPartyCode(data.code);
                setPartyName(data.party_data.name);
                this.props.changeFoundStatus(true);
                
            }
            else{
                this.props.changeFoundStatus(false);
                this.setState({userCode:[],
                               codeFound: false});
                
            }
        }));
    }

    arrayHandler = (i, event) => {
        const inputVals = this.state.userCode.slice();
        inputVals[i] = event.target.value;
        this.setState({userCode: inputVals}, () => {
            console.log(this.state.userCode);
        });
    }


    render(){
        return (
            <div>
                <UserInput idx='0' onChange={this.arrayHandler} onKeyPress={this.checkCode}/>
                <UserInput idx='1' onChange={this.arrayHandler} onKeyPress={this.checkCode}/>
                <UserInput idx='2' onChange={this.arrayHandler} onKeyPress={this.checkCode}/>
                <UserInput idx='3' onChange={this.arrayHandler} onKeyPress={this.checkCode}/>
                <UserInput idx='4' onChange={this.arrayHandler} onKeyPress={this.checkCode}/>
                <UserInput idx='5' onChange={this.arrayHandler} onKeyPress={this.checkCode}/>
                {/* <a className="waves-effect waves-light btn-small" onClick = {this.clearInput}>CLEAR</a><br></br> */}
                <a className="waves-effect waves-light btn-small" onClick={this.checkCode}><i className="material-icons">arrow_drop_down</i></a>
                
            </div>
        );
    }

}

export default PartyCodeInput;