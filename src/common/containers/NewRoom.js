import React from "react";
import io from "socket.io-client";
import { Link } from 'react-router-dom'

class NewRoom extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            rooms: []
        };

        this.socket = io('localhost:5000');

        this.socket.on('roomsListMessage', function(data){
            setRooms(data);
        });

        this.socket.emit('createNewRoom');

        const setRooms = data => {
            console.log(data);
            this.setState({rooms: [...this.state.rooms, data]});
            console.log(this.state.messages);
        };
    }
    render(){
        return (
            <div className="card">
                <div className="card-body">
                    <div className="card-title">Global Chat</div>
                    <hr/>
                    <div className="rooms">
                        {this.state.rooms.map((room, i) => {
                            return (
                                <div key={room.id}>
                                    <Link to={`/room/${room.id}`}>{room.name}</Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <NewRoom />
            </div>
        );
    }
}

export default NewRoom;