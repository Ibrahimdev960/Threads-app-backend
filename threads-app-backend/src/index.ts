import express from 'express'
import { expressMiddleware } from '@apollo/server/express4';
import { graphql } from 'graphql';
import createGraphqlServer from './graphql';
async function init(){
    const app= express();


const port=  Number(process.env.port) ||8000

app.use(express.json())


app.get('/ ', (req, res ) =>{
    res.json({message: "server in running "})
})

app.use('/graphql',expressMiddleware(await createGraphqlServer()) )


app.listen(port, ()=> console.log(`server started at port ${port}`))



}

init()