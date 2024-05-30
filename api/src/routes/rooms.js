import express from 'express';
import { verifyAdmin } from "../utils/verifyToken.js";
import { allRoom, createRoom, deleteRoom, getRoom, updateRoom } from '../controllers/room.js';

const router = express.Router();

// CREATE
router.post("/:hotelid", verifyAdmin, createRoom)

// UPDATE
router.put("/:id", verifyAdmin, updateRoom)

// Delete 
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom)

// GET
router.get("/:id", getRoom)

// GET ALL USER
router.get("/", allRoom)


export default router;