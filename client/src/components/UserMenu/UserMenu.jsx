import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import "./UserMenu.css";

const UserMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="user-menu">
      <button className="user-menu-button" onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      {showMenu && (
        <div className="user-menu-dropdown">
          <ul>
            <li>
              <Link to="/">Account</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/">
                Log Out
                <FaSignOutAlt />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;