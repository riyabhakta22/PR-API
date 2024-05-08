const jwt = require("jsonwebtoken")
const Config = require("../config")

const cookieAuth = (req, res, next) => {
    try {

        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                message: "Token not Found or Invalid",
                success: false
            })
        }

        const payload = jwt.verify(token, Config.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Token not Found or Invalid.....",
                    success: false
                })
            }
            return decoded
        })
        
        if (!payload) {
            return res.status(401).json({
                message: "Token not Found or Invalid",
                success: false
            })
        }
        req.user = payload
        next();
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error while verifying token',
            success: false
        })
    }
}
module.exports = cookieAuth