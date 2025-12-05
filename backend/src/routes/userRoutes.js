import UsersController from "../controllers/UsersController.js";
import auth from "../middleware/authMiddleware.js";

export default (app) => {
    app.route('/api/v1/users')
        .get(UsersController.getAll)
        .post(UsersController.create);

    app.route('/api/v1/users/login')
        .post(UsersController.login);
    app.route('/api/v1/users/:username')
        .get(auth, UsersController.getById)
        .put(auth, UsersController.updateById)
        .delete(auth, UsersController.deleteById);
}