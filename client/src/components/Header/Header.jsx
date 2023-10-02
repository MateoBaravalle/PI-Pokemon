import Logo from "../Logo/Logo";
import UserMenu from "../UserMenu/UserMenu";
import Nav from "../Nav/Nav";
import "./Header.css";

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
