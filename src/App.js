import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, NavLink} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {ApolloProvider} from "react-apollo";
import {client} from "./api/graphql/apolloConfig";
import './App.sass'
import {staticUrl} from './api/rest/baseUrl'
import loginImg from './assets/login.png'
import usersImg from './assets/users.png'
import noUserPhotoImg from './assets/noUserPhoto.png'
import projectImg from './assets/project.png'

import UsersList from './pages/UsersList/UsersList';
import UserProfile from './pages/UserProfile/UserProfile';
import LogInAndSignIn from './pages/LogInAndSignIn/LogInAndSignIn';
import Projects from './pages/Projects/Projects';
import ProjectCard from './pages/ProjectCard/ProjectCard';
import {logoutAction} from "./actions/actionCreators";

class NotFound extends Component {
    render() {
        return (
            <div>NotFound</div>
        );
    }
}

class Hello extends Component {
    render() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                fontSize: '48px',
                fontWeight: '500',
                color: 'rgba(0,0,139,0.85)',
                marginTop: '20px'
            }}>Hello, {user.firstName} {user.lastName}</div>
        );
    }
}

class App extends Component {

    renderUserInfo() {
        const {currentUser} = this.props;
        const openUser = () => {
            // if(currentUser)
            //     this.props.history.push('/users/' + currentUser._id);
        };
        return (
            <div className="App-user" onClick={() => openUser()} style={{cursor: currentUser ? 'pointer' : ''}}>
                <div className="App-photo"
                     style={{
                         backgroundImage: `url(${currentUser && currentUser.photoPath && currentUser.photoPath !== undefined ?
                             staticUrl + currentUser.photoPath : noUserPhotoImg})`
                     }}/>
                <div
                    className="App-name">{currentUser ? currentUser.firstName + ' ' + currentUser.lastName : "Guest"}</div>
            </div>
        );
    }

    render() {
        const {currentUser} = this.props;
        return (
            <ApolloProvider client={client}>
                <Router>
                    <div className="App">
                        <div className="App-parent-sidebar">
                            <div className="App-sidebar">
                                {this.renderUserInfo()}
                                {currentUser && <>
                                    <NavLink className="App-link" to="/users" style={{
                                        backgroundImage: `url(${usersImg})`
                                    }}/>
                                    <NavLink className="App-link" to="/projects" style={{
                                        backgroundImage: `url(${projectImg})`
                                    }}/>
                                </>}
                                {!currentUser && <NavLink className="App-link" to="/" style={{
                                    backgroundImage: `url(${loginImg})`
                                }}/>}
                                {currentUser && <div className="App-link" style={{
                                    backgroundImage: `url(${loginImg})`, transform: "rotate(180deg)"
                                }} onClick={() => this.props.logoutAction()}/>}

                            </div>
                        </div>
                        <div className="App-body">
                            <Switch>
                                {/*<Route exact path="/" component={LogInAndSignIn}/>*/}
                                <Route exact path="/" component={!currentUser ? LogInAndSignIn : Hello}/>
                                <Route exact path="/users" component={currentUser ? UsersList : LogInAndSignIn}/>
                                <Route exact path="/users/:id" component={currentUser ? UserProfile : LogInAndSignIn}/>
                                <Route exact path="/projects" component={currentUser ? Projects : LogInAndSignIn}/>
                                <Route exact path="/projects/:id"
                                       component={currentUser ? ProjectCard : LogInAndSignIn}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </ApolloProvider>
        );
    }
}

const mapStateToProps = (state) => {
    const {currentUser} = state.currentUserReducer;
    return {currentUser};
};

const mapDispatchToProps = (dispatch) => ({
    logoutAction: () => dispatch(logoutAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
