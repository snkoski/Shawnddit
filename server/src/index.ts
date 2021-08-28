import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import mikroConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PostResolver } from './resolvers/post';
import { Post } from './entities/Post';

const main = async () => {
    const orm = await MikroORM.init(mikroConfig); // Use mikro-orm config file for initialization
    await orm.getMigrator().up(); // Run migrations automatically each time main() is called
    // const post = orm.em.create(Post, { title: 'my first post' }); // Create new Post object
    // await orm.em.persistAndFlush(post); // Insert Post into database
    // const posts = await orm.em.find(Post, {}); // Get all Posts from database
    // console.log(posts);
    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver],
            validate: false
        }),
        context: () => ({ em: orm.em })
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    });
};

main();
