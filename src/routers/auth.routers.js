const { Router } = require('express')
const { signIn, signUp, resetPassword } = require('../controllers/auth.controllers')

const authRouter = Router()
authRouter.post('/sign-in', signIn)
authRouter.post('/sign-up', signUp)
authRouter.post('/reset-pass', resetPassword)
module.exports = {
  authRouter
}