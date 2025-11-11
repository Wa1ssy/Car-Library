export default (sequelize, DataTypes) => {
  return sequelize.define(
    "CarPlay",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      driveTimeMinutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }
  );
};
