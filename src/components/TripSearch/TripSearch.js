import React from 'react';
import PropTypes from 'prop-types';

class TripSearch extends React.Component {
  static propTypes = {
    dateAdded: PropTypes.string.isRequired,
    dateDropped: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
  };

  render() {
    const { destination, dateAdded, dateDropped } = this.props;
    return (
      <p>To: {destination} - {dateAdded}/{dateDropped}</p>
    );
  }
}

export default TripSearch;
