import UsersController from "../controllers/UsersController.js";

export default (app) => {
    app.route('/api/v1/users')
        .get(UsersController.getAll)
        .post(UsersController.create);
    app.route('/api/v1/users/:userName')
        .get(UsersController.getById)
        .put(UsersController.updateById)
        .delete(UsersController.deleteById);
}