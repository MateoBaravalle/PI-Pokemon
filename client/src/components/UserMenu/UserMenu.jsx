import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import "./UserMenu.css";

const UserMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [auth, setAuth] = useState(false);
  const user = useSelector((state) => state.user);
  let username;

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if(user.name?.length > 0) {
      setAuth(true);
    }
  }, [user]);

  if (!auth)
  {
    username = "Guest";
  } else {
    username = user.username;
  };

  return (
    <div className="user-menu">
      <span className="user-menu-name">{username}</span>
      <button className="user-menu-button" onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      {showMenu && (
        <div className="user-menu-dropdown">
          <ul>
            {!auth && (
              <>
                <li>
                  <Link to="/">Log In</Link>
                </li>
                <li>
                  <Link to="/">Sign Up</Link>
                </li>
              </>
            )}
            {auth && (
              <>
                <li>
                  <Link to="/">Profile</Link>
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
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;