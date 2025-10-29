import Cars from "./CarModel.js";

export const carService = {
    getCar: async (carId) => {
        const car = await Cars.findByPk(carId);
        return car ? car.get({plain: true}) : undefined;
    },
    getCars: async () => {
        const cars = await Cars.findAll({
            attributes: ['id', 'name'],
        });
        return cars.map(c => c.get({plain: true}))
    }
}