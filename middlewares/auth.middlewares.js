const jwt = require('jsonwebtoken');


const authentication = async (req, res, next) => {
    console.log("Authentication middleware called");
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    // check if token exit / user is logged in
    if (!token) {
        return res.json({
            message: "You are not logged in, please login to continue",
        })
    }
    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
        if (error) {
            return res.json({
                message: "Session expired",
            });
        }
        req.user = {id: payload.id, admin: payload.admin
        };
    })
    next();
};


module.exports = authentication;