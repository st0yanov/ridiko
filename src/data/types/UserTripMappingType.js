import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
} from 'graphql';

const UserTripMappingType = new ObjectType({
  name: 'UserTripMapping',
  fields: {
    dateMapped: { type: new NonNull(StringType) },
    dateDropped: { type: StringType },
    willBringPets: { type: BooleanType },
  },
});

export default UserTripMappingType;
