const { Router } = require("express");
const router = Router();

const {
  getAllPk,
  getAllPkDB,
  getOnePkAPI,
  getOnePkDB,
  getPkByName,
  createPkDB,
  updatePkDB,
  deletePkDB,
  sortsPk,
} = require("../controllers/pokemon");

router.get("/pokemon", getAllPk); // Used once to populate the global state
router.get("/pokemon/customs", getAllPkDB); // Used to load custom pokemons
router.get("/pokemon/name=:name([a-zA-Z-]+)", getPkByName); // Used to load cards
router.get("/pokemon/:id(\\d+)", getOnePkAPI); // Used to load detail page
router.get(
  "/pokemon/:id([0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89abAB][0-9a-f]{3}-[0-9a-f]{12})",
  getOnePkDB
); // Used to load detail page of custom pokemon
router.post("/pokemon", createPkDB); // Used to create a new custom pokemon
router.put(
  "/pokemon/:id([0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89abAB][0-9a-f]{3}-[0-9a-f]{12})",
  updatePkDB
); // Used to update a custom pokemon
router.delete(
  "/pokemon/:id([0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89abAB][0-9a-f]{3}-[0-9a-f]{12})",
  deletePkDB
); // Used to delete a custom pokemon
router.get("/sorts", sortsPk); // Used to sort pokemons")

module.exports = router;
