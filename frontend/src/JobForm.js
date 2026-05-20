/**
 * JobForm.js — Controlled Form for Creating a New Job
 *
 * A controlled form component: every input field is backed by a useState
 * variable (title, description, location). React is the "single source of
 * truth" for the field values — they always reflect the current state.
 *
 * CONTROLLED vs UNCONTROLLED INPUTS:
 *   Controlled (here): value={title} + onChange={e => setTitle(e.target.value)}
 *     → React state drives the input. Good for validation, formatting, resetting.
 *   Uncontrolled: a ref attached to the DOM node (ref.current.value)
 *     → DOM drives the value. Less code but harder to validate or reset.
 *
 * ERROR HANDLING (two-layer):
 *   1. Server validation errors: Lumen returns { errors: [...] } with HTTP 422.
 *      The component checks for `job.errors` after the response is parsed.
 *   2. Network / runtime errors: the catch block handles connection failures.
 *
 * PARENT COMMUNICATION:
 *   onAddition(job) is a callback prop passed from Board.js. After a
 *   successful POST, we call it with the server-returned job object so
 *   Board can append the new job to its local state without re-fetching.
 *
 * FORM RESET:
 *   On success: title, description, location are reset to '' — clearing the
 *   input fields so the user can immediately add another job.
 */
import React, { useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react'

import { API_BASE_URL } from './config'

export default function JobForm({ onAddition }) {
    // Controlled input state — each field is managed by React
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');

    // Error display state
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);

    // Loading flag: disables the submit button while the POST is in-flight
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();    // prevent browser default form submission / page reload
        setIsLoading(true);    // show spinner on the submit button
        setError(false);       // clear any previous error
        setErrorMessage('');

        try {
            // POST to Lumen API — body must be JSON-serialised
            const response = await fetch(API_BASE_URL + '/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  // tells server the body format
                    Accept: 'application/json'            // tells server what we expect back
                },
                body: JSON.stringify({ title, description, location })  // serialize state
            });
            const job = await response.json();

            // Lumen validation errors come back as { errors: { field: [messages] } }
            if (job.errors) {
                setError(true);
                setErrorMessage(job.errors);
            } else {
                // Success: reset the form fields
                setTitle('');
                setDescription('');
                setLocation('');
                // Notify parent (Board) to add the new job to the table
                onAddition(job);
            }
        } catch (err) {
            // Network failure or JSON parse error
            setError(true);
            setErrorMessage(err.message);
        } finally {
            // Always re-enable the submit button, regardless of success or failure
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
