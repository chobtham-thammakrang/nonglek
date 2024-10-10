const jwt = require('jsonwebtoken')

async function authToken(req, res, next){
    try{
        let token = req.cookies?.token

        // Check for Authorization header if token is not in cookies
        if (!token) {
            const authHeader = req.headers['authorization'];
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.split(' ')[1];
            }
        }

        if(!token){
            return res.status(401).json({
                message : "Please login",
                error : true,
                success : false,
            })
        }
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            if(err){
                console.log("JWT verification error:", err)
                return res.status(403).json({
                    message : "Invalid or expired token",
                    error : true,
                    success : false,
                })
            }

            if (!decoded || !decoded.userId) {
                return res.status(401).json({
                    message : "Invalid token structure",
                    error : true,
                    success : false,
                })
            }

            req.user = { id: decoded.userId }
            next()
        });
    }catch(error){
        console.error("Auth middleware error:", error);
        res.status(400).json({
            message : error.message,
            data : [],
            error : true,
            success : false
        })
    }
}

module.exports = authToken