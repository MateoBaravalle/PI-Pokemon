import { Link } from "react-router-dom";
import './Nav.css';

const Nav = () => {
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
    </nav>
  );
};

export default Nav;
