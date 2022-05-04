const resolver = {
    Query: {
        user: (
            _: any,
            args: { id: string },
            { db }: any
        ) => {
            return db.User.findById(args.id);
        },
        users: (
            _: any,
            args: { id?: string; name?: string; limit?: number },
            { db }: any
        ) => {
            return db.User.find(args);
        }
    },
    Mutation: {
        createUser: (
            _: any,
            args: { input: any },
            { db }: any
        ) => {
            const userToken = args.input.generateAuthToken();
            return db.User.create(userToken);
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