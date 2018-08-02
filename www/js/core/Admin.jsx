import React, { Component } from 'react';
import axios from 'axios';
import PrimaryFooter from '../components/PrimaryFooter';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: '',
      valid: null,
      error: null,
      title: '',
      code: '',
      successState: false,
      errorState: false,
      errorMessage: ''
    };

    this.validate = this.validate.bind(this);
    this.submit = this.submit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
  }

  handleTitleChange(evt) {
    this.setState({ title: evt.target.value });
  }

  handleCodeChange(evt) {
    const code = evt.target.value || '';
    this.setState({ code: code.toUpperCase() });
  }

  validate(evt) {
    const questions = evt.target.value;
    try {
      JSON.parse(questions);
      this.setState({ valid: true, error: false, questions });
    } catch (error) {
      this.setState({ valid: false, error: true, questions });
    }
  }

  submit() {
    axios
      .post('/api/courses', {
        code: this.state.code,
        name: this.state.title,
        questions: this.state.questions
      })
      .then(() => {
        this.setState({
          successState: true,
          errorState: false
        });
      })
      .catch(err => {
        if (err && err.response && err.response.data) {
          this.setState({
            errorMessage: err.response.data
          });
        } else {
          this.setState({
            errorMessage: 'Something went wrong. Please try again.'
          });
        }

        this.setState({
          errorState: true,
          successState: false
        });
      });
  }

  render() {
    return (
      <article>
        {this.state.errorState
            ? <section className="c-error">
                <p>{this.state.errorMessage}</p>
              </section>
            : ''}
        {this.state.successState
            ? <section className="c-success">
                <p>The course was successfully saved.</p>
              </section>
            : ''}
        <section className="c-page">
          <h1>Admin Panel</h1>
          <form>
            <label htmlFor="code">
              Course code:
              <input type="text" placeholder="Ex: TELECOM 2000" id="code" onChange={this.handleCodeChange} />
            </label>

            <label htmlFor="name">
              Course title:
              <input placeholder="Ex. Intro to Telecom" type="text" id="name" onChange={this.handleTitleChange} />
            </label>

            <label htmlFor="input">
              Input your question set as JSON format:
              <textarea onChange={this.validate} id="input" value={this.state.questions} />
              {this.state.valid && this.state.questions
                ? <p style={{ color: 'green' }}>Valid JSON.</p>
                : this.state.error && this.state.questions ? <p style={{ color: 'var(--Red)' }}>Invalid JSON</p> : ''}
            </label>
            <button
              type="button"
              disabled={!this.state.valid || !this.state.title || !this.state.code}
              className="o-button--primary"
              onClick={this.submit}
            >
              Submit
            </button>
          </form>
        </section>
        <PrimaryFooter />
      </article>
    );
  }
}

export default Admin;
