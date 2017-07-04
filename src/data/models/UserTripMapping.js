import DataType from 'sequelize';
import Model from '../sequelize';

const UserTripMapping = Model.define('UserTripMapping', {
  dateMapped: {
    type: DataType.DATE,
  },
  dateDropped: {
    type: DataType.DATE,
  },

  willBringPets: {
    type: DataType.BOOLEAN,
  },
});

export default UserTripMapping;
