const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");

const checkAuth = (req, res, next) => {
  const authHedear = req.headers.authorization;

  if (!authHedear) {
    return next(HttpError("Unouthorized", 401));
  }

  const [bearer, token] = authHedear.split(" ", 2);

  if (!token || bearer !== "Bearer") {
    return next(HttpError("Unouthorized", 401));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(HttpError("Unouthorized", 401));
    }
    req.userId = decoded.userId;
    next();
  });
};

module.exports = {
  checkAuth,
};
