const { User } = require('../models')
const userList = [
  {
    id: 1,
    name: "iron man",
    email: "iron@gmail.com",
    password: "123456",
    phone: "090909000",
    role: "ADMIN",
  },
  {
    id: 2,
    name: "spider man",
    email: "spider@gmail.com",
    password: "123456",
    phone: "090909000",
    role: "CLIENT",
  },
];

const findAllUser = async (req, res) => {
  try {
    const userList = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['id', 'DESC']]
    })

    res.status(200).send(userList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const findDetailUser = async (req, res) => {
  try {
    const { id } = req.params;
    const detailUser = await User.findOne({ where: { id: id } })
    res.status(200).send(detailUser)

  } catch (error) {
    res.status(500).send(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    // cách 1 :
    // const newUser = User.build({ name, email, password, phone, role });
    // await newUser.save();

    // cách 2
    const newUser = User.create({ name, email, password, phone, role });

    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { name, phone, password } = req.body;
    await User.update({ name: name, phone: phone, password: password }, {
      where: {
        id
      }
    })
    const detailUser = await User.findByPk(id)
    res.status(200).send(detailUser)
  } catch (error) {
    res.status(500).send(error);
  }
}

const removeUser = async (req, res) => {
  const user = req.user
  try {
    const { id } = req.params
    const detailUser = await User.findByPk(id)

    await User.destroy({
      where: {
        id
      }
    })
    res.status(200).send(detailUser)
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  findAllUser,
  findDetailUser,
  createUser,
  updateUser,
  removeUser
};
