import { gql } from "apollo-server";

const typeDefs = gql`

    type FoodEntry {
        _id: ID!
        food: String
        meal: Meal
        calorieValue: Float
        user: User
        createdAt: DateTime
        updatedAt: DateTime
    }

    input DateRangeInput {
        startDate: DateTime
        endDate: DateTime
    }

    extend type Query {
        foodEntry(id: ID!): FoodEntry
        foodEntries(userId: ID dateRange: DateRangeInput): [FoodEntry]
    }

    extend type Mutation {
        createFoodEntry(food: String!, meal: String!, calorieValue: Float!): FoodEntry
        updateFoodEntry(id: ID!, food: String, meal: String, calorieValue: Float): FoodEntry
        deleteFoodEntry(id: ID!): FoodEntry
    }

`

export default typeDefs;