import CarController from "../controllers/CarsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

export default (app) => {
    app.route('/api/v1/cars')
        .get(CarController.getAllCars)
        .post(authMiddleware, CarController.createCar);
    app.route('/api/v1/cars/:id')
        .get(CarController.getById)
        .put(authMiddleware, CarController.updateById)
        .delete(authMiddleware, CarController.deleteCar);
}