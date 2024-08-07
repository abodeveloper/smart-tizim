import { BurgerIcon, NoHighlight } from './hamburger.styled';

const HamburgerIcon = ({ menu_show, toggleMenu }) => {
  return (
    <NoHighlight
      as="a"
      onClick={toggleMenu}
      className={menu_show ? "active" : ""}
      id="burger-icon"
      href="#"
    >
      <BurgerIcon className="burger part-1" />
      <BurgerIcon className="burger part-2" />
      <BurgerIcon className="burger part-3" />
    </NoHighlight>
  );
};

export default HamburgerIcon;
