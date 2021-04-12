import React, { useState, useEffect } from 'react';
import {Header, Message, Table} from 'semantic-ui-react';
import {API_BASE_URL} from "./config"
import {Link, useParams} from "react-router-dom"

export default function Job() {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchJob() {
            try {
                setIsLoading(true);
                const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
                const data = await response.json();
                setJob(data);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                console.error(err);
            }
        }
        fetchJob();
    }, [id]);

    return(
        <div>
            <Link className="btn bg-secondary text-white my-5" to="/board">
                Back
            </Link>
            {isLoading && <Message info header="Loading job..." />}
            {job &&
                <div>
                    <Header as="h1">Job #{id}</Header>
                    <div>
                        <Table>
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Location</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr id={job.id} key={job.id}>
                                <td>{job.title}</td>
                                <td>{job.description}</td>
                                <td>{job.location}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            }
        </div>
    );
}
