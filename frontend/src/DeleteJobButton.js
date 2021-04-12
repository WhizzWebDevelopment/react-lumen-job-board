import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react'

import { API_BASE_URL } from './config'

export default function DeleteJobButton({ jobId, onDelete }) {
    const [isUpdating, setIsUpdating] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setIsUpdating(true);

        try {
            await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            });
            setIsUpdating(false);
            onDelete(jobId);
        } catch (err) {
            setIsUpdating(false);
            console.error('Delete failed:', err);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Button type='submit' loading={isUpdating} color='red' size='mini'>Delete</Button>
        </Form>
    );
}
