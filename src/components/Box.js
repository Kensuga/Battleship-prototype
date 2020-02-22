import React, {Component} from 'react';


class Box extends Component {
    constructor(){
        super()
        this.state = {
            picture: "",
            boxClicked: 0
        }
    }

    changePicture(value){
        if (value === 0){
            this.setState({ picture: "❌"})
        } else if (value){
            this.setState({ picture: "💥"})
        }
    }


    boxCaller() {
        if (this.state.boxClicked === 0){
            this.props.tempFunt(this.props.value);
            this.setState({ boxClicked: 1})
        }
        this.changePicture(this.props.value)
    }
    render(){
        return (
            <div className = "box" onClick = { this.boxCaller.bind(this) }>
                {this.state.picture}
            </div>
        );
    }
}

export default Box;