import { findSourceMap } from 'module'
import {Request,Response,NextFunction} from 'express'
import passport from 'passport'
import {BasicStrategy} from 'passport-http'
import {User} from '../models/User'

const notAuthorizedJson = {status:401,message:'Não foi autorizado'}


passport.use(new BasicStrategy(async(email,password,done)=>{
    if(email && password){

        const user = await User.findOne({
            where:{email,password}
        })
        if(user){
            return done(null,user)
        }

    }

    return done(notAuthorizedJson,false)
    


}))

//rota para privatizar com passport 
export const privateRoute = (req:Request,res:Response,next:NextFunction)=>{
    const authFunction = passport.authenticate('basic',(err,user)=>{
        if(user){
            next()
        }else{
            next(notAuthorizedJson)
        }

    })
    authFunction(req,res,next)
}

export default passport
