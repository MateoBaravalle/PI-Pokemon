import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOnePk } from "../../redux/actions";
import "./Card.css";

const Card = ({ id }) => {
  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  let name;
  // Getting pokemon name from id
  if(id < 10000) {
    name = pokemons[id - 1]?.NAME;
  } else {
    name = pokemons.find((pokemon) => pokemon.ID === id)?.NAME;
  }

  // Handling click on card
  function clickHandler(id) {
    dispatch(getOnePk(id));
    navigate(`/Detail/${id}`);
  }
  
  return (
    <div
      className="card"
      onClick={() => {
        clickHandler(id);
      }}
    >
      <div className="card-img">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          alt={name}
        />
      </div>
      <div className="card-name">{name?.toUpperCase()}</div>
    </div>
  );
};

export default Card;
