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

const User = Model.define('User', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  messenger_id: {
    type: DataType.STRING(255),
  },

  first_name: {
    type: DataType.STRING(255),
  },

  last_name: {
    type: DataType.STRING(255),
  },

  picture: {
    type: DataType.STRING(255),
  },

  gender: {
    type: DataType.STRING(50),
  },

  phone: {
    type: DataType.STRING(255),
    is: /^(\(?\+?[0-9]*\)?)?[0-9_\- ()]*$/i,
    defaultValue: '',
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

}, {

  indexes: [
    { fields: ['messenger_id'] },
  ],

});

export default User;
