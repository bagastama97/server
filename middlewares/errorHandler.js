function errorHandling(err, req, res, next) {
  try {
    switch (err.name) {
      case "empty email":
        res.status(401).json({
          message: "Email required!",
        });
        break;
      case "invalid format email":
        res.status(401).json({
          message: "Invalid email format!",
        });
        break;
      case "empty password":
        res.status(401).json({
          message: "Password required!",
        });
        break;
      case "password minimum":
        res.status(401).json({
          message: "Password minimum 5 characters",
        });
        break;
      case "account not found":
        res.status(401).json({
          message: "Account not found",
        });
        break;
      case "account already exist":
        res.status(401).json({
          message: "Account already exist",
        });
        break;
      case "Unauthenticate":
        res.status(401).json({
          message: "Unauthenticate",
        });
        break;
      default:
        res.status(500).json({
          allErrors: err,
          message: "Internal server error",
        });
        break;
    }
  } catch (error) {
    next(error);
  }
}

module.exports = errorHandling;
