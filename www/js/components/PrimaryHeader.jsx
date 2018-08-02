import React from 'react';

const headerStyles = {
  height: 'auto',
  boxShadow: '0 0px 4px 0 rgba(0, 0, 0, 0.8)',
}

const PrimaryHeader = () => (
  <header style={headerStyles} className="c-header--primary">
    <img src="../../../assets/img/pitt_logo.png" alt="the pitt logo" />
  </header>
);

export default PrimaryHeader;
