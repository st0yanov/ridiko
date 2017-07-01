import { GraphQLList as List } from 'graphql';
import TripType from '../types/TripType';

import { Trip } from '../models';

const trips = {
  type: new List(TripType),
  async resolve() {
    const result = await Trip.findAll();
    return result;
  },
};

export default trips;
