const { bcryptPass, comparePass } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { User } = require("../models");
const { Op } = require("sequelize");
class Controller {
  static async login(req, res, next) {
    try {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const { email, password } = req.body;
      if (!mailformat.test(email)) throw { name: "invalid format email" };
      if (!email) throw { name: "empty email" };
      if (!password) throw { name: "empty password" };
      if (password.length < 5) throw { name: "password minimum" };
      const hashPass = bcryptPass(password);
      const userData = await User.findOne({
        where: { email: email },
      });
      if (!userData) throw { name: "account not found" };
      userData.password;
      if (!comparePass(password, userData.password))
        throw { name: "account not found" };
      const token = generateToken({
        id: userData.id,
        username: userData.username,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
      });
      res.status(201).json({
        access_token: token,
      });
    } catch (error) {
      next(error);
    }
  }
  static async register(req, res, next) {
    try {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const { email, password, phoneNumber, address, username } = req.body;
      if (!mailformat.test(email)) throw { name: "invalid format email" };
      if (!email) throw { name: "empty email" };
      if (!password) throw { name: "empty password" };
      if (password.length < 5) throw { name: "password minimum" };
      const hashPass = bcryptPass(password);
      const findUser = await User.findOne({
        where: { email: email },
      });
      if (findUser) throw { name: "account already exist" };
      const newUserData = await User.create({
        username: username,
        email: email,
        password: hashPass,
        role: "admin",
        phoneNumber: phoneNumber,
        address: address,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(201).json({
        newUserData,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
