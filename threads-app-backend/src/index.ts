import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { graphql } from 'graphql';
import { prismaClient } from './lib/db';


async function init (){
    const app= express();


const port=  Number(process.env.port) ||8000

app.use(express.json())


const graphqlServer = new ApolloServer({
typeDefs:`
   type Query {
   hellow : String
   say(name : String): String 
}
   type Mutation {
   
   createUser(firstName: String! ,lastName: String! , email:String! , password:String!):Boolean
   }
`,
resolvers:{ 
    Query :{
        hellow : ()=>'How are you', 
        say:(_, {name}: {name:String} )=> `hey ${name}, how are you?`
}
,
Mutation : {
    createUser: async( _,
         {firstName,
          lastName,
          email,
          password
                }:{
            firstName: string; 
            lastName: string; 
            email: string; 
            password : string 
        })=> {
            await prismaClient.user.create({
                data: {
                email, 
                firstName, 
                lastName , 
                password ,
                salt: "random  "
                },
            });
            return true

    }
}

}
})

await graphqlServer.start()
app.get('/ ', (req, res ) =>{
    res.json({message: "server in running "})
})
app.use('/graphql',expressMiddleware(graphqlServer) )

app.listen(port, ()=> console.log(`server started at port ${port}`))



}

init()