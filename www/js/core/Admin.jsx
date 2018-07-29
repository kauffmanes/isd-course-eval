import React, { Component } from 'react';
import axios from 'axios';

class Admin extends Component {
  constructor(props) {
      super(props);
    this.state = {
        questions: '',
        valid: null,
				error: null,
				title: '',
				code: ''
        // courses: [],
        // courseId: null
      }

      this.validate = this.validate.bind(this);
      this.submit = this.submit.bind(this);
      this.onSelectCourse = this.onSelectCourse.bind(this);
			this.handleTitleChange = this.handleTitleChange.bind(this);
			this.handleCodeChange = this.handleCodeChange.bind(this);
  }

  // componentDidMount() {
  //   axios.get('/api/courses').then(courses => {
  //       this.setState({ courses: courses.data });
  //   }).catch(err => {
  //       console.log(err);
  //   });
  // }

  onSelectCourse(evt) {
      const courseId = evt.target.value;
      if (courseId) {
        this.setState({ courseId });
      }
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
      axios.post('/api/courses', {
				code: this.state.code,
				name: this.state.title,
				questions: this.state.questions
			}).then(res => {
          console.log(res);
      }).catch(err => {
          console.log(err);
      })
  }

  render() {
    return (
      <article className="c-page">
        <h1>Admin Panel</h1>
        <section>
          <form>
            {/* <label htmlFor="course">
                Select the course:
                <select name="courses" id="courses" onChange={this.onSelectCourse}>
                    <option value="">-- select a course</option>
                    {this.state.courses.map(course => (
                        <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                </select>
						</label> */}
						<label htmlFor='code'>
                Course code:
                <input type="text" placeholder='Ex: TELECOM 2000' id='code' onChange={this.handleCodeChange} />
            </label>
						
            <label htmlFor='name'>
                Course title:
                <input placeholder='Ex. Intro to Telecom' type="text" id='name' onChange={this.handleTitleChange} />
            </label>

            <label htmlFor="input">
              Input your question set as JSON format:
              <textarea
                onChange={this.validate}
                id="input"
                value={this.state.questions}
              />
            {this.state.valid && this.state.questions ? <p style={{ color: 'green'}}>Valid JSON.</p> : this.state.error && this.state.questions ? <p style={{ color: 'var(--Red)' }}>Invalid JSON</p> : ''}
            </label>
            <button
              type="button"
              disabled={!this.state.valid || !this.state.title || !this.state.code}
              className="o-button--primary"
              onClick={this.submit}
            >
              Submit
            </button>
						{JSON.stringify(this.state)}
          </form>
        </section>
      </article>
    );
  }
}

export default Admin;
