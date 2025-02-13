/**
 * default recipe 모델 정의
 * @param {import('sequelize').Sequelize} Sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

const DefaultRecipe = (Sequelize, DataTypes) => {
    return Sequelize.define(
        "defaultRecipe",
        {
            recipeSEQ: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            img: {
              type: DataTypes.TEXT,
              allowNull: true,
            },
            describe: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            category: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            ingredients: {
                type: DataTypes.JSON,
                allowNull: false,
            },
            steps: {
                type: DataTypes.JSON,
                allowNull: false,
            }
        },
        {
            tableName: "defaultRecipe",
            freezeTableName: true,
            timestamps: false,
        }
    )
}

module.exports = DefaultRecipe;