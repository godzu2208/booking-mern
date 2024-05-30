import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

// create rooms
export const createRoom = async (req, res, next) => {

    const hotelID = req.params.hotelid;

    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelID, {
                $push: { rooms: savedRoom._id }
            });
        } catch (error) {
            next(error);
        }

        res.status(200).json(savedRoom);
    } catch (err) {
        next(err);
    }
}

// update rooms
export const updateRoom = async (req, res, next) => {
    const updateRoom = await Room.findByIdAndUpdate(req.params.id,
        { $set: req.body },
        { new: true }
    )
    try {
        res.status(200).json(updateRoom)
    } catch (error) {
        next(error);
    }
}

// delete rooms
export const deleteRoom = async (req, res, next) => {
    const hotelID = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelID, {
                $pull: { room: req.params.id }
            });
        } catch (err) {
            next(err);
        }
    } catch (error) {
        next(error);
    }
    res.status(200).json("Deleted Room")

}

// get Room by id
export const getRoom = async (req, res, next) => {
    const getRoom = await Room.findById(req.params.id)
    try {
        res.status(200).json(getRoom)
    } catch (error) {
        next(error)
    }
}

// get all Room
export const allRoom = async (req, res, next) => {
    try {
        const allRoom = await Room.find();
        res.status(200).json(allRoom)
    } catch (error) {
        next(error)
    }
}
