export default (db) => {
    db.Games.belongsToMany(db.Users, { through: db.GamePlays, as: "Drivers"});
    db.Users.belongsToMany(db.Cars, { through: db.CarPlays});
}