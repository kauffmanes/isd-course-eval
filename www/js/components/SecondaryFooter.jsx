import React from 'react';
import { arrayOf, oneOfType, shape, string } from 'prop-types';

const SecondaryFooter = (props) => (
  <footer className="c-footer--secondary">
    {props.children}
  </footer>
);

SecondaryFooter.propTypes = {
  children: oneOfType([string, arrayOf(shape()), shape()]).isRequired
};

export default SecondaryFooter;
