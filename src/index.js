import express from "express";
import serverless from "serverless-http";
import graphiql from "graphql-playground-middleware-express";
import { ApolloServer } from "apollo-server-express";
import glob from 'glob';
import path from 'path';
import fs from 'fs';
import resolvers from './resolvers';
import queries from './queries';
import MoviesService from './service/api';


const basePath = path.join(__dirname, './models/');
const schemasPath = glob.sync(`${basePath}**/*.graphql`);

// const typeDefs = [
//   Query,
//   ...schemasPath
//     .map(schema => gql(fs.readFileSync(schema, 'utf8'))),
//];
const typeDefs = [
  queries,
];

console.log(typeDefs);

const context = ({ req }) => ({ apikey: req.headers.apikey, });
const options = { port: 4040 };

const graphQLOptions = ({
  context,
  typeDefs,
  resolvers,
  dataSources: () => ({
    moviesService: new MoviesService(),
  }),
  path: "/graphql",
  playground: true,
});

const server = new ApolloServer(graphQLOptions);
// server.listen(options).then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });

const app = express();

server.applyMiddleware({ app });

app.get("/playground", graphiql({ endpoint: "/graphql" }));
const handler = serverless(app);

export { handler };