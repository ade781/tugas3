import { where } from "sequelize";
import User from "../models/UserModel.js";

// buat metod nya kita ngeget dulu 

export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const createUsers = async (req, res) => {
    try {
        await User.create(req.body);
        res.status(201).json({ msg: "Note created" });
    } catch (error) {
        console.log(error.message);
    }
};



export const updateUser = async (req, res) => {
    try {
        await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Note update" })
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUser = async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "user update" })
    } catch (error) {
        console.log(error.message);
    }
}