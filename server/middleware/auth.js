import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization"); //front end sets the token, then i can grab it in the backend

        if (!token){
            return res.status(403).send("Access Denied"); //denies access if no token exists
        }

        //makes sure token starts with bearer string 
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        //verifies token then passes in JWT secret string 
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err){
        res.status(500).json({ error: err.message })
    }
}