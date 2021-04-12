import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react'

import { API_BASE_URL } from './config'

export default class ViewJobButton extends Component {
    
    constructor (props) {
        super(props);
        this.state = {
            id: props.jobId,
            isUpdating: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    async onSubmit(e) {
        e.preventDefault();
        this.setState({
            isUpdating: true
        });
        
        // const response = await fetch(API_BASE_URL + '/jobs/' + this.state.id, {
        //     method: 'VIEW',
        //     headers: {
        //         'Content-Type':'application/json',
        //         Accept: 'application/json'
        //     }
        // });
        
        // await response;
        // await this.setState({
        //     isUpdating: false
        // });
        this.props.onView(this.state.id);
    }
    
    render() {
        return (
            <Button type='button' onClick={this.props.onView(this.state.id)}>View Job</Button>
        )
    }
};
