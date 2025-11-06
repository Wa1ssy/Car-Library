export default (sequelize, DataTypes) => {
  return sequelize.define(
    "Car",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING,
      },
      releaseDate: {
        type: DataTypes.DATE,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2), // 99 999 999.99
      },
    }
  );
};
