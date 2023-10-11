import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortBy } from "../../../redux/actions";

const SortSelect = ({ handleStat }) => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const search = useSelector((state) => state.search);
  const filter = useSelector((state) => state.filter);
  const [stat, setStat] = useState("id");

  function sortHandler(e) {
    setStat(e.target.value);
    handleStat(e);

    if (filter.length > 0) {
      dispatch(sortBy(e.target.value, filter));
    } else if (search.length > 0) {
      dispatch(sortBy(e.target.value, search));
    } else {
      dispatch(sortBy(e.target.value, pokemons));
    }
  }

  useEffect(() => {
    sortHandler({ target: { value: stat } });
  }, [filter, search]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <label className="filter-label">Sort :</label>
      <select
        className="filter-select sort"
        value={stat}
        onChange={sortHandler}
      >
        <option value="id"> None </option>
        <option value="attack">Attack</option>
        <option value="defense">Defense</option>
        <option value="life">Life</option>
        <option value="speed">Speed</option>
      </select>
    </>
  );
};

export default SortSelect;
