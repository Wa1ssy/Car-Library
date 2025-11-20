import bcrypt from 'bcryptjs';
import {userService} from "../data/userService.js";

const getAll = async (req, res) => {
    const users =await userService.getUsers();
    return res.json(users);
}

const getById = async (req, res) => {
    if (!req.params.userName) {
        return res.status(400).send({ error: "URL does not contain userName" });
    }
    const user = await userService.getUser(req.params.userName);
    if (!user) {
        return res.status(404).send({ error: "User not found" });
    }
    return res.json(user);
}

const create = async (req, res) => {
    if (!req.body.userName) {
        return res.status(400).send({ error: "Missing or empty required field: userName" });
    }
    if (!req.body.password) {
        return res.status(400).send({ error: "Missing or empty required field: password" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const users = await userService.createUser(req.body.userName, hashedPassword);
    return res.json(users);
}

const updateById = async (req, res) => {
    if (!req.params.userName) {
        return res.status(400).send({ error: "URL does not contain userName" });
    }
    const updatedUser = await userService.updateUser(req.params.userName, req.body);
    if (!updatedUser) {
        return res.status(404).send({ error: "User not found" });
    }
    return res.json(updatedUser);
}

const deleteById = async (req, res) => {
    if (!req.params.userName) {
        return res.status(400).send({ error: "URL does not contain userName" });
    }
    const userDeleted = await userService.deleteUser(req.params.userName);
    if (!userDeleted) {
        return res.status(404).send({ error: "User not found" });
    }
    return res.status(204).send();
}

export default { getAll, getById, create, updateById, deleteById };