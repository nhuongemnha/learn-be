const { Router } = require("express");
const { userRouter } = require("./user.routers");
const { authRouter } = require("./auth.routers");
const rootRouter = Router();

// http://localhost:7000/api/v1/users
rootRouter.use("/users", userRouter);
rootRouter.use("/auth", authRouter);

module.exports = {
  rootRouter,
};
