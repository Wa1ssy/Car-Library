export default (db) => {
    db.Cars.belongsToMany(db.Users, { through: db.CarPlays, as: "Drivers" });
    db.Users.belongsToMany(db.Cars, { through: db.CarPlays });

    db.Cars.belongsTo(db.Users, { as: 'Owner', foreignKey: 'userId' });
    db.Users.hasMany(db.Cars, { as: 'OwnedCars', foreignKey: 'userId' });
}