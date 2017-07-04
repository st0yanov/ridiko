import DataType from 'sequelize';
import Model from '../sequelize';

const TripSearch = Model.define('TripSearch', {
  dateStarted: {
    type: DataType.DATE,
  },
  dateDropped: {
    type: DataType.DATE,
  },

  destination: {
    type: DataType.STRING(255),
  },
});

export default TripSearch;
