import _ from 'lodash';
import React, { Component } from 'react';
import Controls from './Components/Controls/Controls';

// import PropTypes from 'prop-types';

import styles from './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lightData: {},
      ...props,
    };
  }

  getAllLights() {
    fetch('/api/all')
      .then(chunk => chunk.json)
      .then(lightData => this.setState({ lightData }));
  }

  render() {
    return (
      <div className={styles.rootContainer}>
        <Controls {...this.state} />
      </div>
    );
  }
}

// App.propTypes = {
// };

export default App;
