import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllPk, searchPk } from "../../redux/actions";
import "./SearchBar.css";

const SearchBar = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  // Handling input change
  function changeHandler(e) {
    setName(e.target.value);

    if (e.target.value === "") {
      dispatch(getAllPk(""));
    } else if (e.target.value.length > 2) {
      dispatch(searchPk(e.target.value));
    }
  }

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        value={name}
        onChange={changeHandler}
      />
    </div>
  );
};

export default SearchBar;
