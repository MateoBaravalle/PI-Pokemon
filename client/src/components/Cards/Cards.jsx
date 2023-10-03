import { useSelector } from "react-redux";
import Card from "../Card/Card";
import { useEffect } from "react";

// This component is used to display the pokemon cards on the home page
// it will display up to 20 cards per page
const Cards = ({ page }) => {
  const pokemon = useSelector((state) => state.pokemons);
  const ordenamiento = useSelector((state) => state.ordenamiento);

  // Calculate the index of the first and last pokemon to display
  const indexOfLastPk = page * 20;
  const indexOfFirstPk = indexOfLastPk - 20;

  let currentPks;

  if (ordenamiento.length > 0) {
    currentPks = ordenamiento.slice(indexOfFirstPk, indexOfLastPk);
  } else {
    currentPks = pokemon.slice(indexOfFirstPk, indexOfLastPk);
  }

  useEffect(() => {
    //Each pageChange will update the pokemon displayed
  }, [page]);

  return (
    <>
      {currentPks.map((pk) => (
        <Card key={pk.ID} id={pk.ID} name={pk.NAME} />
      ))}
    </>
  );
};

export default Cards;