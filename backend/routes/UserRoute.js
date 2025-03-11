import express from "express";
import {
    createUsers,
    getUsers,
    updateUser,
    deleteUser
}
    from "../controllers/UserController.js";

const router = express.Router();

//buat endpoint
router.get('/note', getUsers);
router.post('/note', createUsers);
router.put('/note/:id', updateUser);
router.delete('/note/:id', deleteUser);
export default router;
