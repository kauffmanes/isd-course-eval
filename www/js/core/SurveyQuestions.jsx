import React from 'react';
import { shape, arrayOf, func } from 'prop-types';
import EmotionQuestion from '../components/EmotionQuestion';

const SurveyQuestions = props => {
  const handleClick = props.handleClick;
  return (
    <div>
      {props.questions.map(item => {
        
        if (item.type === 'emotion') return <EmotionQuestion handleClick={handleClick} key={item.id} {...item} />;
        if (item.type === 'select') return (
          <label htmlFor={item.id} key={item.id}>
            {item.question}
            <select id={item.id}>
              <option value="">-- Select option</option>
              {item.options.map(opt => <option key={opt.id} value={opt.value}>{opt.name}</option>)}
            </select>
          </label>
        );
        if (item.type === 'textarea') {
          return (
            <label key={item.id} htmlFor={item.id}>
              {item.question}
              <textarea key={item.id} />
            </label>
          )
        }
        return (
          <label key={item.id} htmlFor={item.id}>
            {item.question}
          </label>
        );
      })}
    </div>
  )
};

SurveyQuestions.defaultProps = {
  questions: [],
  active: 0
};

SurveyQuestions.propTypes = {
  questions: arrayOf(shape()),
  handleClick: func.isRequired
};

export default SurveyQuestions;
