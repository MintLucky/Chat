import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {welcomePage} from '../actions/actions';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import UserName from "../containers/UserName";

// const WelcomePage = () => (
//     <div className="container">
//         <div className="row">
//             <div className="main-page-wrapper">
//                 <h1>Chat Room</h1>
//                 <div className="start-chat-link">
//                     <Link to={`/room`}>Start Chat Now. Give Me Room!</Link>
//                 </div>
//                 {/*<UserName />*/}
//             </div>
//         </div>
//     </div>
// );
//
// export default Home;


class WelcomePage extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: ''
        };
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="main-page-wrapper">
                        <div>
                            <div>
                                <h1>Chat Room</h1>
                            </div>
                            <main>
                                <form>
                                    <section>
                                        <Link to="/signup">
                                            <Button
                                                bsStyle="success"
                                                type="submit">
                                                <p>Sign Up</p>
                                            </Button>
                                        </Link>
                                    </section>
                                </form>
                                <div>
                                    <p> Or </p>
                                    <Link to="/signin">
                                        <Button bsStyle="default" >Sign in</Button>
                                    </Link>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(WelcomePage);
