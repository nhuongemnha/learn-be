const { User } = require('../models')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body
    /*
      2 bước đăng nhập
      1/ tìm user theo email
      2/ so sánh password
    */
    const userLogin = await User.findOne({
      where: {
        email
      }
    })
    if (userLogin) {
      const isAuth = bcryptjs.compareSync(password, userLogin.password)
      if (isAuth) {
        /*
        tạo jsonwebtoken
        */
        const payload = {
          id: userLogin.id,
          email: userLogin.email,
          role: userLogin.role
        }
        const secretKey = 'PhatNef'
        const token = jwt.sign(payload, secretKey
        )
        res.status(200).send({ massage: 'Đăng nhập thành công', token })
      } else {
        res.status(400).send({ messages: 'password không chính xác' })
      }
    } else {
      res.status(404).send({ messages: 'email không đúng' })
    }

  } catch (error) {
    res.status(500).send(error)
  }
}

const signUp = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body
    /**
    * mã hóa password:
    * 1/ tạo chuỗi ngẫu nhiên
    * 2/ kết hợp: chuỗi ngẫu nhiên  + password =>hash
    * 
    */
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      phone
    }
    )
    res.status(201).send(newUser)
  } catch (error) {
    res.status(500).send(error)

  }
}

const resetPassword = async (req, res) => {
  try {
    const { email } = req.body
    const passwordDefault = '123456'
    const userDetail = await User.findOne({
      where: {
        email
      }
    })
    if (userDetail) {
      const salt = bcryptjs.genSaltSync(10)// tạo chuỗi ngẫu nhiên
      const hashPassword = bcryptjs.hashSync(passwordDefault, salt)
      userDetail.password = hashPassword
      await userDetail.save()
      res.status(200).send({
        messages: 'reset password thành công',
        newPassword: passwordDefault
      })

    } else {
      res.status(404).send({ messages: 'email không chính xác' })
    }

  } catch (error) {
    res.status(500).send({ messages: 'email không chính xác' })

  }
}

module.exports = {
  signIn,
  signUp,
  resetPassword
}