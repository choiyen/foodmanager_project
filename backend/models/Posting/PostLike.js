/**
 * postlike 모델 정의
 * @param {import('sequelize').Sequelize} Sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

const PostLike = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "postLike",
    {
      userID: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
          model: "user",
          key: "userID",
        },
      },
      postingID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "posting",
          key: "postingID",
        },
      },
    },
    {
      tableName: "postLike",
      freezeTableName: true,
      timestamps: false,
    }
  );
};

module.exports = PostLike;
