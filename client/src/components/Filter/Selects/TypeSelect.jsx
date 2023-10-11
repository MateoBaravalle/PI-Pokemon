import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByType } from "../../../redux/actions";

const TypeSelect = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const search = useSelector((state) => state.search);
  const [type, setType] = useState("all");

  function typeHandler(e) {
    setType(e.target.value);
    
    if (search.length > 0) {
      dispatch(filterByType(e.target.value, search));
    } else {
      dispatch(filterByType(e.target.value, pokemons));
    }
  }

  useEffect(() => {
    typeHandler({ target: { value: type } });
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <label className="filter-label">Types :</label>
      <select
        className="filter-select type"
        value={type}
        onChange={typeHandler}
      >
        <option value="all">All</option>
        <option value="normal">Normal</option>
        <option value="fighting">Fighting</option>
        <option value="flying">Flying</option>
        <option value="poison">Poison</option>
        <option value="ground">Ground</option>
        <option value="rock">Rock</option>
        <option value="bug">Bug</option>
        <option value="ghost">Ghost</option>
        <option value="steel">Steel</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="electric">Electric</option>
        <option value="psychic">Psychic</option>
        <option value="ice">Ice</option>
        <option value="dragon">Dragon</option>
        <option value="dark">Dark</option>
        <option value="fairy">Fairy</option>
        <option value="unknown">Unknown</option>
        <option value="shadow">Shadow</option>
      </select>
    </>
  );
};

export default TypeSelect;
