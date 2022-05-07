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
    meal: ID
  }

  input Pagination {
    limit: Int
    skip: Int
  }

  type SummaryResponse {
      count: Int
      currentDay: DateTime
  }

  type AverageEntriesSummary {
    _id: ID
    total: Int
    avg: Float
    user: [User]
  }

  extend type Query {
    foodEntry(id: ID!): FoodEntry
    foodEntries(
      filter: GetFoodEntriesFilter
      pagination: Pagination
      populate: [String]
    ): [FoodEntry]
    foodEntriesLength(userId: ID, dateRange: DateRangeInput): Int
    sumLastWeekEntries: Int
    sumLastTwoWeeksEntries: Int  
    averageLastWeekEntries: [AverageEntriesSummary] 
    hasUserExceededLimitToday: Boolean
  }

  input CreateFoodEntryInput {
    food: String!
    meal: ID!
    calorieValue: Float!
    user: ID
  }

  input UpdateFoodEntryInput {
    _id: ID!
    food: String
    meal: ID
    calorieValue: Float
    user: ID
  }

  extend type Mutation {
    createFoodEntry(input: CreateFoodEntryInput!): FoodEntry
    updateFoodEntry(input: UpdateFoodEntryInput!): FoodEntry
    deleteFoodEntry(id: ID!): FoodEntry
  }
`;

export default typeDefs;
