import { carService } from "../data/carService.js";

const getAllCars = async (_req, res) => {
  const cars = await carService.getCars();
  return res.json(cars);
};

const getById = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({ error: "URL does not contain ID" });
  }
  const car = await carService.getCar(req.params.id);
  if (!car) {
    return res.status(404).send({ error: "Car not found" });
  }
  return res.json(car);
};

const createCar = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ error: "Missing or empty required field: name" });
  }
  const releaseDate = Date.parse(req.body.releaseDate);
  if (req.body.releaseDate && isNaN(releaseDate)) {
    return res.status(400).send({ error: "Empty or malformed date string in field: releaseDate" });
  }
  const price = parseFloat(req.body.price);
  if (req.body.price && isNaN(price)) {
    return res.status(400).send({ error: "Malformed number string in field: price" });
  }
  const car = await carService.createCar(req.body.name, req.body.model, releaseDate, price, req.user.username);
  return res.json(car);
};

const updateById = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({ error: "URL does not contain ID" });
  }
  const existingCar = await carService.getCar(req.params.id);
  if (!existingCar) {
    return res.status(404).send({ error: "Car not found" });
  }
  if (existingCar.userId !== req.user.username) {
    return res.status(403).send({ error: "You are not the owner of this car" });
  }

  const updatedCar = await carService.updateCar(req.params.id, req.body);
  if (!updatedCar) {
    return res.status(404).send({ error: "Car not found" });
  }
  return res.json(updatedCar);
};

const deleteCar = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({ error: "URL does not contain ID" });
  }
  const existingCar = await carService.getCar(req.params.id);
  if (!existingCar) {
    return res.status(404).send({ error: "Car not found" });
  }
  if (existingCar.userId !== req.user.username) {
    return res.status(403).send({ error: "You are not the owner of this car" });
  }

  const deleted = await carService.deleteCar(req.params.id);
  if (!deleted) {
    return res.status(404).send({ error: "Car not found" });
  }
  return res.status(204).send();
};

export default { getById, getAllCars, createCar, deleteCar, updateById };
