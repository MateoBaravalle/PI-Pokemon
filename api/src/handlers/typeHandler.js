const { Router } = require("express");
const router = Router();

const { getAllTypes, getTypes } = require("../controllers/type");

router.get("/types/all", getAllTypes); // Used once to populate the DB
router.post("/types", getTypes); // Used to load detail page

module.exports = router;
