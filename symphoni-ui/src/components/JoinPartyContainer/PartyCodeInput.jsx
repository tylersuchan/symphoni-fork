import React, {Component} from 'react';
import UserInput from './UserInput';

class PartyCodeInput extends Component {
    constructor(props){
        super(props);
        this.state={
            enterCode : Array(6),
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
                <UserInput idx='0'  onChange={this.arrayHandler} />
                <UserInput idx='1'  onChange={this.arrayHandler} />
                <UserInput idx='2'  onChange={this.arrayHandler} />
                <UserInput idx='3'  onChange={this.arrayHandler} />
                <UserInput idx='4'  onChange={this.arrayHandler} />
                <UserInput idx='5'  onChange={this.arrayHandler} />
                <a className="waves-effect waves-light btn-small"><i className="material-icons">arrow_drop_down</i></a>
            </div>
        );
    }

}

export default PartyCodeInput;