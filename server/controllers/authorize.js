const jwt = require("jsonwebtoken");

const authSuper = (req, res, next) => {
  const auth_token = req.header("auth-token");
  try {
    const verifiedSuperUser = jwt.verify(auth_token, process.env.SUPER_TOKEN);
    if (verifiedSuperUser) {
      next();
    }
  } catch (error) {
    res.send("Unauthorized action/access");
  }
};

const authBasic = (req, res, next) => {
  const auth_token = req.header("auth-token");
  try {
    const verifiedBasicUser = jwt.verify(auth_token, process.env.BASIC_TOKEN);
    if (verifiedBasicUser) {
      next();
    }
  } catch (error) {
    res.send("Unauthorized action/access");
  }
};

module.exports.authSuper = authSuper;
module.exports.authBasic = authBasic;
