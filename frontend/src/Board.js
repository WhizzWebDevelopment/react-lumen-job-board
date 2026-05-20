/**
 * Board.js — Job Listings Page
 *
 * Fetches all jobs from the Lumen API on mount, renders them in a table,
 * and embeds the JobForm inline for adding new jobs without leaving the page.
 *
 * STATE MANAGEMENT (local — no Redux needed here):
 *   jobs      — array of job objects from the API; undefined until first fetch
 *   isLoading — boolean flag controls a loading message while awaiting the API
 *   error     — null when OK; holds an error string to display on failure
 *
 * DATA FETCH PATTERN (useEffect + async function inside):
 *   useEffect runs AFTER the first render (empty [] dependency = "run once").
 *   async/await is used inside a nested function because useEffect itself
 *   cannot be declared async (it must return void or a cleanup function,
 *   not a Promise).
 *
 * OPTIMISTIC UI — onDelete:
 *   Instead of re-fetching all jobs from the API after a delete, the job
 *   is removed from local state immediately (optimistic update). This makes
 *   the UI feel instant without an extra network round trip.
 *
 * CALLBACK PROPS — onAddition:
 *   JobForm calls onAddition(newJob) after a successful POST. Board appends
 *   the new job to local state so the table updates without a full re-fetch.
 *
 * DATA FLOW:
 *   API → fetch → setJobs → render table rows
 *   JobForm POST → onAddition(job) → setJobs([...jobs, job])
 *   DeleteJobButton DELETE → onDelete(id) → setJobs(filter)
 */
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { Header, Message, Table } from 'semantic-ui-react';

import { API_BASE_URL } from './config'
import DeleteJobButton from "./DeleteJobButton"
import ViewJobButton from "./ViewJobButton"
import JobForm from "./JobForm"

export default function Board() {
    // Local state: all job records loaded from the API
    const[jobs, setJobs] = useState();
    // Controls the "Loading jobs..." message while the fetch is in-flight
    const [isLoading, setIsLoading] = useState();
    // Holds error message string when the fetch fails; null when healthy
    const [error, setError] = useState(null);

    // ── Data fetch on mount ──────────────────────────────────────────
    // Empty dependency array [] means this effect runs once after the
    // initial render and never re-runs (equivalent to componentDidMount).
    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch(API_BASE_URL + '/jobs', {});
                // fetch() does NOT throw on 4xx/5xx — check response.ok manually
                if (!response.ok) {
                    throw new Error(`Failed to fetch jobs (${response.status})`);
                }
                const jobsList = await response.json();
                setJobs(jobsList);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                setError(err.message);  // surface the message in the UI
                console.error(err);
            }
        }
        fetchData();
    }, []) // [] = run once on mount; add variables here if re-fetch is needed

    // Optimistic addition: append the newly created job (from JobForm)
    // to local state so the table updates instantly without a re-fetch.
    const onAddition = (job) => {
        setJobs([...jobs, job]);  // spread existing array, append new job
    }

    // Optimistic deletion: filter out the deleted job by id so the table
    // row disappears immediately without waiting for an API re-fetch.
    const onDelete = (id) => {
        setJobs((jobs) => jobs.filter(job => job.id !== id))  // functional update
    }

    return (
        <div>
            <Header as="h1">Jobs</Header>
            {isLoading && <Message info header="Loading jobs..." />}
            {error && <Message error header="Error" content={error} />}
            {jobs &&
            <div>
                <Table>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {jobs.map(
                        job => job &&
                            <tr id={job.id} key={job.id}>
                                <td>
                                    <Link to={`/job/${job.id}`} key={job.id}>
                                        {job.title}
                                    </Link>
                                    </td>
                                <td>
                                    <ViewJobButton jobId={job.id} />
                                    <DeleteJobButton onDelete={onDelete} jobId={job.id} />
                                </td>
                            </tr>
                    )}
                    </tbody>
                </Table>
                <JobForm onAddition={onAddition} />
            </div>
            }
        </div>
    );

}
