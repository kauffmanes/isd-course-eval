import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { shape } from 'prop-types';
import { Redirect } from 'react-router-dom';

import SurveyQuestions from './SurveyQuestions';
import SecondaryFooter from '../components/SecondaryFooter';

class Survey extends Component {
  static propTypes = {
    course: shape().isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      course: { questions: [] },
      limit: 5,
      offset: 0,
      professor: { name: '', title: '' },
      courseInstance: {},
      answers: [],
      feedbackRedirect: false
    };
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  componentWillUnmount() {
    window.localStorage.removeItem('courseInstance');
  }

  fetchQuestions(limit, offset) {
    const courseInstance = JSON.parse(window.localStorage.getItem('courseInstance')) || {};
    const courseId = this.props.course.cid || courseInstance.cid;

    this.setState({ courseInstance });

    if (!courseId) {
      this.setState({ guardRedirect: true });
    }

    axios
      .get(`/api/courses/${courseId}`, {
        params: {
          limit,
          offset
        }
      })
      .then(response => {
        this.setState({
          course: (response && response.data) || {},
          questionSet: (response.data && response.data.questions && JSON.parse(response.data.questions)) || [],
          professor: (response && response.data && response.data.Professors && response.data.Professors[0]) || {}
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          guardRedirect: true
        });
      });
  }

  handleClick(questionId, value) {
    const newQuestionSet = this.state.questionSet.questions
      .map(item => {
        const q = item;
        if (q.id === questionId) {
          q.answer = value;
        }
        return q;
      });

    this.setState({
      questionSet: { ...this.state.questionSet, questions: newQuestionSet } });
  }
  
  submit() {
    this.setState({ submitting: true });
    axios.post('/api/evaluations', {
      answers: JSON.stringify(this.state.questionSet.questions),
      courseId: this.state.course.id
    }).then(res => {
      console.log(res);
      this.setState({
        feedbackRedirect: true
      });
    }).catch(err => {
      console.error(err);
      this.setState({
        errorState: true,
        submitting: false
      });
    });
  }

  render() {

    if (this.state.guardRedirect) {
      return <Redirect to="/guard" />;
    }

    if(this.state.feedbackRedirect) {
      localStorage.removeItem('courseInstance');
      localStorage.removeItem('currentUser');
      return <Redirect to='/feedback' />;
    }

    if(this.state.course.questions.length > 0) {
      return (
        <article>
          <section className="c-course-info">
            <small className="c-course-info__term">{`${this.state.courseInstance.semester} ${this.state.courseInstance.year}`}</small>
            <h1>{`${this.state.course.code} ${this.state.course.name}`}</h1>
            <p className="c-course-info__instructor">{`${this.state.professor.title} ${this.state.professor.name}`}</p>
          </section>
          <section className="c-course-disclaimer">
            {'This is an anonymous survey created to receive feedback from students in order to improve the quality of the class for future terms. Please be honest in your feedback.'}
          </section>
          {this.state.errorState ? <section className='c-error'><p>An unknown error occurred while submitting. Please try again later.</p></section> : ''}
          <section className="c-course-questions">
            <SurveyQuestions questions={this.state.questionSet.questions.slice(this.state.offset, this.state.limit + this.state.offset)} handleClick={this.handleClick}/>
          </section>
          <SecondaryFooter>
            {this.state.offset === 0 ?
              <button className='o-button--back' onClick={() => this.setState({ guardRedirect: true })}>Cancel</button> :
              <button className='o-button--back' onClick={() => this.setState({ offset: this.state.offset - this.state.limit })}>Previous</button>
            }

            {(this.state.questionSet.questions.length <= (this.state.limit + this.state.offset)) ?
              <button className='o-button--primary' onClick={this.submit}>{this.state.submitting ? 'Submitting...' : 'Submit'}</button> :
              <button className='o-button--primary' onClick={() => this.setState({ offset: this.state.offset + this.state.limit })}>Continue</button>
            }
              </SecondaryFooter>
        </article>
      );
    }
    
    return <p>Loading...</p>
  }
}

const mapStateToProps = state => ({
  course: state.course
});

export default connect(mapStateToProps)(Survey);
