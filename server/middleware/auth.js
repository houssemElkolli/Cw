import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
    try {
        let accessToken = req.headers.Authorization || req.headers.authorization;
        if (!accessToken) {
            return res.status(403).send("Access Denied");
        }

        if (accessToken.startsWith("Bearer ")) {
            accessToken = accessToken.slice(7, accessToken.length).trimLeft();
        }

        const verified = jwt.verify(
            accessToken,
            process.env.ACCESS_JWT_SECRET,
            async (err, decoded) => {
                if (err) return res.status(403).json({ message : "Forbidden"});
                req._id = decoded._id;
                req.email = decoded.email;
                req.role = decoded.role;
                next();
            }
        );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export default verifyToken;
