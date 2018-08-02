import React from 'react';
import PrimaryFooter from '../components/PrimaryFooter';
import { Redirect } from 'react-router-dom';

const buttonStyles= {
  width: 'auto',
  borderRadius: '5px',
  boxShadow: '0 0px 4px 0 rgba(0, 0, 0, 0.8)',
  textDecoration: 'none',
  padding: '10px 20px',
  color: '#ffffff',
  fontWeight: 'normal',
}

const Feedback = () => (
  <article>
    <section className="c-page">
      <h1>Thank you!</h1>
      <p style={{marginBottom: '1.5rem'}}>Your feedback has been received.</p>
      <a
      href='/guard' 
      className='o-button--primary'
      style={buttonStyles}
      >
      Take Another Survey
      </a>
    </section>
    <PrimaryFooter />
  </article>
);

export default Feedback;
