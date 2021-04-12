import './App.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Navbar from './Navbar';
import Home from './Home'
import Board from './Board'
import Job from './Job'

class App extends Component {
    render() {
        return (
            <Router>
                    <Navbar />
                    <Container text style={{ marginTop: '7em' }}>
                        <Route path="/home" exact component={Home} />
                        <Route path="/board" component={Board} />
                        <Route exact path = '/job/:id'  component={Job} />
                    </Container>
            </Router>
        );
    }
}

export default App
