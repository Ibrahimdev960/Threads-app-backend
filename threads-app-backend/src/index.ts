import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { graphql } from 'graphql';


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
`,
resolvers:{ 
    Query :{
        hellow : ()=>'How are you', 
        say:(_, {name}: {name:String} )=> `hey ${name}, how are you?`
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