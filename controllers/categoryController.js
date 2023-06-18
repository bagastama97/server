const { bcryptPass, comparePass } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { Category } = require("../models");
const { Op } = require("sequelize");
class Controller {
  static async categories(req, res, next) {
    try {
      const categories = await Category.findAll();

      res.status(201).json({
        categories,
      });
    } catch (error) {
      next(error);
    }
  }
  static async createCategory(req, res, next) {
    try {
      const { name } = req.body;
      const category = await Category.create({
        name: name,
      });

      res.status(201).json({
        category,
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.destroy({
        where: { id },
      });

      res.status(201).json({
        category,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
