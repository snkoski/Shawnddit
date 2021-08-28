import { MikroORM } from '@mikro-orm/core';
import { Post } from './entities/Post';
import mikroConfig from './mikro-orm.config';

const main = async () => {
    const orm = await MikroORM.init(mikroConfig); // Use mikro-orm config file for initialization
    await orm.getMigrator().up(); // Run migrations automatically each time main() is called
    // const post = orm.em.create(Post, { title: 'my first post' }); // Create new Post object
    // await orm.em.persistAndFlush(post); // Insert Post into database
    // const posts = await orm.em.find(Post, {}); // Get all Posts from database
    // console.log(posts);
};

main();
