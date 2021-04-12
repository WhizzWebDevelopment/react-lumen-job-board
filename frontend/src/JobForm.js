import React, { useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react'

import { API_BASE_URL } from './config'

export default function JobForm({ onAddition }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setError(false);
        setErrorMessage('');

        try {
            const response = await fetch(API_BASE_URL + '/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({ title, description, location })
            });
            const job = await response.json();

            if (job.errors) {
                setError(true);
                setErrorMessage(job.errors);
            } else {
                setTitle('');
                setDescription('');
                setLocation('');
                onAddition(job);
            }
        } catch (err) {
            setError(true);
            setErrorMessage(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form error={error} onSubmit={handleSubmit}>
            <Form.Field error={error}>
                <label>Job Title:</label>
                <input placeholder='enter job title' value={title} onChange={e => setTitle(e.target.value)} />
                <label>Job Description:</label>
                <input placeholder='enter job description' value={description} onChange={e => setDescription(e.target.value)} />
                <label>Job Location:</label>
                <input placeholder='enter job location' value={location} onChange={e => setLocation(e.target.value)} />
                {error &&
                    <Message
                        error
                        header='Error creating job'
                        content={errorMessage}
                    />
                }
            </Form.Field>
            <Button type='submit' loading={isLoading}>Add Job</Button>
        </Form>
    );
}
