import React from 'react';
import { shape, arrayOf } from 'prop-types';

const SurveyQuestions = (props) => (
  <div>
    {props.questions.map(item => (
      <p>{item.question}</p>
    ))}
  </div>
);

SurveyQuestions.defaultProps = {
  questions: []
};

SurveyQuestions.propTypes = {
  questions: arrayOf(shape())
};

export default SurveyQuestions;
