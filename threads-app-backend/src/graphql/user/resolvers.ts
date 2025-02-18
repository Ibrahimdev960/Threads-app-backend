// import { Query } from "./queries"
// import { Mutation } from "./mutations"

const queries={}
const mutations={ 
    createUser :async(  _: any ,{}:{} )=>{
        return "randomID"
    }
}
export const resolvers = {queries ,mutations }