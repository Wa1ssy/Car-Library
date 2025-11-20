import {db} from './dbConfig.js'

const {Users} = db;
export const userService = {
    createUser: async (username, hashedPassword) => {
        if (await Users.findByPk(username)) {
            throw new Error("Username already exists");
        }
        await Users.create({username, password: hashedPassword});
        return {username};
    },
    getUser: async (username) => {
        const user = await Users.findByPk(username);
        return user ? user.get({plain: true}) : undefined;
    },
    getUsers: async () => {
        const users = await Users.findAll({
            attributes: ['userName'],
        });
        return users.map(g => g.get({plain: true}));
    },
    updateUser: async (username, user) => {
        const [updatedCount, _] = await Users.update(user, {where: {username}});
        if (updatedCount > 0) {
            return await Users.findByPk(username);
        }
        return null;
    },
    deleteUser: async (username) => {
        const deleteResult = await Users.destroy({
            where: {
                username,
            },
        });
        return deleteResult !== 0;
    }
}
