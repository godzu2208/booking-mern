import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// register
export const register = async (req, res, next) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })

        await newUser.save()
        res.status(200).json("Create new user successfully")
    } catch (error) {
        next(error);
    }
}

// login
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        })
        // check username
        if (!user) {
            return next(createError(404, "User not found"))
        }
        // check password
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) {
            return next(createError(404, "Password is incorrect"))
        }

        const token = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SECRET_KEY
        )

        const { password, isAdmin, ...otherDetails } = user._doc;

        res.cookie("access_token", token,{
            httpOnly: true,
        }).status(200).json({ ...otherDetails });



    } catch (error) {
        next(error);
    }
}