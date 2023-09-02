const { Router } = require("express");
const { User } = require('../models')

const {
  findAllUser,
  findDetailUser,
  createUser,
  updateUser,
  removeUser,
} = require("../controllers/user.controllers");
const { checkExist } = require("../middlewares/validations/check-exist.middlewares");
const { authenticate } = require("../middlewares/auth/verify-token.middlewares");
const userRouter = Router();

// http://localhost:7000/api/v1/users
userRouter.get("/", findAllUser);
// http://localhost:7000/api/v1/users/:id
userRouter.get("/:id", [checkExist(User)], findDetailUser);
// http://localhost:7000/api/v1/users
userRouter.post("/", createUser);
userRouter.put("/:id", [checkExist(User)], updateUser);
userRouter.delete("/:id", [checkExist(User), authenticate], removeUser);

module.exports = {
  userRouter,
};
