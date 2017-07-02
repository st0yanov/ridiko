import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInt as IntType,
} from 'graphql';

const TripType = new ObjectType({
  name: 'Trip',
  fields: {
    dateAdded: { type: new NonNull(StringType) },
    dateDropped: { type: StringType },
    source: { type: new NonNull(StringType) },
    startTime: { type: new NonNull(StringType) },
    destination: { type: new NonNull(StringType) },
    freeSeats: { type: IntType },
  },
});

export default TripType;
