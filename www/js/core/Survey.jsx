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
            <article>
                <h1>Survey title</h1>
                <p>dislaimer info</p>
                <p>survey here!</p>
            </article>
        );
    }
}

export default Survey;
