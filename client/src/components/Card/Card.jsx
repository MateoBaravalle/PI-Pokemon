import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOnePk } from "../../redux/actions";
import "./Card.css";

const Card = ({ id, name }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  function clickHandler(id) {
    dispatch(getOnePk(id));
    navigate(`/Detail/${id}`);
  }
  
  return (
    <div className="card" onClick={()=>{clickHandler(id)}}>
      <div className="card-img">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          alt={name}
        />
      </div>
      <div className="card-name">{name.toUpperCase()}</div>
    </div>
  );
}

export default Card;