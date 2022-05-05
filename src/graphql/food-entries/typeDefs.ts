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

    input CreateFoodEntryInput {
        food: String!, 
        meal: ID!, 
        calorieValue: Float!
    }

    input UpdateFoodEntryInput {
        food: String!, 
        meal: String!, 
        calorieValue: Float!
    }

    extend type Mutation {
        createFoodEntry(input: CreateFoodEntryInput!): FoodEntry
        updateFoodEntry(input: UpdateFoodEntryInput!): FoodEntry
        deleteFoodEntry(id: ID!): FoodEntry
    }

`

export default typeDefs;