import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { carService } from './data/carService.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './docs/swagger.json' with { type: 'json' };

dotenv.config();

const app = express();
app.use(express.json());
const httpServer = http.createServer(app);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get('/', async (_req, res) => {
  res.status(200).type('text/html').send(`<a href="/docs">swagger</a>`);
});

app.get('/api/v1/cars/:id', async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({ error: 'URL does not contain ID' });
  }
  const car = await carService.getCar(req.params.id);
  if (!car) {
    return res.status(404).send({ error: 'Car not found' });
  }
  return res.json(car);
});

app.get('/api/v1/cars', async (_req, res) => {
  const cars = await carService.getCars();
  return res.json(cars);
});

app.post('/api/v1/cars', async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ error: 'Missing or empty required field: name' });
  }
  const releaseDate = Date.parse(req.body.releaseDate);
  if (req.body.releaseDate && isNaN(releaseDate)) {
    return res.status(400).send({ error: 'Empty or malformed date string in field: releaseDate' });
  }
  const price = parseFloat(req.body.price);
  if (req.body.price && isNaN(price)) {
    return res.status(400).send({ error: 'Malformed number string in field: price' });
  }
  const car = await carService.createCar(req.body.name, req.body.model, releaseDate, price);
  return res.json(car);
});

app.delete('/api/v1/cars/:id', async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({ error: 'URL does not contain ID' });
  }
  const deleted = await carService.deleteCar(req.params.id);
  if (!deleted) {
    return res.status(404).send({ error: 'Car not found' });
  }
  return res.status(204).send();
});

const PORT = process.env.PORT;

httpServer.listen(PORT, async () => {
  console.log(`Server is running at ${process.env.SERVER_URL}:${PORT}/`);
});

export { httpServer, app };
