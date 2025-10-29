import express from 'express';
import http from 'http';
import dotenv from 'dotenv';    
import { sync } from './data/dbConfig.js';
import { userService } from './data/userService.js';
import { carService } from './data/CarService.js';
import Cars from "./data/CarModel.js";
dotenv.config();

const app = express();
const httpServer = http.createServer(app);

app.get('/', async (req, res) => {
    const user =  await userService.getUser("Mihkel");
    res.status(200).type("text/plain").send(`Hello, ${user.username}!`);
});

app.get('/api/v1/cars/:id', async (req, res) => {
    if(!req.params.id){
        return res.status(400).send({error: "URL does not contain ID"});
    }
    const car = await carService.getCar(req.params.id);
    if(!car){
        return res.status(404).send({error: "Game not found"});
    }
    return res.json(car);
})

app.get('/api/v1/cars', async (req, res) => {
    const cars = await carService.getCars();
    return res.json(cars);
});

const PORT = process.env.PORT;

httpServer.listen(PORT, async() => {
    await sync();
    await userService.createUser("Mihkel", "pass");
    console.log(`Server is running at ${process.env.SERVER_URL}:${PORT}/`);
});

export {httpServer, app};