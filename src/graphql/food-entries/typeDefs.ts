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

    input GetFoodEntriesFilter {
        food: String
        createdAt: DateTime,
        meal: ID
    }

    input Pagination {
        limit: Int
        skip: Int
    }

    extend type Query {
        foodEntry(id: ID!): FoodEntry
        foodEntries(filter: GetFoodEntriesFilter, pagination: Pagination): [FoodEntry]
        foodEntriesLength(userId: ID dateRange: DateRangeInput): Int
    }

    input CreateFoodEntryInput {
        food: String!, 
        meal: ID!, 
        calorieValue: Float!
        user: ID
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