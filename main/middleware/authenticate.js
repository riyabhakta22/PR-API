const jwt = require("jsonwebtoken")
const Config = require("../config")

const authenticate = (req, res, next) => { 
    try {
        // console.log('ok')
        const token = req.headers.authorization || req.headers.Authorization
        // console.log(token)
        if(!token){
            return res.status(401).json({
                message : "Token not Found or Invalid",
                success : false
            })
        }

        
        // const payload = jwt.verify(token, Config.JWT_SECRET)
        
        const accessToken = token.split(' ')[1]
        // console.log(accessToken)

        const payload = jwt.verify(accessToken, Config.JWT_SECRET, (err, decoded) => {
            if(err){
                return res.status(401).json({
                    message : "Token not Found or Invalid.....",
                    success : false
                })
            }
            return decoded
        })
        // console.log(payload)
        if(!payload){
            return res.status(401).json({
                message : "Token not Found or Invalid",
                success : false
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
module.exports = authenticate