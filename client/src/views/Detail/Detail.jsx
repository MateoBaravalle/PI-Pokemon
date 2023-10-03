import { useSelector } from 'react-redux';

const Detail = () => {
  const detail = useSelector(state => state.pokeDetail);
  const types = [];
  
  detail.TYPES?.map(id => {
    get
  });

  return(
    <div>
      <h1>{detail.NAME}</h1>
      <img src={detail.IMAGE} alt={detail.NAME} />
      <p>HP: {detail.LIFE}</p>
      <p>Attack: {detail.ATTACK}</p>
      <p>Defense: {detail.DEFENSE}</p>
      <p>Speed: {detail.SPEED}</p>
      <p>Height: {detail.HEIGHT}</p>
      <p>Weight: {detail.WEIGHT}</p>
    </div>
  )
}

export default Detail;