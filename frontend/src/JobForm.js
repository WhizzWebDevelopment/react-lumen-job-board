import React, { Component } from 'react';
import { Button, Form, Message } from 'semantic-ui-react'

import { API_BASE_URL } from './config'

export default class JobForm extends Component {
    
    constructor (props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            location: '',
            errorMessage: '',
            error: false,
            isLoading: false
        }
        this.updateTitle = this.updateTitle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    updateTitle(e) {
        this.setState({
            title: e.target.value
        })
    }
    
    updateDescription(e) {
        this.setState({
            description: e.target.value
        })
    }
    
    updateLocation(e) {
        this.setState({
            location: e.target.value
        })
    }
    
    async onSubmit(e) {
        e.preventDefault();
        this.setState({
            isLoading: true,
            error: false,
            errorMessage: ''
        });
    
        const response = await fetch(API_BASE_URL + '/jobs', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                "title": this.state.title,
                "description": this.state.description,
                "location": this.state.location
            })
        });
        const job = await response.json();
    
        if (job.errors) {
            this.setState({
                isLoading: false,
                error: true,
                errorMessage: job.errors
            });
        } else {
            this.setState({
                title: '',
                description: '',
                location: '',
                isLoading: false,
                error: false,
                errorMessage: ''
            });
            this.props.onAddition(job);
        }
    }
    
    render() {
        return (
            <Form error={this.state.error} onSubmit={this.onSubmit}>
                <Form.Field error={this.state.error}>
                    <label>Job Title:</label>
                    <input placeholder='enter job title' value={this.state.title} onChange={this.updateTitle}/>
                    <label>Job Description:</label>
                    <input placeholder='enter job description' value={this.state.description} onChange={this.updateDescription.bind(this)}/>
                    <label>Job Location:</label>
                    <input placeholder='enter job location' value={this.state.location} onChange={this.updateLocation.bind(this)}/>
                    { this.state.error &&
                    <Message
                        error
                        header='Error creating job'
                        content={this.state.errorMessage}
                    />
                    }
                </Form.Field>
                <Button type='submit' loading={this.state.isLoading}>Add Job</Button>
            </Form>
        )
    }
};
