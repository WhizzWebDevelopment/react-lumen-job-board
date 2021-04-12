import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Navbar from './Navbar';
import Home from './Home'
import Board from './Board'
import Job from './Job'

function App() {
    return (
        <Router>
            <Navbar />
            <Container text style={{ marginTop: '7em' }}>
                <Switch>
                    <Route path="/home" exact component={Home} />
                    <Route path="/board" component={Board} />
                    <Route exact path="/job/:id" component={Job} />
                    <Redirect from="/" to="/board" />
                </Switch>
            </Container>
        </Router>
    );
}

export default App;
