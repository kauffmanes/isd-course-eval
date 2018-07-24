import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Guard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surveyRedirect: false,
            accessCode: ''
        };
        this.validateInput = this.validateInput.bind(this);
    }

    validateInput(val) {
        if (val) {
            // TODO - make service call to get the questions based on the access code here
            // axios.get('/api/something');
            this.setState({ surveyRedirect: true });
        }
    }

    render() {
        if (this.state.surveyRedirect) {
            return <Redirect to='/survey' />
        }

        return (
            <article>
                <h1>Course Survey</h1>
                <p>Enter the code provided to you by the survey admin or course professor.</p>
                <form>
                    <div className='c-input--access'>
                        <input onChange={(evt) => { this.setState({ accessCode: evt.target.value })}} placeholder='abc123' type="password" id='accessCode' />
                        <button disabled={!this.state.accessCode} className='o-button--primary' type='button' onClick={this.validateInput}>Continue</button>
                    </div>
                </form>
            </article>
        );
    }
}

export default Guard;
