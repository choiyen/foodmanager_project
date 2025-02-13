/**
 * posting 모델 정의
 * @param {import('sequelize').Sequelize} Sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

const Posting = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "posting",
    {
      postingID: {
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
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      img: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    },
    {
      tableName: "posting",
      freezeTableName: true,
      timestamps: true,
    }
  );
};

module.exports = Posting;
