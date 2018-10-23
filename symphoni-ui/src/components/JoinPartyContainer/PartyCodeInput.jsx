import React, {Fragment, Component} from 'react';
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
        console.log(userCode);
        const partyURI = `http://127.0.0.1:5000/party/${userCode.join("")}`;
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
            }
        }));
    }

    arrayHandler = (i, event) => {
        // event.preventDefault();
        const inputVals = this.state.userCode.slice();
        inputVals[i] = event.target.value;
        console.log(inputVals);
        this.setState({userCode: inputVals}, () => {
            console.log(this.state.userCode);
        });
    }

    
    render(){

        const arrayVals = this.state.userCode.map(val => {
            console.log(val);
            <div>val</div>
        })
        return (
            <Fragment>
                {console.log(this.state.userCode)}
                {arrayVals}
            <div>
                <UserInput idx='0'  onChange={this.arrayHandler} onKeyPress={this.checkCode} />
                <UserInput idx='1'  onChange={this.arrayHandler} onKeyPress={this.checkCode} />
                <UserInput idx='2'  onChange={this.arrayHandler} onKeyPress={this.checkCode} />
                <UserInput idx='3'  onChange={this.arrayHandler} onKeyPress={this.checkCode} />
                <UserInput idx='4'  onChange={this.arrayHandler} onKeyPress={this.checkCode} />
                <UserInput idx='5'  onChange={this.arrayHandler} onKeyPress={this.checkCode} />
                <a className="waves-effect waves-light btn-small" onClick={this.checkCode}><i className="material-icons">arrow_drop_down</i></a>
            </div>
            </Fragment>
 
        );
    }

}

export default PartyCodeInput;