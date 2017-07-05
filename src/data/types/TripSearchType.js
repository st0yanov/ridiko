import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const TripSearchType = new ObjectType({
  name: 'TripSearch',
  fields: {
    dateStarted: { type: new NonNull(StringType) },
    dateDropped: { type: StringType },
    destination: { type: new NonNull(StringType) },
  },
});

export default TripSearchType;
