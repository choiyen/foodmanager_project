/**
 * recipecomment 모델 정의
 * @param {import('sequelize').Sequelize} Sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

const RecipeReview = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "recipeReview",
    {
      userID: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      recipeID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "recipeReview",
      freezeTableName: true,
      timestamps: false,
    }
  );
};

module.exports = RecipeReview;
