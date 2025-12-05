import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userService } from "../data/userService.js";

const getAll = async (req, res) => {
    const users = await userService.getUsers();
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
    console.log("Registering user:", req.body.userName);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log("Hashed password for register:", hashedPassword);
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

const login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        if (!(userName && password)) {
            return res.status(400).send("All input is required");
        }

        const user = await userService.getUser(userName);
        console.log("Login attempt for:", userName);
        console.log("User found:", user ? "Yes" : "No");

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            console.log("Password match:", isMatch);

            if (isMatch) {
                const token = jwt.sign(
                    { username: userName },
                    process.env.TOKEN_KEY || "test_key",
                    {
                        expiresIn: "2h",
                    }
                );

                user.token = token;
                return res.status(200).json(user);
            }
        }
        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

export default { getAll, getById, create, updateById, deleteById, login };