import DataType from 'sequelize';
import Model from '../sequelize';

const UserToUserRating = Model.define('UserToUserRating', {
  dateRated: {
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

export default UserToUserRating;
