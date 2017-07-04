/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import sequelize from '../sequelize';

import User from './User';

import Trip from './Trip';
import UserToUserRating from './UserToUserRating';
import TripSearch from './TripSearch';
import UserTripMapping from './UserTripMapping';

User.hasMany(Trip, {
  foreignKey: 'organizer',
  as: 'trips',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Trip.hasMany(UserToUserRating, {
  foreignKey: 'trip',
  as: 'ratings',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasMany(UserToUserRating, {
  foreignKey: 'rater',
  as: 'rated',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasMany(UserToUserRating, {
  foreignKey: 'rated',
  as: 'ratings',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasMany(TripSearch, {
  foreignKey: 'user',
  as: 'tripSearches',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasMany(UserTripMapping, {
  foreignKey: 'user',
  as: 'tripMappings',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Trip.hasMany(UserTripMapping, {
  foreignKey: 'trip',
  as: 'userMappings',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User, Trip, UserToUserRating, TripSearch, UserTripMapping };
