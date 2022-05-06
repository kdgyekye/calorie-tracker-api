import { gql } from "apollo-server"

const typeDefs = gql `
    type UserAuthentication {
        user: User
        token: String
    }

    input LoginInput {
        email: String!
        password: String!
    }

    extend type Mutation {
        loginUser(input: LoginInput!): UserAuthentication
        signOutUser: Boolean
    }
`

export default typeDefs