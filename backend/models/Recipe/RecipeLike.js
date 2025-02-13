/**
 * recipelike 모델 정의
 * @param {import('sequelize').Sequelize} Sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */


/**
 * recipelike 모델 정의
 * @param {import('sequelize').Sequelize} Sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

const RecipeLike = (Sequelize, DataTypes) => {
    return Sequelize.define(
      "recipeLike",
      {
        userID: {
          type: DataTypes.STRING(20),
          allowNull: false,
          primaryKey: true,
        },
        recipeID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
      },
      {
        tableName: "recipeLike",
        freezeTableName: true,
        timestamps: false,
        primaryKey: ["userID", "recipeID"],
      }
    );
  };

module.exports = RecipeLike;
