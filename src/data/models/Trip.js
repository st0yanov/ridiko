import DataType from 'sequelize';
import Model from '../sequelize';

const Trip = Model.define('Trip', {
  dateAdded: {
    type: DataType.DATE,
  },
  dateDropped: {
    type: DataType.DATE,
  },

  source: {
    type: DataType.STRING(255),
  },

  startTime: {
    type: DataType.DATE,
  },

  destination: {
    type: DataType.STRING(255),
  },

  freeSeats: {
    type: DataType.INTEGER,
  },
});

export default Trip;
