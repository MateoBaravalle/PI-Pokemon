const { Router } = require("express");
const router = Router();

const {
  getUserByName,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

router.get("/users", getUserByEmail); // Used once to populate the global state (Only for testing)
router.get("/users/:name([a-zA-Z0-9]{3,25})", getUserByName); // Used once to load user info in global state
router.post("/users", createUser); // Used to create a new user on Register
router.put(
  "/users/:id([0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89abAB][0-9a-f]{3}-[0-9a-f]{12})",
  updateUser
); // Used to update a user allowing to edit
router.delete(
  "/users/:id([0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89abAB][0-9a-f]{3}-[0-9a-f]{12})",
  deleteUser
); // Used to delete a user in case needed

module.exports = router;
