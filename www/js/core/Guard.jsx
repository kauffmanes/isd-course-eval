import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import { updateCurrentCourse } from '../actionCreators';

class Guard extends Component {
  static propTypes = {
    handleUpdateCurrentCourse: func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      surveyRedirect: false,
      accessCode: ''
    };
    this.validateInput = this.validateInput.bind(this);
  }

  validateInput() {
    if (this.state.accessCode) {
      axios
        .post('/api/codes/authorize', {
          accessCode: this.state.accessCode
        })
        .then(res => {
          if (!res.data.id) {
            this.setState({ errorMessage: 'No course found for that code.', accessCode: '' });
          } else {
            this.props.handleUpdateCurrentCourse(res.data);
            window.localStorage.setItem('courseInstance', JSON.stringify(res.data));
            this.setState({ surveyRedirect: true });
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({ errorMessage: err.response, accessCode: '' });
        });
    }
  }

  render() {
    if (this.state.surveyRedirect) {
      return <Redirect to="/survey" />;
    }

    return (
      <article>
        <section className="c-guard">
          <h1>Course Survey</h1>
          <p>Enter the code provided to you by the survey admin or course professor.</p>
          <form>
            <div className="c-input--access">
              <input
                onChange={evt => {
                  this.setState({ accessCode: evt.target.value, errorMessage: '' });
                }}
                value={this.state.accessCode}
                type="password"
                id="accessCode"
              />
              <button
                disabled={!this.state.accessCode}
                className="o-button--primary"
                type="button"
                onClick={this.validateInput}
              >
                Continue
              </button>
            </div>
          </form>
          {this.state.errorMessage}
        </section>
      </article>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleUpdateCurrentCourse: course => {
    dispatch(updateCurrentCourse(course));
  }
});

export default connect(null, mapDispatchToProps)(Guard);
