import { Link, useLocation } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar'
import './Nav.css';

const Nav = () => {
  const location = useLocation();
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/Home">Home</Link>
        </li>
        <li>
          <Link to="/Detail/:id">Detail</Link>
        </li>
        <li>
          <Link to="/Customs">Customs</Link>
        </li>
      </ul>
      {location.pathname === "/Home" && <SearchBar />}
    </nav>
  );
};

export default Nav;
