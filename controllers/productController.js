const { bcryptPass, comparePass } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { Product, Image, User, Category } = require("../models");
const { Op } = require("sequelize");
class Controller {
  static async products(req, res, next) {
    try {
      const products = await Product.findAll({
        include: [Image, Category, User],
      });
      res.status(201).json({
        products,
      });
    } catch (error) {
      next(error);
    }
  }
  static async createProduct(req, res, next) {
    try {
      const {
        name,
        description,
        price,
        mainImg,
        categoryId,
        img1,
        img2,
        img3,
      } = req.body;
      const slug = name.replace(" ", "-");
      const product = await Product.create({
        name: name,
        slug: slug,
        description: description,
        price: price,
        mainImg: mainImg,
        authorId: req.additionalData.id,
        categoryId: categoryId,
      });
      let images = [];
      images.push(
        {
          productId: product.id,
          imgUrl: img1,
        },
        {
          productId: product.id,
          imgUrl: img2,
        },
        {
          productId: product.id,
          imgUrl: img3,
        }
      );
      const imagesData = await Image.bulkCreate(images);
      res.status(201).json({
        product,
        images,
        imagesData,
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const images = await Image.destroy({ where: { productId: id } });
      const product = await Product.destroy({ where: { id } });

      res.status(201).json({
        images,
        product,
      });
    } catch (error) {
      next(error);
    }
  }
  static async viewProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({
        where: { id },
        include: [{ model: Image }, { model: Category }, { model: User }],
      });

      res.status(201).json({
        product,
      });
    } catch (error) {
      next(error);
    }
  }
  static async editProduct(req, res, next) {
    try {
      const { id } = req.params;
      const {
        name,
        description,
        price,
        mainImg,
        categoryId,
        img1,
        img2,
        img3,
      } = req.body;
      const slug = name.replace(" ", "-");
      const product = await Product.update(
        {
          name: name,
          slug: slug,
          description: description,
          price: price,
          mainImg: mainImg,
          categoryId: categoryId,
        },
        {
          where: { id },
        }
      );
      await Image.destroy({ where: { productId: id } });
      let images = [];
      images.push(
        {
          productId: id,
          imgUrl: img1,
        },
        {
          productId: id,
          imgUrl: img2,
        },
        {
          productId: id,
          imgUrl: img3,
        }
      );
      const imagesData = await Image.bulkCreate(images);
      res.status(201).json({
        product,
        imagesData,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
