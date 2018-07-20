import React, { Component } from 'react';
import axios from 'axios';

class Survey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: []
        };
    }
    componentDidMount() {
        axios.get('/api/questions').then((res) => {
            this.setState({ questions: res.data });
        }).catch(err => console.log(err));
    }
    render() {
        return (
            <p>this is where the survey page for the courses go</p>
        );
    }
}

export default Survey;
