import React from 'react';
import { shape, arrayOf } from 'prop-types';
import EmotionQuestion from '../components/EmotionQuestion';

const SurveyQuestions = props => (
  <div>
    {props.questions.map(item => {
      
      if (item.type === 'emotion') return <EmotionQuestion key={item.id} {...item} />;
      if (item.type === 'select') return (
        <label htmlFor={item.id} key={item.id}>
          {item.question}
          <select id={item.id}>
            <option value="">-- Select option</option>
            {item.options.map(opt => <option key={opt.id} value={opt.value}>{opt.name}</option>)}
          </select>
        </label>
      );
      if (item.type === 'textarea') return <textarea key={item.id}/>;
      return (
        <label key={item.id} htmlFor={item.id}>
          {item.question}
        </label>
      );
    })}
  </div>
);

SurveyQuestions.defaultProps = {
  questions: []
};

SurveyQuestions.propTypes = {
  questions: arrayOf(shape())
};

export default SurveyQuestions;
