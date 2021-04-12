import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { Header, Message, Table } from 'semantic-ui-react';

import { API_BASE_URL } from './config'
import DeleteJobButton from "./DeleteJobButton"
import ViewJobButton from "./ViewJobButton"
import JobForm from "./JobForm"

export default function Board() {
    const[jobs, setJobs] = useState();
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch(API_BASE_URL + '/jobs', {});
                if (!response.ok) {
                    throw new Error(`Failed to fetch jobs (${response.status})`);
                }
                const jobsList = await response.json();
                setJobs(jobsList);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                setError(err.message);
                console.error(err);
            }
        }
        fetchData();
    }, [])

    const onAddition = (job) => {
        setJobs([...jobs, job]);
    }

    const onDelete = (id) => {
        setJobs((jobs) => jobs.filter(job => job.id !== id))
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
