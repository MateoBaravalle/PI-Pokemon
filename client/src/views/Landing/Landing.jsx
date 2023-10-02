import { useNavigate } from 'react-router-dom'; 
import './Landing.css';

const Landing = () => {
  const navig = useNavigate()
  return(
    <div className='landing-cont'>
      <h1>Welcome,</h1>
      <h4>Let's explore the</h4>
      <h3>PokeWorld</h3>
      <button onClick={()=>navig("/Home")}>Go</button>
    </div>
  )
}

export default Landing;