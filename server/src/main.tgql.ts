import "reflect-metadata";
import { buildSchema, Resolver, Query } from 'type-graphql';
import * as Express from 'express';
import { ApolloServer } from 'apollo-server-express';


@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello() {
    return "Hello world poo"
  }
}

const main = async () => {

  const schema = await buildSchema({
    resolvers: [HelloResolver]
  })

  const apolloServer = new ApolloServer({ schema })
  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(4020, () => console.log('server started'))
}

main();
