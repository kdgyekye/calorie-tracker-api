import UserModel from "../../models/users";

const resolver = {
    Query: {
        user: (
            _: any,
            args: { id: string },
            { db }: any
        ) => {
            return db.User.findById(args.id);
        },
        users: async (
            _: any,
            args: { id?: string; name?: string; limit?: number },
            context: any
        ) => {
            return await context.db.User.find(args);
        },
        currentUser: (
            _: any,
            args: any,
            {user}: any
        ) => {
            return user;
        }
    },
    Mutation: {
        createUser: (
            _: any,
            args: { input: any },
            { db }: any
        ) => {
            const newUser = new db.User(args.input);
            newUser.generateAuthToken();
            return newUser;
        },
        updateUser: (
            _: any,
            args: { id: string; input: any },
            { db }: any
        ) => {
            return db.User.findByIdAndUpdate(args.id, args.input, {
                new: true
            });
        },
        deleteUser: (
            _: any,
            args: { id: string },
            { db }: any
        ) => {
            return db.User.findByIdAndDelete(args.id);
        }
    }
};

export default resolver