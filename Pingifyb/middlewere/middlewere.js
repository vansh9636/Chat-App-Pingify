const jwt = require("jsonwebtoken");
const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ msg: "unauthenticated", success: false });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: "unauthenticated", success: false });
        }
        // console.log(decoded)
        req.user = decoded;
        next();
    });
};
module.exports = isAuthenticated;