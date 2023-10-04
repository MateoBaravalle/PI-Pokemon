const axios = require("axios");
const { Type } = require("../db");

// GET used once to populate DB
const getAllTypes = async (req, res) => {
  try {
    let types = await Type.findAll();
    if (types.length === 0) {
      const { data } = await axios.get("https://pokeapi.co/api/v2/type");
      types = await Promise.all(
        data.results.map(async ({ name }) => Type.create({ NAME: name }))
      );
    }
    res.status(200).send(" Types added to DB");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// POST operation for getting specific Types by ID from DB
const getTypes = async (req, res) => {
  const ids = req.body.dataTypes;
  console.log(ids);
  try {
    const types = await Promise.all(
      ids.map(async (ID) => {
        const type = await Type.findOne({ where: { ID } });
        return type.dataValues.NAME;
      })
    );
    res.status(200).send(types);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// POST operation filters all Pokemons by Type
const filterPksbyType = async (req, res) => {
  const { pokemons } = req.body;
  const type = req.params.type;
  let pkIDs = [];
  
  console.log(type);
  console.log(pokemons);
  try {
    pkIDs = await Promise.all(
      pokemons.map(async (pokemon) => {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.ID}`);
        const types = data.types.map((type) => type.type.name);
        if (types.includes(type)) {
          return pokemon.ID;
        }
      })
    );
    pkIDs = pkIDs.filter((pk) => pk !== undefined);
    console.log(pkIDs);
    res.status(200).send(pkIDs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllTypes,
  getTypes,
  filterPksbyType,
};
