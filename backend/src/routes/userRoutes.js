import UsersController from "../controllers/UsersController.js";

export default (app) => {
    app.route('/api/v1/users')
        .get(UsersController.getAll)
        .post(UsersController.create);

    app.route('/api/v1/users/login')
        .post(UsersController.login);
    app.route('/api/v1/users/:username')
        .get(UsersController.getById)
        .put(UsersController.updateById)
        .delete(UsersController.deleteById);
}