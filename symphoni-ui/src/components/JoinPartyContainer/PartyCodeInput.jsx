import React, {Component} from 'react';
import UserInput from './UserInput';

class PartyCodeInput extends Component {
    constructor(props){
        super(props);
        this.state={
            enterCode : Array(6),
        }
    }
    handleInput = (i, event) => {
        event.preventDefault();
        const inputVals = this.state.enterCode.splice();
        inputVals[i] = event.target.value;
        console.log(inputVals);
        this.setState({enterCode: inputVals});
        
    }
   
    // componentDidMount(){
    //     for(let x in this.refs){
    //         this.refs[x].onChange = (e) =>
    //             this.handleFocus(e, this.refs[x])
    //     }
    //     this.refs.name.focus();
    // }

    // handleFocus(e , field){
    //     e.preventDefault();
    //     let next = this.refs[field.name].nextSibling;
    //     if(next && next.tagName ==="INPUT"){
    //         this.refs[field.name].nextSibling.focus()
    //     }
    // }

    render(){
        return (
            <div>
                <UserInput idx='0' onChange={this.handleInput} />
                <UserInput idx='1' onChange={this.handleInput} />
                <UserInput idx='2' onChange={this.handleInput} />
                <UserInput idx='3' onChange={this.handleInput} />
                <UserInput idx='4' onChange={this.handleInput} />
                <UserInput idx='5' onChange={this.handleInput} />
            </div>
        );
    }

}

export default PartyCodeInput;