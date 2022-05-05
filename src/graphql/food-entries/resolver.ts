import { __generateQuery } from "../../helpers/query";

const resolver = {
    Query: {
        foodEntries: async(
            _ :any,
            {filter, search}: any,
            { db, user } :any
        ) => {
            const __query = __generateQuery("User", {
                filter,
                search,
                extraFilter: {
                  ...(user ? {user} : {})
                }
              })
            return await db.FoodEntry.find(__query.filter);
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
            {db, user}:any
        ) => {
            return new db.FoodEntry({...args.input, user}).save();
        },
        updateFoodEntry: (
            _:any,
            args:any,
            {db}:any
        ) => {
            return db.FoodEntry.findByIdAndUpdate(args.input.id, args, {new: true});
        },
        deleteFoodEntry: () => {},
    }
}

export default resolver