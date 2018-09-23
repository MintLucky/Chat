import React from "react";
import io from "socket.io-client";
import autoBind from 'react-autobind';
import ServerPath from '../../config.js';

class RoomChat extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            roomId: props.match.params.roomId,
            username: '',
            message: '',
            messages: [],
            usersIsTypingNow: [],
            userJoinedTheRoom: false
        };

        autoBind(this);

        this.timeout = null;

        // this.handleOnChange = this.handleOnChange.bind(this);
        // this.userStopTypingTimeoutFunction = this.userStopTypingTimeoutFunction.bind(this);
        // this.handleKeyUp = this.handleKeyUp.bind(this);
        // this.removeUserFromUsersTypingArray = this.removeUserFromUsersTypingArray.bind(this);

        this.socket = io(ServerPath);

        this.socket.on('messageAdded', function(data){
            addMessage(data);
        });

        let self = this;
        this.socket.on('connect' ,function() {
            self.socket.emit('giveMeRoom', self.state.roomId);
        });

        this.socket.on('roomMessages', function(data){
            setChatMessageHistory(data);
        });

        this.socket.on('userJoinedRoom', function(data){
            self.setState({userJoinedTheRoom: true});
            setTimeout(() => {
                    self.setState({userJoinedTheRoom: false});
                }, 5000)
        });

        this.socket.on('userIsTyping', function(data){
            let notIncludeFlag = false;
            if(self.state.usersIsTypingNow.length > 0) {
                for (let i = 0; i < self.state.usersIsTypingNow.length; i++) {
                    if (self.state.usersIsTypingNow[i]['userName'] === data.userName) {
                        notIncludeFlag = true;
                        return;
                    }
                }
            }
            if(!notIncludeFlag) {
                self.setState({usersIsTypingNow: [...self.state.usersIsTypingNow, data]});
            }
        });

        this.socket.on('userStopTyping', function(data){
            if(self.state.usersIsTypingNow.length > 0) {
                self.removeUserFromUsersTypingArray(data);
            }
        });

        const setChatMessageHistory = (data) => {
            this.setState({messages: data});
        };

        const addMessage = data => {
            this.setState({messages: [...this.state.messages, data]});
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('addMessageToRoom', {
                roomId : this.state.roomId,
                message: {
                    author: this.state.username,
                    message: this.state.message
                }
            });
            this.setState({message: ''});
            this.userStopTypingTimeoutFunction(this.state.username);
        }
    }

    removeUserFromUsersTypingArray(user) {
        for(let i = 0; i < this.state.usersIsTypingNow.length; i++) {
            if(this.state.usersIsTypingNow[i]['userName'] === user.userName) {
                let newUsersIsTypingNowArray = this.state.usersIsTypingNow;
                newUsersIsTypingNowArray.splice(i, 1);
                this.setState({usersIsTypingNow: newUsersIsTypingNowArray});
            }
        }
    }

    handleOnChange(ev) {
        this.setState({message: ev.target.value})
    }

    userStopTypingTimeoutFunction() {
        this.socket.emit('userStopTyping',
            {
                userName: this.state.username,
            }
        );
    }

    handleKeyUp() {
        this.socket.emit('userIsTyping',
            {
                userName: this.state.username,
            }
        );
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.userStopTypingTimeoutFunction, 2000)
    }

    render() {
        return (
                <div className="chat-wrapper">
                    <div className="chat-left-side">
                        <div className="chat-title">Room #{this.state.roomId}</div>
                        <hr/>
                        <div className="chat-messages">
                            {this.state.messages.map((message, i) => {
                                return (
                                    <div className="chat-message-item" key={i}>{message.author}: {message.message}</div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="chat-right-side">
                        <input type="text" placeholder="Username" value={this.state.username}
                               onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
                        <br/>
                        <textarea type="text" placeholder="Message" className="form-control" value={this.state.message}
                                  onChange={this.handleOnChange} onKeyUp={this.handleKeyUp} />
                        <br/>
                        <div className="send-button">
                            <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                        </div>
                        <div className={"users-typing-block"}>
                            {this.state.usersIsTypingNow.map((user, i) => {
                                return (
                                    <div className="user-typing-item" key={i}>{user.userName} is typing now ...</div>
                                )
                            })}
                        </div>
                        <div className={"user-joined-room"}>
                            {
                                this.state.userJoinedTheRoom
                                    ? (
                                        <div>User Joined The Room</div>
                                    ) : null
                            }
                        </div>
                    </div>

                </div>
        );
    }
}

export default RoomChat;