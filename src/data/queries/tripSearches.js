import { GraphQLList as List } from 'graphql';
import TripSearchType from '../types/TripSearchType';

import { TripSearch } from '../models';

const trips = {
  type: new List(TripSearchType),
  async resolve() {
    const result = await TripSearch.findAll();
    return result;
  },
};

export default trips;
