import { GraphQLList as List } from 'graphql';
import UserToUserRatingType from '../types/UserToUserRatingType';

import { UserToUserRating } from '../models';

const ratings = {
  type: new List(UserToUserRatingType),
  async resolve() {
    const result = await UserToUserRating.findAll();
    return result;
  },
};

export default ratings;
