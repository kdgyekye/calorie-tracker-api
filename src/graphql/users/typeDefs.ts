import { gql } from "apollo-server-express";

const typeDefs = gql`
  enum UserRole {
    ADMIN
    USER
  }

  type User {
    _id: ID!
    name: String
    email: String
    role: UserRole
    limit: Float
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

  extend type Query {
    user(id: ID!): User
    users(id: ID, name: String, limit: Float): [User]
    currentUser: User
  }

  extend type Mutation {  
    createUser(input: CreateUserInput!): User
    updateUser(id: ID!, name: String, email: String, password: String, limit: Float): User
    deleteUser(id: ID!): User
  }
`;

export default typeDefs;
