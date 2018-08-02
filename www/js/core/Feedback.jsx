import React from 'react';
import PrimaryFooter from '../components/PrimaryFooter';

const Feedback = () => (
  <article>
    <section className="c-page">
      <h1>Thank you!</h1>
      <p style={{ marginBottom: '1.5rem' }}>Your feedback has been received.</p>
      <a href="/guard">
        Take Another Survey
      </a>
    </section>
    <PrimaryFooter />
  </article>
);

export default Feedback;
