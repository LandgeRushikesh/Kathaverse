import jwt from 'jsonwebtoken'
import { User } from '../Models/UserModel.js';

const optionalAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id)

        } catch (error) {
            // ingore
        }
    }
    next()
}

export default optionalAuth;