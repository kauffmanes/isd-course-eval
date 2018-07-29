import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { shape } from 'prop-types';
import { Redirect } from 'react-router-dom';

import SurveyQuestions from './SurveyQuestions';

class Survey extends Component {
  static propTypes = {
    course: shape().isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      course: { questions: [] },
      limit: 10,
      offset: 0,
      professor: { name: '', title: '' },
      courseInstance: {}
    };
    this.fetchQuestions = this.fetchQuestions.bind(this);
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

  render() {

    if (this.state.guardRedirect) {
      return <Redirect to="/guard" />;
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
            {
              'This is an anonymous survey created to receive feedback from students in order to improve the quality of the class for future terms. Please be honest in your feedback.'
            }
          </section>
          <section className="c-course-questions">
            <SurveyQuestions questions={this.state.questionSet.questions} />
            questions go here
          </section>
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
