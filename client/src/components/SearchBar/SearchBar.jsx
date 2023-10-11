import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPk } from "../../redux/actions";
import Filter from "../Filter/Filter";
import "./SearchBar.css";

const SearchBar = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  // Handling input change
  function changeHandler(e) {
    setName(e.target.value.toUpperCase());

    if (e.target.value === "") {
      dispatch(searchPk(""));
    } else if (e.target.value.length > 2) {
      dispatch(searchPk(e.target.value));
    }
  }

  // Handling enter key
  function enterHandler(e) {
    if (name === "") return;
    else if (e.key === "Enter") {
      dispatch(searchPk(name));
    }
  }

  return (
    <>
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar-input"
          placeholder="Search..."
          value={name}
          onChange={changeHandler}
          onKeyDown={enterHandler}
        />
      </div>
      <Filter />
    </>
  );
};

export default SearchBar;
