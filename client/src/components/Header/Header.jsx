import Nav from "../Nav/Nav";
import Logo from "../Logo/Logo";
import "./Header.css";
import UserMenu from "../UserMenu/UserMenu";

const Header = () => {
  return (
    <>
      <div className="header-container">
        <Logo PrimaryColor='#ff6900' SecondaryColor='#ce0037'/>
        <UserMenu />
      </div>
      <Nav />
    </>
  );
};

export default Header;
