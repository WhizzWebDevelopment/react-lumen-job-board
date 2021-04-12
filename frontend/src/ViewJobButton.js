import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function ViewJobButton({ jobId }) {
    return (
        <Link to={`/job/${jobId}`}>
            <Button type='button' size='mini'>View</Button>
        </Link>
    );
}
