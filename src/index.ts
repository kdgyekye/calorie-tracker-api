import { ApolloServer } from "apollo-server";
import { connect } from "mongoose";
import { resolvers, typeDefs } from "./graphql";
import models from "./models";
import { __setContext } from "./middleware";

(async () => {
  await connect("mongodb://localhost:27017/calorie-tracker");
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: __setContext,
  });
  

  // The `listen` method launches a web server.
  server.listen().then(({ url }: any) => {
    console.log(`🚀  Server ready at ${url}`);
  });
})();
