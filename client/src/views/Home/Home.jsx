import { useDispatch, useSelector } from "react-redux";
import { nextPage, previousPage } from "../../redux/actions";
import SearchBar from "../../components/SearchBar/SearchBar";
import Cards from "../../components/Cards/Cards";
import "./Home.css";

// This component is used to display the pokemon cards on the home page
// it will display up to 20 cards per page, and will have pagination
const Home = () => {
  const page = useSelector((state) => state.page);
  const pokemons = useSelector((state) => state.pokemons);
  const search = useSelector((state) => state.search);
  const sort = useSelector((state) => state.sort);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const maxPage = Math.ceil(
    (filter.length > 0
      ? filter.length
      : sort.length > 0
      ? sort.length
      : search.length > 0
      ? search.length
      : pokemons.length) / 12
  );

  // Handling pagination
  function nextPageHandler() {
    if (page === maxPage) return;
    dispatch(nextPage());
  }

  function previousPageHandler() {
    if (page === 1) return;
    dispatch(previousPage());
  }

  return (
    <div className="home-container">
      <div className="home-inputs">
        <SearchBar />
      </div>
      <div className="home-cards-container">
        <Cards page={page} />
      </div>
      <div className="home-pagination">
        <button
          className={`home-pagination-btn ${page === 1 ? "hidden" : ""}`}
          onClick={previousPageHandler}
        >
          ←
        </button>
        <p className="home-pagination-page">{page}</p>
        <button
          className={`home-pagination-btn ${page === maxPage ? "hidden" : ""}`}
          onClick={nextPageHandler}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Home;
