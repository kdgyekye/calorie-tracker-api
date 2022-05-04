import { gql } from "apollo-server";

const typeDefs = gql`

    type Meal {
        _id: ID!
        name: String
        maxEntries: Int
        createdAt: DateTime
        updatedAt: DateTime
    }

    extend type Query {
        meal(id: ID!): Meal
        meals: [Meal]
    }

    extend type Mutation {
        createMeal(name: String!, maxEntries: Int!): Meal
        updateMeal(id: ID!, name: String, maxEntries: Int): Meal
        deleteMeal(id: ID!): Meal
    }

`

export default typeDefs;