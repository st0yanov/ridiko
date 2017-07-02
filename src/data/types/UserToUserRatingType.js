import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLInt as IntType,
} from 'graphql';

const UserToUserRatingType = new ObjectType({
  name: 'UserToUserRating',
  fields: {
    dateRated: { type: new NonNull(StringType) },
    dateDropped: { type: StringType },
    isRatedOrganizer: { type: BooleanType },
    rating: { type: IntType },
    comment: { type: new NonNull(StringType) },
  },
});

export default UserToUserRatingType;
