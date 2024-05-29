import Hotel from "../models/Hotel.js";
// create new hotel
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
        const saveHotel = await newHotel.save();
        res.status(200).json(saveHotel)
    } catch (error) {
        next(error);
    }
}

// update hotel
export const updateHotel = async (req, res, next) => {
    const updateHotel = await Hotel.findByIdAndUpdate(req.params.id,
        { $set: req.body },
        { new: true }
    )
    try {
        res.status(200).json(updateHotel)
    } catch (error) {
        next(error);
    }
}

// delete hotel
export const deleteHotel = async (req, res, next) => {
    const deleteHotel = await Hotel.findByIdAndDelete(req.params.id,
        { $set: req.body },
        { new: true }
    )
    try {
        res.status(200).json(deleteHotel)
    } catch (error) {
        next(error)
    }
}

// get hotel by id
export const getHotel = async (req, res, next) => {
    const getHotel = await Hotel.findById(req.params.id)
    try {
        res.status(200).json(getHotel)
    } catch (error) {
        next(error)
    }
}

// get all hotel
export const allHotel = async (req, res, next) => {
    try {
        const allHotel = await Hotel.find();
        res.status(200).json(allHotel)
    } catch (error) {
        next(error)
    }
}
