import {
  RiFacebookBoxFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiMailFill,
  RiPhoneFill,
  RiTelegramFill,
} from "@remixicon/react";
import { Col, Row } from "antd";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-scroll";
import { Styled } from "./footer.styles";

const Footer = () => {
  const { t } = useTranslation();

  const menus = [
    {
      name: t("Home"),
      target: "home",
    },
    {
      name: t("Servives"),
      target: "services",
    },
    {
      name: t("Feature"),
      target: "feature",
    },
    {
      name: t("Prices"),
      target: "prices",
    },
  ];

  return (
    <Styled name="contacts" style={{ overflow: "hidden" }}>
      <>
        <Container>
          <Row gutter={[30, 30]}>
            <Col xs={24} md={8}>
              <div className="box">
                <div className="title">LOGO</div>
                <div className="commit">
                  Simple innate summer fat appear basket his desire joy.
                </div>
                <div className="contact-box">
                  <a href="#" target="_blank">
                    <RiInstagramFill />
                  </a>
                  <a href="#" target="_blank">
                    <RiFacebookBoxFill />
                  </a>
                  <a href="#" target="_blank">
                    <RiLinkedinBoxFill />
                  </a>
                  <a href="#" target="_blank">
                    <RiTelegramFill />
                  </a>
                </div>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="box">
                <div className="title">Menu</div>
                <ul>
                  {menus.map((menu, index) => (
                    <li key={index}>
                      <Link
                        activeClass="active"
                        to={menu.target}
                        spy={true}
                        smooth={true}
                        hashSpy={true}
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
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="box">
                <div className="title">Contacts</div>
                <ul>
                  <li>
                    <div className="phone">
                      <RiPhoneFill /> <span>+998935221776</span>
                    </div>
                  </li>
                  <li>
                    <div className="phone">
                      <RiMailFill /> <span>abodeveloper2811@gmail.com</span>
                    </div>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <div className="footer-border" />
          <div className="text">
            Copyright @ SMART TIZIM 2024. All Rights Reserved.
          </div>
        </Container>
      </>
    </Styled>
  );
};

export default Footer;
