import CarController from "../controllers/CarsController.js";

export default(app) => {
    app.route('/api/v1/cars')
        .get(CarController.getAllCars)
        .post(CarController.createCar);       
    app.route('/api/v1/cars/:id')
        .get(CarController.getById)
        .put(CarController.updateById)
        .delete(CarController.deleteCar);
}