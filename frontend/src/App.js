/**
 * App.js — Application Shell
 *
 * Root component that wires routing, persistent navigation bar,
 * and page-level components together.
 *
 * ROUTING (React Router DOM v5 — BrowserRouter):
 *   BrowserRouter uses the HTML5 History API (pushState / replaceState)
 *   to keep the UI in sync with the URL without full-page reloads.
 *   It must wrap all <Route> and <Link> components.
 *
 *   Switch — renders the FIRST matching <Route>. Without Switch,
 *   multiple routes could match the same URL simultaneously.
 *
 *   Route exact — only matches if the path matches exactly.
 *   Without `exact`, path="/" would match every URL.
 *
 *   Redirect — performs a client-side redirect. The `from` prop is
 *   only evaluated inside a <Switch>; here it sends "/" → "/board".
 *
 * ROUTE MAP:
 *   /home         → Home (landing/info page)
 *   /board        → Board (job listings + add-job form)
 *   /job/:id      → Job (single job detail, :id is a URL param)
 *   /  (fallback) → redirects to /board
 */
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Navbar from './Navbar';    // Persistent top navigation bar
import Home from './Home';        // Static landing / info page
import Board from './Board';      // Job listings table + add-job form
import Job from './Job';          // Single job detail view

function App() {
    return (
        // BrowserRouter scope: all routing context lives inside here
        <Router>
            {/* Navbar renders outside Switch so it stays visible on every page */}
            <Navbar />

            {/* Semantic UI Container: centres content with a max-width */}
            <Container text style={{ marginTop: '7em' }}>
                {/* Switch: stops at the FIRST matching route */}
                <Switch>
                    <Route path="/home" exact component={Home} />

                    {/* Board handles both the list view and add-job inline form */}
                    <Route path="/board" component={Board} />

                    {/* :id is a dynamic route param — read in Job with useParams() */}
                    <Route exact path="/job/:id" component={Job} />

                    {/* Catch-all: any unmatched path redirects to the board */}
                    <Redirect from="/" to="/board" />
                </Switch>
            </Container>
        </Router>
    );
}

export default App;
