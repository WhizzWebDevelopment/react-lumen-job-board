import React, { Component } from 'react';
import {Header, Message, Table} from 'semantic-ui-react';
import {API_BASE_URL} from "./config"
import {Link} from "react-router-dom"

export default class Job extends Component {
    constructor(props) {
        super(props);
        this.state = {
            job: null,
            isLoading: null
        };
        this.id = this.props.match.params.id;
    }

    componentWillMount() {
        this.getJob();
    }

    async getJob(jobId) {
        if (! this.state.job) {
            try {
                this.setState({ isLoading: true });
                const response = await fetch(API_BASE_URL + '/jobs/' + this.id, {
                });
                const job = await response.json();
                this.setState({ job: job, isLoading: false});
            } catch (err) {
                this.setState({ isLoading: false });
                console.error(err);
            }
        }
    }

    render() {
        return(
            <div>
                <Link className="btn bg-secondary text-white my-5" to="/board">
                    Back
                </Link>
            {this.state.isLoading && <Message info header="Loading job..." />}
            {this.state.job &&
                    <div>
                        <Header as="h1">Job #{this.id}</Header>
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
                                <tr id={this.state.job.id} key={this.state.job.id}>
                                    <td>{this.state.job.title}</td>
                                    <td>{this.state.job.description}</td>
                                    <td>{this.state.job.location}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
            }
            </div>
        );
    }

};
