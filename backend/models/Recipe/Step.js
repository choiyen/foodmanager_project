/**
 * step 모델 정의
 * @param {import('sequelize').Sequelize} Sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

const Step = (Sequelize, DataTypes) => {
    return Sequelize.define(
      "step",
      {
        recipeID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        stepNo: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        tableName: "step",
        freezeTableName: true,
        timestamps: false,
      }
    );
  };

module.exports = Step;
