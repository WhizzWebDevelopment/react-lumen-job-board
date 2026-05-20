/**
 * Job.js — Single Job Detail View
 *
 * Fetches and displays the full details of one job, identified by the
 * :id segment from the current URL (e.g. /job/42 → id = "42").
 *
 * ROUTE PARAM — useParams():
 *   useParams() reads dynamic segments from the active route.
 *   Route definition in App.js: <Route exact path="/job/:id" component={Job} />
 *   Navigating to /job/42 makes useParams() return { id: "42" }.
 *
 * useEffect DEPENDENCY ARRAY [id]:
 *   The effect re-runs whenever `id` changes. This handles the edge case
 *   where the user navigates directly from /job/1 to /job/2 — React reuses
 *   the same component instance, so we need [id] to trigger a fresh fetch.
 *   Without it, the effect would only run once on mount and the view
 *   would show stale data when navigating between jobs.
 *
 * NOTE: id is a string from the URL. The Lumen API accepts string IDs
 * in the path segment (/jobs/{id}), so no parseInt() conversion is needed.
 */
import React, { useState, useEffect } from 'react';
import {Header, Message, Table} from 'semantic-ui-react';
import {API_BASE_URL} from "./config"
import {Link, useParams} from "react-router-dom"

export default function Job() {
    // Extract the :id segment from the URL — e.g. /job/42 → id = "42"
    const { id } = useParams();

    // job is null until the fetch resolves; afterwards holds the job object
    const [job, setJob] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch the specific job whenever `id` changes (includes initial mount)
    useEffect(() => {
        async function fetchJob() {
            try {
                setIsLoading(true);
                // GET /api/jobs/{id} — returns a single job object
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
    }, [id]);  // re-fetch whenever the URL param changes

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
