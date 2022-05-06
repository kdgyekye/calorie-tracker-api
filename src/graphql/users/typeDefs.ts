import { gql } from "apollo-server-express";

const typeDefs = gql`
  enum UserRole {
    ADMIN
    USER
  }

  type LimitReached {
    calories: Int
    reachedAt: DateTime
  }

  type User {
    _id: ID!
    name: String
    email: String
    role: UserRole
    limit: Float
    limitReached: [LimitReached]
    createdAt: DateTime
    updatedAt: DateTime
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    role: UserRole!
    limit: Float
  }

  input LimitReachedInput {
    calories: Int
    reachedAt: DateTime
  }
  input UpdateUserInput {
    _id: ID
    name: String
    email: String
    password: String
    limit: Float
    limitReached: [LimitReachedInput]
  }

  input Pagination {
        limit: Int
        skip: Int
    }

  input GetUsersFilter {
    id: ID, 
    name: String, 
    limit: Float,
    role: UserRole,
  }
  extend type Query {
    user(id: ID!): User
    users(filter: GetUsersFilter, pagination: Pagination): [User]
    currentUser: User
    averageCaloriesPerDay: Float
  }

  extend type Mutation {  
    createUser(input: CreateUserInput!): User
    updateUser(input: UpdateUserInput!): User
    deleteUser(id: ID!): User
  }
`;

export default typeDefs;
