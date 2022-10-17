const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({ data: { error: "unauthorized" } });
    }

    // ToDo вынести токен в конфиг
    // const decoded = jwt.verify(token, "horbachUi");
    req.user = jwt.verify(token, "horbachUi");
    next();
  } catch (e) {
    res.status(401).json({ data: { error: "unauthorized" } });
  }
};
