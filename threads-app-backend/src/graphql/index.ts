
import { ApolloServer } from '@apollo/server';

import { prismaClient } from '../lib/db';

import { User } from './user';

async function createGraphqlServer(){

    const graphqlServer = new ApolloServer({
        typeDefs:`
           type Query {
           hellow:String
           ${User.Query}
        }
           type Mutation {
           ${User.Mutation}
           
           }
        `,
        resolvers:{ 
            Query :{
                ...User.resolvers.queries
          
        }
        ,
        Mutation : {
            ...User.resolvers.mutations
        }
        
        }
        })
        
        await graphqlServer.start()


         return graphqlServer; 
}

export default createGraphqlServer;
