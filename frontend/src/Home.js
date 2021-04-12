import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';

export default function Home() {
    return (
        <div style={{ textAlign: 'center', marginTop: '4em' }}>
            <Header as="h1">Welcome to Job Board</Header>
            <p>Browse and manage job listings.</p>
            <Link to="/board">
                <Button primary size="large">View Jobs</Button>
            </Link>
        </div>
    );
}
