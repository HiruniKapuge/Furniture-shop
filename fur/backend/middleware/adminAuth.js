// import jwt from 'jsonwebtoken';

// const adminAuth = (req, res, next) => {
//     try {
//         const {token} = req.headers
//         if (!token) {
//             return res.json({ success: false, message: "Unauthorized to access" })
//         }
//         const token_decoded = jwt.verify(token, process.env.JWT_SECRET)
//         if (token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//             return res.json({ success: false, message: "Unauthorized to access" })
//         }
//         next()
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
        
//     }
// }

// export default adminAuth

// In backend/middleware/adminAuth.js

import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
    // 1. Get the token from the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Admin authorization failed. Token not found." });
    }

    const token = authHeader.split(' ')[1];

    try {
        // 2. Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Check if the user has the 'admin' role
        if (decoded.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Access denied. Not an admin." });
        }

        // 4. Attach admin info to the request and proceed
        req.admin = decoded;
        next();

    } catch (error) {
        console.error("Admin Auth Error:", error);
        return res.status(401).json({ success: false, message: "Invalid token." });
    }
};

export default adminAuth;

