import { useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";

// This component is used to display the pokemon cards on the home page
// it will display up to 20 cards per page
const Cards = ({ page }) => {
  const pokemon = useSelector((state) => state.pokemons);
  const sort = useSelector((state) => state.sort);
  const filter = useSelector((state) => state.filter);

  // Calculate the index of the first and last pokemon to display
  const indexOfLastPk = page * 12;
  const indexOfFirstPk = indexOfLastPk - 12;

  let currentPks;

  // If there is a filter or sort, the current pokemon will be the filtered or sorted pokemon
  if (filter.length > 0) {
    currentPks = filter.slice(indexOfFirstPk, indexOfLastPk);
  } else if (sort.length > 0) {
    currentPks = sort.slice(indexOfFirstPk, indexOfLastPk);
  } else {
    currentPks = pokemon.slice(indexOfFirstPk, indexOfLastPk);
  }

  useEffect(() => {
    //Each pageChange will update the pokemon displayed
  }, [page, sort, filter]);
  return (
    <>
      {currentPks?.map((pk, index) => (
        <Card key={index} id={pk.ID ? pk.ID : pk} />
      ))}
    </>
  );
};

export default Cards;
