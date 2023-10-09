import { useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";

// This component is used to display the pokemon cards on the home page
// it will display up to 20 cards per page
const Cards = ({ page }) => {
  const pokemon = useSelector((state) => state.pokemons);
  const search = useSelector((state) => state.search);
  const sort = useSelector((state) => state.sort);
  const filter = useSelector((state) => state.filter);
  const order = useSelector((state) => state.order);

  // Calculate the index of the first and last pokemon to display
  const indexOfLastPk = page * 12;
  const indexOfFirstPk = indexOfLastPk - 12;

  let currentPks;

  // If there is a filter or sort, the current pokemon will be the filtered or sorted pokemon
  if (sort.length > 0) {
    currentPks = sort.slice(indexOfFirstPk, indexOfLastPk);
  } else if (filter.length > 0) {
    currentPks = filter.slice(indexOfFirstPk, indexOfLastPk);
  } else if (search.length > 0) {
    currentPks = search.slice(indexOfFirstPk, indexOfLastPk);
  } else {
    currentPks = pokemon.slice(indexOfFirstPk, indexOfLastPk);
  }

  useEffect(() => {
    //Each pageChange will update the pokemon displayed
  }, [page, search, sort, filter, order]);

  if (
    search[0]?.hasOwnProperty("error") ||
    filter[0]?.hasOwnProperty("error")
  ) {
    return (
      <div className="no-pokemons">
        <h1>No pokemon found 💔</h1>
      </div>
    );
  } else {
    return (
      <>
        {currentPks?.map((pk, index) => (
          <Card key={index} id={pk.ID ? pk.ID : pk} />
        ))}
      </>
    );
  }
};

export default Cards;
