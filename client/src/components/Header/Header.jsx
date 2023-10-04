import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import UserMenu from "../UserMenu/UserMenu";
import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="header-container">
        <Logo PrimaryColor='#ffffff' SecondaryColor='#ce0037'/>
        <UserMenu />
      </div>
      <Nav />
    </>
  );
};

export default Header;
