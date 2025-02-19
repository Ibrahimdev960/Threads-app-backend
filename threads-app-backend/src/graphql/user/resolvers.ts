// import { Query } from "./queries"
// import { Mutation } from "./mutations"

import UserService, { CraeteUserPayload } from "../../services/user"

const queries={
    getUserToken: async(_:any, payload:{email: string , password: string}) =>
        { const token=await UserService.getUserToken({
        email:payload.email,
        password:payload.password
    })
    return token; 
}
}
const mutations={ 
    createUser :async(  _: any , payload:CraeteUserPayload )=>{
        const res = await UserService.createUser(payload)
        return res.id
    }
}
export const resolvers = {queries ,mutations } 