import CustomSelect from "@/components/atoms/form-elements/custom-select/CustomSelect";
import { Button, Flex } from "antd";
import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { NavbarStyled } from "./navbar.styled";
import HamburgerIcon from "../hamburger-icon/HamburgerIcon";

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [menu_show, setMenuShow] = useState(false);

  const toggleMenu = () => setMenuShow(!menu_show);

  const menus = [
    {
      name: t("Bosh sahifa"),
      target: "home",
    },
    {
      name: t("Kim uchun ?"),
      target: "for-whom",
    },
    {
      name: t("Xususiyatlar"),
      target: "adventages",
    },

    {
      name: t("Aloqa"),
      target: "contacts",
    },
  ];

  const [offset, setOffset] = useState(135);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: Number(window.innerWidth),
        height: Number(window.innerHeight),
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenSize.width > 1440) {
      setOffset(-100);
    } else if (screenSize.width < 1440 && screenSize.width > 576) {
      setOffset(-100);
    } else {
      setOffset(-100);
    }
  }, [screenSize]);

  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (lang_open === true) {
      if (ref.current && !ref.current.contains(event.target)) {
        setLangOpen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <NavbarStyled>
      <div className="desctop-navbar">
        <Container>
          <div className="content">
            <div className="logo-box">
              {/* <img
              onClick={() => scroll.scrollToTop()}
              className="desctop-logo"
              src={Logo}
              alt=""
            /> */}
              LOGO
            </div>
            <ul>
              {menus.map((menu, index) => (
                <li key={index}>
                  <Link
                    activeClass="active"
                    to={menu.target}
                    spy={true}
                    smooth={true}
                    hashSpy={true}
                    offset={offset}
                    duration={100}
                    delay={100}
                    isDynamic={true}
                    ignoreCancelEvents={false}
                    spyThrottle={500}
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="right-box">
              <Flex gap={"large"}>
                <CustomSelect
                  defaultValue="lucy"
                  style={{ width: 50 }}
                  allowClear={false}
                  showSearch={false}
                  // onChange={handleChange}
                  options={[
                    { value: "jack", label: "UZ" },
                    { value: "lucy", label: "RU" },
                    { value: "Yiminghe", label: "EN" },
                  ]}
                />
                <Flex gap={"middle"}>
                  <Button
                    className="sign-in"
                    onClick={() => navigate("/auth/sign-in")}
                  >
                    {t("Kirish")}
                  </Button>
                  <Button
                    type="primary"
                    className="sign-up"
                    onClick={() => navigate("/auth/sign-up")}
                  >
                    {t("Ro'yxatdan o'tish")}
                  </Button>
                </Flex>
              </Flex>
            </div>
          </div>
        </Container>
      </div>

      <div className="mobile-navbar">
        <Container>
          <div className="content-box">
            <div className="logo-box">
              {/* <img
                className="mobile-logo"
                onClick={() => scroll.scrollToTop()}
                width={"80px"}
                src={Logo}
                alt=""
              /> */}
              LOGO
            </div>
            <div className="right">
              <Flex gap={"middle"} align="center">
                <CustomSelect
                  size={"large"}
                  defaultValue="lucy"
                  style={{ width: 50 }}
                  allowClear={false}
                  showSearch={false}
                  // onChange={handleChange}
                  options={[
                    { value: "jack", label: "UZ" },
                    { value: "lucy", label: "RU" },
                    { value: "Yiminghe", label: "EN" },
                  ]}
                />
                <HamburgerIcon toggleMenu={toggleMenu} menu_show={menu_show} />
              </Flex>
            </div>
          </div>
        </Container>
      </div>

      <div className={`left-menu  ${menu_show ? "open" : "close"}`}>
        <ul>
          {menus.map((menu, index) => (
            <li key={index}>
              <Link
                activeClass="active"
                to={menu.target}
                spy={true}
                smooth={true}
                hashSpy={true}
                offset={offset}
                duration={100}
                delay={100}
                isDynamic={true}
                ignoreCancelEvents={false}
                spyThrottle={500}
                onClick={() => toggleMenu()}
              >
                {menu.name}
              </Link>
            </li>
          ))}
          <li>
            <a href="#">Оставить заявку</a>
          </li>
        </ul>
      </div>
    </NavbarStyled>
  );
};

export default Navbar;
