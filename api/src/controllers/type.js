const axios = require("axios");
const { Pokemon, Type } = require("../db");

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
    res.status(200).send(types);
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
  const { array } = req.body;
  const type = req.params.type;
  let pkIDs = [];

  try {
    const responses = await axios.all(
      array.map(async (pokemon) => {
        const response = isNaN(pokemon.ID)
          ? await Pokemon.findOne({
              where: { ID: pokemon.ID },
              include: Type,
            })
          : await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.ID}`);
        return response;
      })
    );
    pkIDs = await Promise.all(
      // IF response is from DB, use dataValues, else use data
      responses
        .map((response) => response?.dataValues || response?.data)
        .map(async (data) => {
          if (data.types[0]?.dataValues) {
            return data.types.some((t) => t.dataValues.NAME === type)
              ? data.ID
              : undefined;
          } else {
            return data.types.some((t) => t.type.name === type)
              ? data.id
              : undefined;
          }
        })
    );

    pkIDs = pkIDs.filter((id) => id !== undefined);
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
