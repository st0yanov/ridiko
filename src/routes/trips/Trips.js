import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Trips.css';

import Trip from '../../components/Trip';
import TripSearch from '../../components/TripSearch';

class Trips extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    trips: PropTypes.arrayOf(PropTypes.shape({
      dateAdded: PropTypes.string.isRequired,
      dateDropped: PropTypes.string.isRequired,
      source: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      destination: PropTypes.string.isRequired,
      freeSeats: PropTypes.number.isRequired,
    })).isRequired,
    tripSearches: PropTypes.arrayOf(PropTypes.shape({
      dateAdded: PropTypes.string.isRequired,
      dateDropped: PropTypes.string.isRequired,
      destination: PropTypes.string.isRequired,
    })).isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          {this.props.tripSearches.maps(tripSearch => <TripSearch {...tripSearch} />)}
          <hr />
          {this.props.trips.maps(trip => <Trip {...trip} />)}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Trips);
