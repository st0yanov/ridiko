import React from 'react';
import PropTypes from 'prop-types';

class Trip extends React.Component {
  static propTypes = {
    dateAdded: PropTypes.string.isRequired,
    dateDropped: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    freeSeats: PropTypes.number.isRequired,
  };

  render() {
    const { dateAdded, dateDropped, source, startTime, destination, freeSeats } = this.props;
    return (
      <p>From: {source} - { destination } - {dateAdded}/{dateDropped}@{startTime} ({freeSeats})</p>
    );
  }
}

export default Trip;
