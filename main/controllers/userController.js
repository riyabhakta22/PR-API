const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")
const bcryptjs = require('bcryptjs')
const Config = require("../config")

const userController = {
    create: async (req, res) => {
        try {
            const { username, email, password } = req.body
            const user = await userModel.findOne({ email })

            if (user) {
                return res.status(400).json({
                    message: 'Email already Exist',
                    success: false
                })
            }

            // hashing password
            const _SALT_ROUND = 10;
            const hashedPassword = await bcryptjs.hash(password, _SALT_ROUND)
            // console.log(hashedPassword)

            const data = await userModel.create({ username, email, password: hashedPassword })
            res.status(201).json({
                message: 'SignUp Successfully',
                success: true,
                data
            })
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({
                message: 'Error while creating user in DB',
                success: false
            })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await userModel.findOne({ email })

            if (!user) {
                return res.status(401).json({
                    message: "Invalid Email Or Password",
                    success: false
                })
            }

            const isVerify = await bcryptjs.compare(password, user.password)

            if (!isVerify) {
                return res.status(401).json({
                    message: "invalid email or password",
                    success: false
                })
            }

            // jwt token generate
            const payload = {
                sub: user._id,
                username: user.username
            }

            const token = jwt.sign(payload, Config.JWT_SECRET, {
                expiresIn: "1d"
            })

            // console.log(token)

            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 //24 Hr
            })

            res.json({
                message: "Login Successfull",
                success: true,
                token
            })

        } catch (error) {
            console.error('Error while login user:', error);
            res.status(500).json({
                message: 'Error while login user in DB',
                success: false
            })
        }
    },
    self: async (req, res) => {
        try {
            const payload = req.user
            // console.log(payload)
            const user = await userModel.findById(payload.sub).select('-password -createdAt -updatedAt -__v')
            // console.log(user)
            res.status(404).json({
                message: "self",
                success: true,
                data: user
            })

        } catch (error) {
            console.error('Error Self user:', error);
            res.status(500).json({
                message: 'Error ',
                success: false
            })
        }
    }
}

module.exports = userController