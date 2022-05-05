
const resolver = {
    Query: {

    },
    Mutation: {
        loginUser: async (_: any, args: any, { db }: any) => {
            console.log(args)
            const user = await db.User.findByCredentials(args.input.email, args.input.password);
            const token = await user.generateAuthToken();
            return { user, token };
        }
    }
}

export default resolver;