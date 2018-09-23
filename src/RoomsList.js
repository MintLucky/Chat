import React from "react";
import io from "socket.io-client";
import { Link, Redirect } from 'react-router-dom';
import ServerPath from './config.js';

class RoomList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            roomId: null,
            rooms: []
        };

        this.socket = io(ServerPath);

        this.socket.on('roomsList', function(data) {
            setRooms(data);
        });

        let self = this;
        this.socket.on('newRoomCreated', function(roomId){
            self.props.history.push(`/room/${roomId}`);
        });

        this.socket.emit('giveMeRoomsList');

        const setRooms = data => {
            this.setState({rooms: data});
        };

        this.createNewRoom = ev => {
            ev.preventDefault();
            this.socket.emit('createNewRoom');
        }
    }
    render(){
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to={`/room/${this.state.roomId}`}/>;
        }
        return (
            <div className="rooms-list-wrapper">
                <div className="rooms-list-body">
                    <div className="row">
                        <div className="rooms-list-title col-sm-7">Join One Of Existing Rooms</div>
                        <hr className="col-sm-7" />
                        <div className="rooms col-sm-7">
                            {(this.state.rooms.length === 0) ? (
                                <div className="rooms-list-no-rooms-wrapper">
                                    <div className="rooms-list-title">
                                        There Are No Existing Rooms
                                    </div>
                                </div>
                            ) : (
                                this.state.rooms.map((room, i) => {
                                    return (
                                        <div className="room-name-wrapper" key={room.roomId}>
                                            <span>
                                                <Link to={`/room/${room.roomId}`}>Chat Room # {room.roomId}</Link>
                                            </span>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="rooms offset-sm-5 col-sm-7">
                            <div className="create-new-room-button-wrapper">
                                <div className="rooms-list-title">Or Create Your Own Room</div>
                                <button onClick={this.createNewRoom} className="btn btn-primary form-control">Create New Room</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default RoomList;