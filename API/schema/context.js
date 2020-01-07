import { verify } from 'jsonwebtoken'

const context = ({ req, connection }) => {
    try {
        const authorization = req.headers.authorization || "";
        const token = verify(authorization, "asdasdsads");
        return { user: token[0] }
    } catch (ex) {
        return { user: null }
    }
}

export default context