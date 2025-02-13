/**
 * user 모델 정의
 * @param {import('sequelize').Sequelize} Sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

const User = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "user",
    {
      userID: {
        type: DataTypes.STRING(30),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      pw: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("male", "female", "other"),
        allowNull: false,
      },
      kcalPerDay: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "user",
      freezeTableName: true,
      timestamps: false,
    }
  );
};

module.exports = User;
