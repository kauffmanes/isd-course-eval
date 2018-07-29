import React from 'react';
import { string, number } from 'prop-types';

const EmotionQuestion = props => (
  <label htmlFor={props.id}>
    {props.question}
  </label>
);

EmotionQuestion.defaultProps = {

};

EmotionQuestion.propTypes = {
    question: string.isRequired,
    id: number.isRequired
};

export default EmotionQuestion;
