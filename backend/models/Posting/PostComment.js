/**
 * postcomment 모델 정의
 * @param {import('sequelize').Sequelize} Sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */


const PostComment = (Sequelize, DataTypes) => {
    return Sequelize.define(
      "postComment",
      {
        commentID: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userID: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        postingID: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        tableName: "postComment",
        freezeTableName: true,
        timestamps: true,
      }
    );
  };

module.exports = PostComment;
