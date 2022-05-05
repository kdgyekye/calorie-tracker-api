const resolver = {
  Query: {
    meal: async (_: any, args: any, { db }: any) => {
      return await db.Meal.findById(args.mealId);
    },
    meals: async (_: any, args: any, { db }: any) => {
      console.log("meals");
      return await db.Meal.find({});
    },
  },
  Mutation: {
    createMeal: (_: any, args: any, { db }: any) => {
      return new db.Meal(args).save();
    },
    updateMeal: async (_: any, args: any, { db }:  any) => {
        return await db.Meal.findByIdAndUpdate(args.id, args, { new: true });
    },
    deleteMeal: () => {},
  },
};

export default resolver;
