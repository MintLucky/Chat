import React from 'react';
import { Link } from 'react-router-dom'
import UserName from "./UserName";

const Home = () => (
    <div className="container">
        <div className="row">
            <div className="main-page-wrapper">
                <h1>Chat Room</h1>
                <div className="start-chat-link">
                    <Link to={`/room`}>Start Chat Now. Give Me Room!</Link>
                </div>
                {/*<UserName />*/}
            </div>
        </div>
    </div>
);

export default Home;