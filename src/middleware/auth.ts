import jwt from "jsonwebtoken";
import UserModel from "../models/users";

const authMiddleware = async (req:any,res:any,next:any) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token,'t-m-user');
        const user = await UserModel.findOne({ _id: decoded._id, 'tokens.token': token})
        
        if (!user) {
            console.log('Auth error')
            throw new Error('Authentication Error')
        }
        
        req.profile = user;
        req.token = token
        next()
    } catch (error:any) {
        res.status(401).send({error: error.message});
    }
}

export default authMiddleware