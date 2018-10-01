import React from 'react';
// import PropTypes from 'prop-types';

import styles from './Controls.css';

const Controls = () => (
  <div className={styles.controlsContainer}>
    <input
      type="range"
      min="0"
      max="254"
      onChange={e => console.log(e.target.value)}
    />
  </div>
);

// Controls.propTypes = {
// };

export default Controls;
