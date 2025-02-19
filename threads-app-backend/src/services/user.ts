//interface 
import {createHmac, randomBytes}from "node:crypto"
// import { Payload } from "@prisma/client/runtime/library";
import { prismaClient } from "../lib/db";
import { error } from "node:console";
import  JWT  from "jsonwebtoken";

const JWT_Secret='$uper@dmin'
export interface CraeteUserPayload{

    firstName: string
    lastName: string
    email: string
    password:string

}

export interface getUserPayload{
    email: string
password:string

}




// class ====> service (1. createuser)
class UserService {
    public static createUser(payload:CraeteUserPayload){
        const {firstName,lastName,email,password} = payload;
        const salt = randomBytes(32).toString("hex")
    const   hashedPassword =  UserService.generateHash(salt, password)
         
        return prismaClient.user.create({
            data: {
                firstName,
                lastName: lastName ?? null,
                email,
                salt,
                password :hashedPassword ,
            }
        })
        

    }

    private static generateHash(salt : string , password : string ){

        const hashedPassword = createHmac( "sha256", salt).update(password).digest("hex")
        return hashedPassword; 

    }
    private static getEmailByID(email:string){
        return prismaClient.user.findUnique({where : {email} })
    }
  

    public static async getUserToken(payload:getUserPayload){
        const {email, password} = payload;
        const user = await UserService.getEmailByID(email)
        if(!user) throw new Error('user not found');

        // password checking that is it true or not 
            const userSalt = user.salt;

        const hashedPassword= UserService.generateHash(userSalt, password); 

        if(hashedPassword !==  user.password)  throw new Error ('incorrect password');
// jwt token genrationtime now 
            const jsonWebToken= JWT.sign({id:user.id, email:user.email} ,JWT_Secret )
            return jsonWebToken;
        }
}


export default UserService;