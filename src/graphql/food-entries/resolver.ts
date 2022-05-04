const resolver = {
    Query: {
        foodEntries: async(
            _ :any,
            args: any,
            { db } :any
        ) => {
            return await db.FoodEntry.find({});
        },
        foodEntry: async(
            _:any,
            args:any,
            {db}:any
        ) => {
            return await db.FoodEntry.findById(args.id);
        },
    },
    Mutation: {
        createFoodEntry: (
            _:any,
            args:any,
            {db}:any
        ) => {
            return new db.FoodEntry(args).save();
        },
        updateFoodEntry: (
            _:any,
            args:any,
            {db}:any
        ) => {
            return db.FoodEntry.findByIdAndUpdate(args.id, args, {new: true});
        },
        deleteFoodEntry: () => {},
    }
}

export default resolver