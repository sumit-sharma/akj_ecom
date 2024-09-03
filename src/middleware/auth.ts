import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { OAuthAccessToken } from "../entities/OAuthAccessToken";
import { AppDataSource } from "../config/data-source";

export const SECRET_KEY: Secret = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7";


export interface CustomRequest extends Request {
    token: string | JwtPayload;
    user_id: string | JwtPayload;
    uid: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error();
        }
        const decoded = jwt.verify(token, SECRET_KEY) as CustomRequest;
        // (req as CustomRequest).token = decoded;
        res.locals.user_id = decoded.user_id;
        res.locals.uid = decoded.uid;
        // res.locals.uid = 'sdsf';
        // console.log("token", token);


        const oauthToken = AppDataSource.getRepository(OAuthAccessToken);

        let validToken =  await oauthToken.findOne({
            where:{
                "user_id": res.locals.user_id,
                "id": res.locals.uid
            }
        })
        console.log("valid_token", validToken);
        if(validToken === null) {
            console.log("invalid token");
            return res.status(401).json({"status": "error", "message":"invalid token"});
        }else if(validToken.revoked === true){
            return res.status(401).json({"status": "error", "message":"invalid token"});
        }


        
        next();


    } catch (error) {
        console.log(error);
    }
}






