import { useDispatch, useSelector } from "react-redux";
import { nextPage, previousPage } from "../../redux/actions";
import Cards from "../../components/Cards/Cards";
import "./Home.css";

// This component is used to display the pokemon cards on the home page
// it will display up to 20 cards per page, and will have pagination
const Home = () => {
  const page = useSelector((state) => state.page);
  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();

  const maxPage = Math.ceil(pokemons.length / 20);

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
      <div className="home-card-container">
        <Cards page={page} />
      </div>
      <div className="home-pagination">
        <button className="home-pagination-btn" onClick={previousPageHandler}>
          Prev
        </button>
        <p>{page}</p>
        <button className="home-pagination-btn" onClick={nextPageHandler}>
          Next
        </button>
      </div>
      <div className="footer">
        <p>Created by MateoBaravalle - 2023</p>
        <div className="footer-links">
          <a href="linktoGithub">Github</a>
          <a href="linktoLinkedin">Linkedin</a>
          <a href="linktoWspMe">Contact me</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
