import { gql } from 'apollo-server';
//resolvers
import foodEntriesResolver from './food-entries/resolver';
import mealsResolver from './meals/resolver';
import usersResolver from './users/resolver';
import authenticationResolver from './authentication/resolver';

//typedefs
import foodEntriesTypeDefs from './food-entries/typeDefs';
import mealsTypeDefs from './meals/typeDefs';
import usersTypeDefs from './users/typeDefs';
import userAuthenticationTypeDefs from './authentication/typeDefs';

const rootTypeDefs = gql`
  scalar DateTime

  type Query {
    root: String
  }

    type Mutation {
        root: String
    }

`;


export const typeDefs = [
    rootTypeDefs,
    foodEntriesTypeDefs,
    mealsTypeDefs,
    usersTypeDefs,
    userAuthenticationTypeDefs
]

export const resolvers = [
    foodEntriesResolver,
    mealsResolver,
    usersResolver,
    authenticationResolver
]
