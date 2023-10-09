const axios = require("axios");
const { Op } = require("sequelize");
const { Pokemon, conn } = require("../db");

// Sanitize data for Cards component
const cleanPkAll = (pkData) => {
  const cleanedPk = {};

  // Data retrived from API
  if (pkData.url) {
    // Sanitize the NAME
    cleanedPk.NAME = pkData.name;

    // Sanitize the ID
    cleanedPk.ID = parseInt(pkData.url.split("/").splice(6, 1));
  } else {
    // Sanitize the NAME
    cleanedPk.NAME = pkData.NAME;

    // Sanitize the SRC: UUIDV4 -> DB, URL -> API
    cleanedPk.ID = pkData.ID;

    // Sanitize the TYPES
    cleanedPk.TYPES = pkData.TYPES;
  }

  return cleanedPk;
};

// Sanitize data for Detail component
const cleanPkApi = (pkData) => {
  const cleanedPk = {};

  // Sanitize the ID
  cleanedPk.ID = pkData.id;

  // Sanitize the NAME
  cleanedPk.NAME = pkData.name;

  // Sanitize the LIFE, ATTACK, DEFENSE, and SPEED
  pkData.stats.forEach((stat) => {
    const statName = stat.stat.name;
    const statValue = stat.base_stat;

    switch (statName) {
      case "hp":
        cleanedPk.LIFE = statValue;
        break;
      case "attack":
        cleanedPk.ATTACK = statValue;
        break;
      case "defense":
        cleanedPk.DEFENSE = statValue;
        break;
      case "speed":
        cleanedPk.SPEED = statValue;
        break;
      default:
        break;
    }
  });

  // Sanitize the HEIGHT
  cleanedPk.HEIGHT = pkData.height;

  // Sanitize the WEIGHT
  cleanedPk.WEIGHT = pkData.weight;

  // Validate and sanitize the IMAGE
  const image = pkData.sprites.front_default;
  cleanedPk.IMAGE = image;

  // Sanitize TYPES
  cleanedPk.TYPES = [];
  pkData.types.forEach((type) => {
    const id = type.type.url.split("/").splice(6, 1);
    cleanedPk.TYPES.push(parseInt(id));
  });

  return cleanedPk;
};


// * GET operation for getting all Pokemons from PokeAPI and DB
const getAllPk = async (req, res) => {
  try {
    // Get Pokemons from PokeAPI
    const responseAPI = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=1292"
    );
    const pokemonsAPI = responseAPI.data.results.map((pokemon) =>
      cleanPkAll(pokemon)
    );

    // Get Pokemons from DB
    const responseDB = await Pokemon.findAll();
    const pokemonsDB = responseDB.map((pokemon) => cleanPkAll(pokemon));

    // Merge Pokemons from PokeAPI and DB
    const pokemons = [...pokemonsAPI, ...pokemonsDB];

    // Send Pokemons
    res.send(pokemons);
  } catch (error) {
    // Send error response
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// * GET operation for getting all Pokemons from the DB
const getAllPkDB = async (req, res) => {
  try {
    // Get Pokemons from DB
    const response = await Pokemon.findAll();
    const pokemons = response.map((pokemon) => cleanPkAll(pokemon)); // Sanitize data

    // Send Pokemons
    res.send(pokemons);
  } catch (error) {
    // Send error response
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// * GET operation for getting a single Pokemon from PokeAPI
const getOnePkAPI = async (req, res) => {
  const ID = req.params.id;
  try {
    // Get Pokemon from PokeAPI
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${ID}`);
    const pokemon = cleanPkApi(response.data); // Sanitize data

    // Send error response if Pokemon not found
    if (!pokemon) {
      return res.status(404).send("Pokemon not found");
    }

    // Send Pokemon
    res.send(pokemon);
  } catch (error) {
    // Send error response
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// * GET operation for getting a single Pokemon from the DB
const getOnePkDB = async (req, res) => {
  const ID = req.params.id;
  try {
    // Get Pokemon from DB
    const pokemon = await Pokemon.findOne({
      where: { ID },
    });

    // Send error response if Pokemon not found
    if (!pokemon) {
      return res.status(404).send("Pokemon not found");
    }

    // Get Pokemon Types from DB
    let types = await pokemon.getTypes();
    pokemon.dataValues.TYPES = types.map((type) => type.dataValues.ID);

    // Send Pokemon
    res.send(pokemon);
  } catch (error) {
    // Send error response
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// * GET operation for getting all Pokemons matching the input query from DB and PokeAPI
const getPkByName = async (req, res) => {
  const NAME = req.params.name.toLowerCase();
  try {
    // Get Pokemons from PokeAPI
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=1292`
    );
    const responseAPI = response.data.results.filter((pokemon) =>
      pokemon.name.includes(NAME)
    );
    const pokemonsAPI = responseAPI.map((pokemon) => cleanPkAll(pokemon));

    // Get Pokemons from DB
    const responseDB = await Pokemon.findAll({
      where: {
        NAME: {
          [Op.iLike]: `%${NAME}%`,
        },
      },
    });
    const pokemonsDB = responseDB.map((pokemon) => cleanPkAll(pokemon));

    // Merge Pokemons from PokeAPI and DB
    const pokemons = [...pokemonsAPI, ...pokemonsDB];

    // Send Pokemon
    res.send(pokemons);
  } catch (error) {
    // Send error response
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// * POST operation for creating a new Pokemon in the DB
const createPkDB = async (req, res) => {
  const { TYPES, ...pkData } = req.body;
  const t = await conn.transaction(); // Create transaction linking all queries
  try {
    // Create Pokemon and add Types
    const pokemon = await Pokemon.create(pkData, { transaction: t });
    await pokemon.addType(TYPES, { transaction: t });
    await t.commit(); // Commit transaction to ensure data is stored in DB

    // Send Pokemon created
    res.status(201).send(pokemon);
  } catch (error) {
    // Rollback transaction if any error occurs and send error response
    await t.rollback();
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// * PUT operation for updating an existing Pokemon in the DB
const updatePkDB = async (req, res) => {
  const ID = req.params.id;
  try {
    // Update Pokemon
    const [updated] = await Pokemon.update(req.body, {
      where: { ID },
    });

    // Send error response if Pokemon not found
    if (!updated) {
      return res.status(404).send("Pokemon not found");
    }

    // Send updated Pokemon
    const updatedPokemon = await Pokemon.findOne({ where: { ID } });
    res.status(200).json({ pokemon: updatedPokemon });
  } catch (error) {
    // Send error response
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// * DELETE operation for deleting an existing Pokemon from the DB
const deletePkDB = async (req, res) => {
  const ID = req.params.id;
  try {
    // Delete Pokemon from DB
    const deleted = await Pokemon.destroy({
      where: { ID },
    });

    // Send error response if Pokemon not found
    if (!deleted) {
      return res.status(404).send("Pokemon not found");
    }

    // Send success msg
    res.status(204).send("Pokemon deleted");
  } catch (error) {
    // Send error response
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const sortsPk = async (req, res) => {
  const Sorts = {};
  try {
    // Get Pokemons from API
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=1292`
    );
    
    const pokemonsAPI = await Promise.all(
      data.results.map(async (pokemon) => {
        const response = await axios.get(pokemon.url);
        return {
          id: response.data.id,
          life: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          speed: response.data.stats[5].base_stat,
        }
      })
    );

    // Get Pokemons from DB
    const pkDB = await Pokemon.findAll();
    const pokemonsDB = pkDB.map((pokemon) => {
      return {
        id: pokemon.ID,
        life: pokemon.LIFE,
        attack: pokemon.ATTACK,
        defense: pokemon.DEFENSE,
        speed: pokemon.SPEED,
      }
    });

    // Merge Pokemons from PokeAPI and DB
    const pokemons = [...pokemonsAPI, ...pokemonsDB];

    // Sort Pokemons by Life
    const pokemonsByLife = pokemons.sort((a, b) => a.life - b.life).map(pokemon => pokemon.id);
    Sorts.life = pokemonsByLife;

    // Sort Pokemons by Attack
    const pokemonsByAttack = pokemons.sort((a, b) => a.attack - b.attack).map(pokemon => pokemon.id);
    Sorts.attack = pokemonsByAttack;

    // Sort Pokemons by Defense
    const pokemonsByDefense = pokemons.sort((a, b) => a.defense - b.defense).map(pokemon => pokemon.id);
    Sorts.defense = pokemonsByDefense;

    // Sort Pokemons by Speed
    const pokemonsBySpeed = pokemons.sort((a, b) => a.speed - b.speed).map(pokemon => pokemon.id);
    Sorts.speed = pokemonsBySpeed;
    
    
    // Send Sorts
    res.send(Sorts);
  } catch (error) {
    // Send error response
    console.error(error);
    res.status(500).send("Server Error");
  }
}


module.exports = {
  getAllPk,
  getAllPkDB,
  getOnePkAPI,
  getOnePkDB,
  getPkByName,
  createPkDB,
  updatePkDB,
  deletePkDB,
  sortsPk,
};
