export default (db) => {
    db.Cars.belongsToMany(db.Users, { through: db.CarPlays, as: "Drivers"});
    db.Users.belongsToMany(db.Cars, { through: db.CarPlays});
}