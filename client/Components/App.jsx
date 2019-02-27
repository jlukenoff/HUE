import { throttle } from 'lodash';
import React, { Component } from 'react';
import Dashboard from './Dashboard/Dashboard';

// import PropTypes from 'prop-types';

/**
 * Todo:
 * - Add dashboard component
 * - Add newLight component
 * - Add sliders
 * - Add authentication
 * - Add scene configuration functionality
 */

import styles from './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lightData: {},
      ...props,
    };
    this.adjustLightThrottled = throttle(this.adjustLight.bind(this), 500);
    this.toggleLight = this.toggleLight.bind(this);
  }

  componentDidMount() {
    this.getLightData();
  }

  getLightData() {
    fetch('/api/all')
      .then(chunk => chunk.json())
      .then(lightData => this.setState({ lightData }));
  }

  adjustLight(e, lightId) {
    const fetchAdjustLight = (bri, id) => {
      fetch(`/api/adjust/${id}/${bri}`, {
        method: 'PUT',
      })
        .then(chunk => chunk.json())
        .then(data => console.log(data))
        .catch(err => console.error(`Error adjusting light: ${err}`));
    };
    const bri = +e.target.value;
    const { state: { on } } = this.state.lightData[lightId];
    console.log(on);
    if (!on) {
      this.toggleLight(lightId, () => {
        fetchAdjustLight(bri, lightId);
      });
    } else {
      fetchAdjustLight(bri, lightId);
    }
  }

  toggleLight(lightId, cb) {
    const { lightData } = this.state;
    const on = !lightData[lightId].on;
    fetch(`/api/toggle/${lightId}/${on}`, { method: 'PUT' })
      .then(() => {
        lightData[lightId].on = on;
        this.setState({ lightData }, cb);
      })
      .catch(err => console.error(`Error toggling light: ${err}`));
  }

  render() {
    return (
      <div className={styles.rootContainer}>
        <Dashboard
          {...this.state}
          adjust={this.adjustLightThrottled}
          toggle={this.toggleLight}
        />
      </div>
    );
  }
}

// App.propTypes = {
// };

export default App;
