import React from 'react';
import { string, number, func } from 'prop-types';

const EmotionQuestion = props => (
  <label htmlFor={props.id} className='c-emotion'>
    {props.question}
    <div className='c-emotion__icons'>
      <button onClick={() => props.handleClick(props.id, 1)} className={props.answer === 1 ? 'c-emotion__face c-emotion__face--selected' : 'c-emotion__face'}><img src="../../assets/img/angry.svg" alt="angry face"/></button>
      <button onClick={() => props.handleClick(props.id, 2)} className={props.answer === 2 ? 'c-emotion__face c-emotion__face--selected' : 'c-emotion__face'}><img src="../../assets/img/upset.svg" alt="angry face"/></button>
      <button onClick={() => props.handleClick(props.id, 3)} className={props.answer === 3 ? 'c-emotion__face c-emotion__face--selected' : 'c-emotion__face'}><img src="../../assets/img/meh.svg" alt="angry face"/></button>
      <button onClick={() => props.handleClick(props.id, 4)} className={props.answer === 4 ? 'c-emotion__face c-emotion__face--selected' : 'c-emotion__face'}><img src="../../assets/img/fine.svg" alt="angry face"/></button>
      <button onClick={() => props.handleClick(props.id, 5)} className={props.answer === 5 ? 'c-emotion__face c-emotion__face--selected' : 'c-emotion__face'}><img src="../../assets/img/great.svg" alt="angry face"/></button>
    </div>
  </label>
);

EmotionQuestion.defaultProps = {
  answer: 0
};

EmotionQuestion.propTypes = {
    question: string.isRequired,
    id: number.isRequired,
    handleClick: func.isRequired,
    answer: number
};

export default EmotionQuestion;
