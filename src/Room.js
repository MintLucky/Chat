import React from "react";
import { Switch, Route } from 'react-router-dom'
import RoomsList from './RoomsList';
import RoomChat from './RoomChat';

const Room = () => (
    <main>
        <Switch>
            <Route exact path='/room' component={RoomsList}/>
            <Route path='/room/:roomId' component={RoomChat}/>
        </Switch>
    </main>
);

export default Room;