import { ApolloServer } from "apollo-server";
import { connect } from "mongoose";
import { resolvers, typeDefs } from "./graphql";
import models from "./models";

(async () => {
  await connect("mongodb://localhost:27017/calorie-tracker");
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
      db: models,
    },
  });

  // The `listen` method launches a web server.
  server.listen().then(({ url }: any) => {
    console.log(`🚀  Server ready at ${url}`);
  });
})();
