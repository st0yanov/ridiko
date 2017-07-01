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

  email: {
    type: DataType.STRING(255),
    validate: { isEmail: true },
  },

  emailConfirmed: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },

  name: {
    type: DataType.STRING(255),
  },

  phone: {
    type: DataType.STRING(255),
    is: /^(\(?\+?[0-9]*\)?)?[0-9_\- ()]*$/i,
    defaultValue: '',
  },

}, {

  indexes: [
    { fields: ['email'] },
  ],

});

export default User;
