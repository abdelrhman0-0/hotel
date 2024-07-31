const {
  register,
  login,
  changePassword,
  refreshToken,
} = require("./controller");

module.exports = (_express, _app) => {
  const router = _express.Router();
  router.post("/register", register);
  router.post("/login", login);
  router.put("/change-password", changePassword);
  router.post("/refresh-token", refreshToken);
  return router
};
