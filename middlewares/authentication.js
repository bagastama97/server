const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");
const Authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "Unauthenticate" };

    const payload = verifyToken(access_token);
    console.log(payload);
    let user = {};
    user = await User.findOne({ where: { id: payload.id } });
    if (!user) throw { name: "Unauthenticate" };
    req.additionalData = {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };
    next();
  } catch (err) {
    next(err);
  }
};
module.exports = Authentication;
