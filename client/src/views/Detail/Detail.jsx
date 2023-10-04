import { useDispatch, useSelector } from "react-redux";
import "./Detail.css";
import { useEffect } from "react";
import { clearDetail } from "../../redux/actions";

const Detail = () => {
  const detail = useSelector((state) => state.pokeDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearDetail());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <p className="pkName">{detail.NAME?.toUpperCase()}</p>
      <div className="detail-card">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detail.ID}.png`}
          alt={detail.NAME}
          />
        <div className="stats">
          <p className="hp">LIFE: {detail.LIFE}</p>
          <p className="atk">ATTACK: {detail.ATTACK}</p>
          <p className="dfn">DEFENSE: {detail.DEFENSE}</p>
          <p className="spd">SPEED: {detail.SPEED}</p>
          <p className="hgt">HEIGHT: {detail.HEIGHT}</p>
          <p className="wgt">WEIGHT: {detail.WEIGHT}</p>
          <p className="type">TYPE(S): {detail.TYPES?.join(", ").toUpperCase()}</p>
        </div>
      </div>
    </>
  );
};

export default Detail;
