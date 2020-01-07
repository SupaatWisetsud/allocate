import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import { typeDefs, resolvers, context } from './schema'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apollo = new ApolloServer({
    context,
    typeDefs,
    resolvers
})

app.use('/upload', express.static('./API/upload'));

apollo.applyMiddleware({ app });

const server = app.listen(4000, console.log('Server running.. on http://localhost:4000/graphql'));
apollo.installSubscriptionHandlers(server); //เปิด WS Protocol สำหรับใช้งาน Subscription