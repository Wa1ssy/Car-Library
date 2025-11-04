import express from 'express';
import http from 'http';
import dotenv from 'dotenv';    
import { sync } from './data/dbConfig.js';
import { userService } from './data/userService.js';
import { carService } from './data/carService.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './docs/swagger.json' with { type: "json" };

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get('/', async (req, res) => {
  const user = await userService.getUser("Mihkel");
  res.status(200).type("text/plain").send(`Hello, ${user.username}!`);
});

app.get('/api/v1/cars/:id', async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({ error: "URL does not contain ID" });
  }
  const car = await carService.getCar(req.params.id);
  if (!car) {
    return res.status(404).send({ error: "Car not found" });
  }
  return res.json(car);
});

app.get('/api/v1/cars', async (_req, res) => {
  const cars = await carService.getCars();
  return res.json(cars);
});

app.post('/api/v1/cars', async (req, res) => {
  const { name, manufacturer, releaseDate: releaseDateRaw, price: priceRaw } = req.body;

  if (!name) {
    return res.status(400).send({ error: "Missing or empty required field: name" });
  }

  const releaseDate = releaseDateRaw !== undefined && releaseDateRaw !== null && releaseDateRaw !== ''
    ? Date.parse(releaseDateRaw)
    : undefined;

  if (releaseDateRaw && isNaN(releaseDate)) {
    return res.status(400).send({ error: "Empty or malformed date string in field: releaseDate" });
  }

  const price = priceRaw !== undefined && priceRaw !== null && priceRaw !== ''
    ? parseFloat(priceRaw)
    : undefined;

  if (priceRaw && isNaN(price)) {
    return res.status(400).send({ error: "Malformed number string in field: price" });
  }

  const created = await carService.createCar(name, manufacturer, releaseDate, price);
  return res
    .status(201)
    .location(`/api/v1/cars/${created.id}`)
    .json(created);
});

app.delete('/api/v1/cars/:id', async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({ error: "URL does not contain ID" });
  }
  const deleted = await carService.deleteCar(req.params.id);
  if (!deleted) {
    return res.status(404).send({ error: "Car not found" });
  }
  return res.status(204).send();
});

const PORT = process.env.PORT;

httpServer.listen(PORT, async () => {
  await sync();
  await userService.createUser("Mihkel", "pass");
  console.log(`Server is running at ${process.env.SERVER_URL}:${PORT}/`);
});

export { httpServer, app };
