import express from 'express';
import { createError } from '../utils/error.js';
import { allHotel, createHotel, deleteHotel, getHotel, updateHotel } from '../controllers/hotel.js';
const router = express.Router();

// CREATE
router.post("/", createHotel)


// UPDATE
router.put("/:id", updateHotel)

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
router.delete("/:id", deleteHotel)


// GET
router.get("/:id", getHotel)

// GET ALL HOTEL
router.get("/", allHotel)

export default router;