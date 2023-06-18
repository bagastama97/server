"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Image, {
        foreignKey: "productId",
      });
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
      Product.belongsTo(models.User, {
        foreignKey: "authorId",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      mainImg: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
