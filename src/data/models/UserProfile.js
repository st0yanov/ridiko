/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import DataType from 'sequelize';
import Model from '../sequelize';

const UserProfile = Model.define('UserProfile', {

  userId: {
    type: DataType.UUID,
    primaryKey: true,
  },

  displayName: {
    type: DataType.STRING(100),
  },

  picture: {
    type: DataType.STRING(255),
  },

  gender: {
    type: DataType.STRING(50),
  },

  isDriver: {
    type: DataType.BOOLEAN,
  },

  hasAirConditioning: {
    type: DataType.BOOLEAN,
  },

  prefersAirConditioning: {
    type: DataType.BOOLEAN,
  },

  isSmoking: {
    type: DataType.BOOLEAN,
  },

  isTolerantToSmoking: {
    type: DataType.BOOLEAN,
  },

  isTolerantToPets: {
    type: DataType.BOOLEAN,
  },

  isTolerantToEating: {
    type: DataType.BOOLEAN,
  },
});

export default UserProfile;
