import Cars from "./CarModel.js";

export const carService = {
    getCar: async (carId) => {
        const car = await Cars.findByPk(carId, {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });
        return car ? car.get({ plain: true }) : undefined;
    },

    getCars: async () => {
        const cars = await Cars.findAll({
            attributes: ['id', 'name'],
        });
        return cars.map(c => c.get({ plain: true }));
    },
    
    createCar: async (name, manufacturer, releaseDate, price) => {
        const createdCar = await Cars.create({
            name,
            manufacturer,
            releaseDate,
            price
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
    }
};
