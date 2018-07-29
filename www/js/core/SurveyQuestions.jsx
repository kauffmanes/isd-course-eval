import React from 'react';
import { shape, arrayOf } from 'prop-types';

const SurveyQuestions = props => (
  <div>
    {props.questions.map(item => (
      <label key={item.id} htmlFor={item.id}>
        {item.question}
      </label>
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
