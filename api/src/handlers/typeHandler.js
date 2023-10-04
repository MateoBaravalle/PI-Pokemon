const { Router } = require("express");
const router = Router();

const { getAllTypes, getTypes, filterPksbyType } = require("../controllers/type");

router.get("/types/all", getAllTypes); // Used once to populate the DB
router.post("/types", getTypes); // Used to load detail page
router.post("/types/:type", filterPksbyType); // Used to filter by type

module.exports = router;
