import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { Header, Message, Table } from 'semantic-ui-react';

import { API_BASE_URL } from './config'
import DeleteJobButton from "./DeleteJobButton"
import JobForm from "./JobForm"

export default function Board() {
    const[jobs, setJobs] = useState();
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const response = await fetch(API_BASE_URL + '/jobs', {});
                const jobsList = await response.json();
                setJobs(jobsList);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
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
