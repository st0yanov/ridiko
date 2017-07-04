import DataType from 'sequelize';
import Model from '../sequelize';

const UserToUserRating = Model.define('UserToUserRating', {
  dateRated: {
    type: DataType.DATE,
  },
  dateDropped: {
    type: DataType.DATE,
  },

  isRatedOrganizer: {
    type: DataType.BOOLEAN,
  },

  rating: {
    type: DataType.INTEGER,
  },

  comment: {
    type: DataType.STRING(255),
  },
});

export default UserToUserRating;
