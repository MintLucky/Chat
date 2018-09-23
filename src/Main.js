import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './Home';
import Room from './Room';

const Main = () => (
    <div className="container">
        <main>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/room' component={Room}/>
            </Switch>
        </main>
    </div>
);

export default Main;