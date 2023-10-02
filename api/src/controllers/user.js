const { User } = require("../db");

{/*
// GET operation for getting all Users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};*/}

// GET operation for getting a specific User by Name
const getUserByName = async (req, res) => {
  const NAME = req.params.name;
  try {
    const user = await User.findOne({ where: { NAME } });
    if (!user) {
      return res.status(404).send("Username not found");
    }
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// GET operation for getting a specific User by Email
const getUserByEmail = async (req, res) => {
  const EMAIL = req.query.email;
  try {
    const user = await User.findOne({ where: { EMAIL } });
    if (!user) {
      return res.status(404).send("Email not found");
    }
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// POST operation for creating a new User
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// PUT operation for updating an existing User
const updateUser = async (req, res) => {
  const ID = req.params.id;
  try {
    const [updated] = await User.update(req.body, {
      where: { ID },
    });
    if (!updated) {
      return res.status(404).send("User not found");
    }
    const updatedUser = await User.findOne({ where: { ID } });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// DELETE operation for deleting an existing User
const deleteUser = async (req, res) => {
  const ID = req.params.id;
  try {
    const deleted = await User.destroy({
      where: { ID },
    });
    if (!deleted) {
      return res.status(404).send(true);
    }
    res.status(204).send("User deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  // getUsers,
  getUserByName,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
