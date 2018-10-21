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
        const inputVals = this.state.enterCode.splice();
        inputVals[i] = event.target.value;
        
        this.setState({enterCode: inputVals});
    }
    
    render(){
        return (
            <div>
                <UserInput idx='0'  value= {this.arrayHandler}/>
                <UserInput idx='1'  value= {this.arrayHandler}/>
                <UserInput idx='2'  value= {this.arrayHandler}/>
                <UserInput idx='3'  value= {this.arrayHandler}/>
                <UserInput idx='4'  value= {this.arrayHandler}/>
                <UserInput idx='5'  value= {this.arrayHandler}/>
            </div>
        );
    }

}

export default PartyCodeInput;