import { Link, useLocation } from "react-router-dom";
import './Nav.css';

const Nav = () => {
  const location = useLocation();
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/Home" className={`${location.pathname === '/Home' ? 'isActive' : ''}`}>Home</Link>
        </li>
        <li>
          <Link className={`${location.pathname.includes('/Detail') ? 'isActive' : 'inActive'}`}>Detail</Link>
        </li>
        <li>
          <Link to="/Customs" className={`${location.pathname === '/Customs' ? 'isActive' : ''}`}>Customs</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
