import express from 'express';
import { createError } from '../utils/error.js';
import { allHotel, createHotel, getHotel, deleteHotel, updateHotel, countByCity, countByType, getHotelRooms } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createHotel)


// UPDATE
router.put("/:id", verifyAdmin, updateHotel)

// DELETE
// router.delete("/:id", async (req, res) => {
//     try {
//         await Hotel.findByIdAndDelete(req.params.id);
//         res.status(200).json("Deleted Hotel")
//     } catch (error) {
//         res.status(500).json(
//             error.message
//         )
//     }
// })


// Delete 
router.delete("/:id", verifyAdmin, deleteHotel)


// GET
router.get("/find/:id", getHotel)

// GET ALL HOTEL
router.get("/", allHotel)


router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/room/:id", getHotelRooms)

export default router;