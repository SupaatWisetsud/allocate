import { verify } from 'jsonwebtoken';

export const context = ({ req, connection }) => {
    
    try {
        const authorization = req.headers.authorization || "";
        const token = verify(authorization, "asdasdsads");
        
        return { user: token._doc }
    } catch (ex) {
        return { user: null }
    }
}