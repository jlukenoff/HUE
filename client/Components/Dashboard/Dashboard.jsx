import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './Dashboard.css';
/**
 * TODO:
 * - display all lights from current bridge
 */
const Dashboard = ({ lightData, adjust, toggle }) => (
  <div>
    {Object.keys(lightData).map(lightId => (
      <div key={lightData[lightId].name} className={styles.controlsContainer}>
        <div className={styles.infoContainer}>
          <ul>
            <li>
              Brightness: {`${Math.floor((lightData[lightId].state.bri / 254) * 100)}%`}
            </li>
            <li>
              Name: {lightData[lightId].name}
            </li>
          </ul>
        </div>
        <input
          type="range"
          min="0"
          // value={lightData[lightId].state.on ? lightData[lightId].state.bri : '0'}
          max="254"
          onChange={(e) => { e.persist(); adjust(e, lightId); }}
        />
        <button
          type="button"
          onClick={() => toggle(lightId)}
        >
          {lightData[lightId].state.on ? 'On' : 'Off'}
        </button>
      </div>
    ))}
  </div>
);

Dashboard.propTypes = {
  lightData: PropTypes.object.isRequired,
  adjust: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Dashboard;
