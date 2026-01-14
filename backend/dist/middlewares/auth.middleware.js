import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
    let token = req.cookies['token'];
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const secretKey = process.env.JWT_SECRET_KEY;
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        else {
            req.user = decoded;
            next();
        }
    });
};
export default authMiddleware;
//# sourceMappingURL=auth.middleware.js.map