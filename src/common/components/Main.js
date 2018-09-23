import React from 'react';
import { Switch, Route } from 'react-router-dom'
import WelcomePage from './WelcomePage';
import Room from './Room';

const Main = () => (
    <div className="container">
        <main>
            <Switch>
                <Route exact path='/' component={WelcomePage}/>
                <Route path='/room' component={Room}/>
            </Switch>
        </main>
    </div>
);

export default Main;