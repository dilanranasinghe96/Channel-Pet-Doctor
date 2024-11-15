// authMiddleware.js
const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");

        // If token is present in the header
        if (token) {
            // Remove 'Bearer ' prefix if it exists
            token = token.startsWith("Bearer ") ? token.slice(7) : token;

            // Verify the token using JWT secret
            verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    console.log("Token verification failed:", err); // Log the error
                    return res.status(401).json({
                        success: 0,
                        message: "Invalid or expired token"
                    });
                } else {
                    // Attach decoded token to the request object for later use
                    req.user = decoded;
                    next();  // Call the next middleware or route handler
                }
            });
        } else {
            console.log("Authorization header missing");  // Log if token is missing
            return res.status(403).json({
                success: 0,
                message: "Access denied! Unauthorized user"
            });
        }
    }
};
