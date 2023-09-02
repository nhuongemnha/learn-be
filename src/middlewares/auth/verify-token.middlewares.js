const { } = require('../../models')
const jwt = require('jsonwebtoken')

const authenticate = async (req, res, next) => {
  const token = req.header('token')
  try {
    const secretKey = process.env.SECRETKEY
    const decode = await jwt.verify(token, secretKey)
    res.user = decode
    next()
  } catch (error) {
    res.status(401).send({ message: 'token khong hop le' })
  }
}
module.exports = {
  authenticate
}