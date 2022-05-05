import { __generateQuery } from "../../helpers/query";

const resolver = {
    Query: {
        foodEntries: async(
            _ :any,
            {filter, search, pagination}: any,
            { db, user } :any
        ) => {
            const __query = __generateQuery("User", {
                filter,
                search,
                pagination,
                extraFilter: {
                  ...(user.role === "USER" ? {user} : {})
                }
              })
            return await db.FoodEntry
            .find(__query.filter)
            .skip(__query.skip)
            .limit(__query.limit)
            .lean();
        },
        foodEntry: async(
            _:any,
            args:any,
            {db}:any
        ) => {
            return await db.FoodEntry.findById(args.id);
        },

        foodEntriesLength: async(
            _:any,
            {filter, search, pagination}:any,
            {db, user}:any
        ) => {
            const __query = __generateQuery("FoodEntry", {
                filter,
                search,
                pagination,
                extraFilter: {
                    ...(user.role === "USER" ? {user} : {})
                  }
            })
            return await db.FoodEntry
            .countDocuments(__query.filter);
        }
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