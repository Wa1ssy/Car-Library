import { db } from "./dbConfig.js";

export const carService = {
  getCar: async (carId) => {
    const car = await db.Cars.findByPk(carId, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    return car ? car.get({ plain: true }) : undefined;
  },

  getCars: async () => {
    const cars = await db.Cars.findAll({
      attributes: ['id', 'name'],
    });
    return cars.map(c => c.get({ plain: true }));
  },

  createCar: async (name, model, releaseDate, price) => {
    const createdCar = await db.Cars.create({
      name,
      model,
      releaseDate,
      price
    });
    return createdCar.get({ plain: true });
  },

  async deleteCar(carId) {
    const deleteResult = await db.Cars.destroy({
      where: {
        id: carId,
      },
    });
    return deleteResult !== 0;
  },
};
