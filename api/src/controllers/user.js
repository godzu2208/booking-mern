import User from "../models/User.js";


// update User
export const updateUser = async (req, res, next) => {
    const updateUser = await User.findByIdAndUpdate(req.params.id,
        { $set: req.body },
        { new: true }
    )
    try {
        res.status(200).json(updateUser)
    } catch (error) {
        next(error);
    }
}

// delete User
export const deleteUser = async (req, res, next) => {
    const deleteUser = await User.findByIdAndDelete(req.params.id,
        { $set: req.body },
        { new: true }
    )
    try {
        res.status(200).json(deleteUser)
    } catch (error) {
        next(error)
    }
}

// get User by id
export const getUser = async (req, res, next) => {
    const getUser = await User.findById(req.params.id)
    try {
        res.status(200).json(getUser)
    } catch (error) {
        next(error)
    }
}

// get all User
export const allUser = async (req, res, next) => {
    try {
        const allUser = await User.find();
        res.status(200).json(allUser)
    } catch (error) {
        next(error)
    }
}
