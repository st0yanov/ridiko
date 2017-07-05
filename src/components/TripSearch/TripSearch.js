import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TripSearch.css';

class TripSearch extends React.Component {
  static propTypes = {
    dateStarted: PropTypes.string.isRequired,
    dateDropped: PropTypes.string,
    destination: PropTypes.string.isRequired,
  };

  static defaultProps = {
    dateDropped: '',
  }

  render() {
    const { dateStarted, destination, dateDropped } = this.props;
    let dateStartedPretty;

    const classes = [s.TripSearch];
    if (dateDropped) {
      classes.append(s.dropped);
    }

    if (dateStarted !== 'Invalid Date') {
      dateStartedPretty = new Date(dateStarted).toLocaleString();
    } else {
      dateStartedPretty = '';
    }

    return (
      <div className={classes}>
        <span className={s.destination}>{destination}</span>
        <span className={s.dateStarted}>{dateStartedPretty}</span>
      </div>
    );
  }
}

export default withStyles(s)(TripSearch);
