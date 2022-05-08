import { __generateQuery } from "../../helpers/query";

const resolver = {
  Query: {
    foodEntries: async (
      _: any,
      { filter, search, pagination, populate, startDate, endDate }: any,
      { db, user }: any
    ) => {
      console.log(filter);
      console.log(startDate === endDate)
      const __query = __generateQuery("User", {
        filter,
        search,
        pagination,
        populate,
        extraFilter: {
          ...(user.role === "USER" ? { user } : {}),
          ...(startDate && endDate ? { 
            ...(startDate === endDate ? { 
              createdAt: {
                $gte: new Date(new Date(startDate).setHours(0, 0, 0, 0)),
                $lte: new Date(new Date(startDate).setHours(23, 59, 59, 999)),
              },
            }
            :
            {createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) } })
          } : {}),
        },
      });
      console.log(__query);
      return await db.FoodEntry.find(__query.filter)
        .sort({ createdAt: -1 })
        .skip(__query.skip)
        .limit(__query.limit)
        .populate(__query.populate)
        .lean();
    },

    foodEntry: async (_: any, args: any, { db }: any) => {
      return await db.FoodEntry.findById(args.id);
    },

    foodEntriesLength: async (
      _: any,
      { filter, search, pagination, startDate, endDate }: any,
      { db, user }: any
    ) => {
      const __query = __generateQuery("FoodEntry", {
        filter,
        search,
        pagination,
        extraFilter: {
          ...(user.role === "USER" ? { user } : {}),
          ...(startDate && endDate ? { 
            ...(startDate === endDate ? { 
              createdAt: {
                $gte: new Date(new Date(startDate).setHours(0, 0, 0, 0)),
                $lte: new Date(new Date(startDate).setHours(23, 59, 59, 999)),
              },
            }
            :
            {createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) } })
          } : {}),
        },
      });
      return await db.FoodEntry.countDocuments(__query.filter);
    },

    sumLastWeekEntries: async (_: any, args: any, { db, user }: any) => {
      if (user.role === "ADMIN") {
        const summary = await db.FoodEntry.aggregate([
          {
            $match: {
              //...(user.role === "USER" ? { user } : {}),
              createdAt: {
                $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
                $lte: new Date(),
              },
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
            },
          },
        ]);
        console.log("Last week: ", summary);
        if (summary.length > 0) {
          return summary[0].total;
        } else return 0;
      }
      else throw new Error("You are not allowed to access this resource");
    },

    sumLastTwoWeeksEntries: async (_: any, args: any, { db, user }: any) => {
      if (user.role === "ADMIN") {
        const summary = await db.FoodEntry.aggregate([
          {
            $match: {
              createdAt: {
                $gte: new Date(new Date().setDate(new Date().getDate() - 14)),
                $lte: new Date(new Date().setDate(new Date().getDate() - 7)),
              },
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$calorieValue" },
            },
          },
        ]);
        console.log("Last 2 weeks: ", summary);
        if (summary.length > 0) {
          return summary[0].total;
        } else return 0;
      }
      else throw new Error("You are not allowed to access this resource");
    },

    //The average number of calories added per user for the last 7 days
    averageLastWeekEntries: async (_: any, args: any, { db, user }: any) => {
      if (user.role === "ADMIN") {
        const summary = await db.FoodEntry.aggregate([
          {
            $match: {
              createdAt: {
                $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
                $lte: new Date(),
              },
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "user",
              foreignField: "_id",
              as: "userDetails",
            },
          },
          {
            $group: {
              _id: "$user",
              total: { $sum: 1 },
              avg: { $avg: "$calorieValue" },
              user: { $first: "$userDetails" },
            },
          },
          {
            $sort: {
              avg: -1,
            },
          },
        ]);
        console.log("Last week: ", summary);
        if (summary.length > 0) {
          return summary;
        }
        else return null
      }
      else throw new Error("You are not allowed to access this resource");  
    },

    // Check if a user has exceeded the set calorie limit for today
    hasUserExceededLimitToday: async (_: any, args: any, { db, user }: any) => {
      const summary = await db.FoodEntry.aggregate([
        {
          $match: {
            user: user._id,
            createdAt: {
              $gte: new Date(new Date().setHours(0, 0, 0, 0)),
              $lte: new Date(new Date().setHours(23, 59, 59, 999)),
            },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$calorieValue" },
          },
        },
      ]);
      console.log("Today: ", summary, "user: ",user.limit);
      if (summary.length > 0) {
        return summary[0].total > user.limit;
      }
    },

    // Days user exceeded the calorie limit
    daysUserExceededLimit: async (_: any, args: any, { db, user }: any) => {
      const limit = user.limit;
      const summary = await db.FoodEntry.aggregate([
        {
          $match: {
            user: user._id,
          },
        },
        {
          $group: {
            _id: {
              date: {
                $dateToString: {
                  format: "%m-%d-%Y",
                  date: "$createdAt",
                },
              },
            },
            total: { $sum: "$calorieValue" },
          },
        },
        {
          $match: {
            total: {
              $gt: limit,
            },
          },
        },
        {
          $group: {
            _id: {
              day: "$_id.date",
            },
            day: { $first: "$_id.date" },
            total: { $first: "$total"},
          },
        },
      ]);
      console.log("Days: ", summary);
      if (summary.length > 0) {
        return summary.map((day:any) => {
          return {
            day: day.day,
            total: day.total,
            limit
          };
        });
      }
      else return []
    }

  },
  Mutation: {
    createFoodEntry: async (_: any, args: any, { db, user }: any) => {
      // check if meal max entries per date is reached
      const mealMaxEntries = await db.Meal.findOne({
        _id: args.input.meal,
      });
      console.log("mealMaxEntries: ", mealMaxEntries);
      if (mealMaxEntries) {
        const mealEntries = await db.FoodEntry.find({
          meal: args.input.meal,
          createdAt: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)),
            $lte: new Date(new Date().setHours(23, 59, 59, 999)),
          },
        });
        console.log(mealEntries, mealMaxEntries.maxEntries);
        if (mealEntries.length >= mealMaxEntries.maxEntries) {
          throw new Error("Maximun entries for meal reached");
        }
      }
      return new db.FoodEntry({
        ...args.input,
        user: user.role === "USER" ? user._id : args.input.user,
      }).save();
    },
    updateFoodEntry: async (_: any, args: any, { db }: any) => {
      return await db.FoodEntry.findByIdAndUpdate(args.input._id, args.input, {
        new: true,
      });
    },
    deleteFoodEntry: () => {},
  },
};

export default resolver;
