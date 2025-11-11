import { db } from "./dbConfig.js";
const { Cars, Users } = db;

export const carService = {
  getCar: async (carId) => {
    const car = await Cars.findOne({
      where: {
        id: carId,
      },
      include: {
        model: Users,
        as: "Drivers",
      },
    });
    return car ? car.get({ plain: true }) : undefined;
  },

  getCars: async () => {
    const cars = await Cars.findAll({
      attributes: ['id', 'name'],
    });
    return cars.map(c => c.get({ plain: true }));
  },

  createCar: async (name, model, releaseDate, price) => {
    const createdCar = await Cars.create({
      name,
      model,
      releaseDate,
      price,
    });
    return createdCar.get({ plain: true });
  },

  async deleteCar(carId) {
    const deleteResult = await Cars.destroy({
      where: {
        id: carId,
      },
    });
    return deleteResult !== 0;
  },
};
