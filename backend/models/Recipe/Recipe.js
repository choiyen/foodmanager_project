/**
 * recipe 모델 정의
 * @param {import('sequelize').Sequelize} Sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

const Recipe = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "recipe",
    {
      recipeID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userID: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      describe: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      level: {
        type: DataTypes.ENUM("상", "중", "하"),
        defaultValue: "중",
        allowNull: false,
      },
      time: {
        type: DataTypes.ENUM("15min", "30min", "60min", "etc"),
        defaultValue: "30min",
        allowNull: false,
      },
      amount: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      img: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "recipe",
      freezeTableName: true,
      timestamps: true,
    }
  );
};

module.exports = Recipe; // module.export -> module.exports
