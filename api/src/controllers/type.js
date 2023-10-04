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
  const { array } = req.body;
  const type = req.params.type;
  let pkIDs = [];
  try {
    const responses = await axios.all(
      array.map(async (pokemon) => {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.ID}`
        );
        return response;
      })
    );
    pkIDs = await Promise.all(
      responses
        .filter((response) => response.status === 200)
        .map(async (response) => {
          const data = response.data;
          if (data.types.some((t) => t.type.name === type)) {
            return data.id;
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
