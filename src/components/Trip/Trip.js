import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Trip.css';

class Trip extends React.Component {
  static propTypes = {
    dateAdded: PropTypes.string.isRequired,
    dateDropped: PropTypes.string,
    source: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    freeSeats: PropTypes.number.isRequired,
  };

  static defaultProps = {
    dateDropped: '',
  }

  render() {
    const { dateAdded, dateDropped, source, startTime, destination, freeSeats } = this.props;
    let dateAddedPretty;
    let startTimePretty;

    const classes = [s.Trip];
    if (dateDropped) {
      classes.append(s.dropped);
    }

    if (dateAdded !== 'Invalid Date') {
      dateAddedPretty = new Date(dateAdded).toLocaleString();
    } else {
      dateAddedPretty = '';
    }

    if (startTime !== 'Invalid Date') {
      startTimePretty = new Date(startTime).toLocaleString();
    } else {
      startTimePretty = '';
    }

    return (
      <div className={classes}>
        <div className={s.line}>
          <span className={s.source}>{source}</span>
          <span className={s.destination}>{destination}</span>
        </div>
        <div className={s.line}>
          <span className={s.startTime}>{startTimePretty}</span>
          <span className={s.dateAdded}>{dateAddedPretty}</span>
        </div>
        <div className={s.line}>
          <span className={s.freeSeats}>{freeSeats}</span>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Trip);
