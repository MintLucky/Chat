import React from "react";
import io from "socket.io-client";
import { Link } from 'react-router-dom'

class UserName extends React.Component {
    constructor(props){
        super(props);

        this.sendName = this.sendName.bind(this);

        this.state = {
            userId: null,
            userName: null
        };

        this.socket = io('localhost:5000');
        this.socket.emit('giveMeUserId');
        this.socket.on('userId', function(userId){
            this.setState({userId: userId});
        });

        this.socket.emit('giveMeRoomsList');

    }

    sendName(event) {
        this.setState({userName: event.target.value});
        this.socket.emit('addUser',
            {
                userName: this.state.userName,
                userId: this.state.userId
            }
        );
    }

    render(){
        return (
            <div className={"enter-name"}>
                <h2>Enter Your Name Here</h2>
                <input type="text" value={this.state.userName} onChange={this.sendName} />
                {/*<button onClick={this.sendName}></button>*/}
            </div>
        );
    }
}

export default UserName;