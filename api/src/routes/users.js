import express from 'express';
import { allUser, deleteUser, getUser, updateUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';


const router = express.Router();
// check authentication
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("You are authenticated")
// })
// // check user
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("You are logged and delete account")
// })
// // check isAdmin  
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Welcome to Admin Pannel")
// })

// UPDATE
router.put("/:id", verifyUser, updateUser)

// Delete 
router.delete("/:id", verifyUser, deleteUser)

// GET
router.get("/:id", verifyUser, getUser)

// GET ALL USER
router.get("/", verifyAdmin, allUser)

export default router;