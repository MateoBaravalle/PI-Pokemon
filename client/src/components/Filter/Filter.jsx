import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByType } from "../../redux/actions";
import "./Filter.css";

const Filter = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const sort = useSelector((state) => state.sort);
  const filterBy = useSelector((state) => state.filterBy);
  const [type, setType] = useState("all");

  function typeHandler(e) {
    setType(e.target.value);

    if (sort.length === 0) {
      dispatch(filterByType(e.target.value, pokemons));
    } else {
      dispatch(filterByType(e.target.value, sort));
    }
  }

  function sortHandler(e) {
    console.log(e.target.value);
  }

  function orderHandler(e) {
    console.log(e.target.value);
  }

  useEffect(() => {
    if (filterBy !== type) {
      setType(filterBy);
    }
  }, [filterBy]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="filters-container">
      <label className="filter-label">Types </label>
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
      <label className="filter-label">Sort by</label>
      <select className="filter-select sort" onChange={sortHandler}>
        <option value="id"> - </option>
        <option value="attack">Attack</option>
        <option value="defense">Defense</option>
        <option value="hp">Life</option>
        <option value="speed">Speed</option>
      </select>
      <label className="filter-label">Order </label>
      <select className="filter-select order" onChange={orderHandler}>
        <option value=""> - </option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default Filter;
