import { __generateQuery } from "../../helpers/query";

const resolver = {
  Query: {
    user: (_: any, args: { id: string }, { db }: any) => {
      return db.User.findById(args.id);
    },
    users: async (_: any, { filter, pagination }: any, { db, user }: any) => {
      filter.name = { $regex: filter.name };
      return await db.User.find(filter)
        .skip(pagination?.skip)
        .limit(pagination?.limit)
        .lean();
    },
    currentUser: (_: any, args: any, { user }: any) => {
      return user;
    },

  },
  Mutation: {
    createUser: (_: any, args: { input: any }, { db }: any) => {
      const newUser = new db.User(args.input);
      newUser.generateAuthToken();
      return newUser;
    },
    updateUser: async (_: any, args: { input: any }, { db, user }: any) => {
      return await db.User.findByIdAndUpdate(user._id, args.input, {
        new: true,
      });
    },
    deleteUser: (_: any, args: { id: string }, { db }: any) => {
      return db.User.findByIdAndDelete(args.id);
    },
  },
};

export default resolver;
