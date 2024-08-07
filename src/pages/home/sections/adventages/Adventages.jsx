import { RiStore3Fill } from "@remixicon/react";
import { Col, Row } from "antd";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Element } from "react-scroll";
import { Styled } from "./adventages.styles";

const Adventages = () => {
  const { t } = useTranslation();

  const data = [
    {
      name: "Offending belonging",
      desciption:
        "Letter of on become he tended active enable to. Vicinity relation sensible sociable surprise screened no up as.",
      icon: <RiStore3Fill size={40} />,
    },
    {
      name: "Promotion & provision",
      desciption:
        "Letter of on become he tended active enable to. Vicinity relation sensible sociable surprise screened no up as.",
      icon: <RiStore3Fill size={40} />,
    },
    {
      name: "Blessing application",
      desciption:
        "Letter of on become he tended active enable to. Vicinity relation sensible sociable surprise screened no up as.",
      icon: <RiStore3Fill size={40} />,
    },
    {
      name: "Offending belonging",
      desciption:
        "Letter of on become he tended active enable to. Vicinity relation sensible sociable surprise screened no up as.",
      icon: <RiStore3Fill size={40} />,
    },
    {
      name: "Offending belonging",
      desciption:
        "Letter of on become he tended active enable to. Vicinity relation sensible sociable surprise screened no up as.",
      icon: <RiStore3Fill size={40} />,
    },
    {
      name: "Offending belonging",
      desciption:
        "Letter of on become he tended active enable to. Vicinity relation sensible sociable surprise screened no up as.",
      icon: <RiStore3Fill size={40} />,
    },
  ];

  return (
    <Styled>
      <Element name="home" className="header" style={{ overflow: "hidden" }}>
        <Container>
          <div className="title">{t("We help your business grow faster.")}</div>
          <div className="desc">
            {t(
              "Why kept very ever home mrs. Considered sympathize ten uncommonly occasional assistance sufficient."
            )}
          </div>
          <Row gutter={[20, 20]} className="cards">
            {data.map((item) => {
              return (
                <Col xs={24} md={8}>
                  <div className="my-card">
                    <div className="img-box">{item.icon}</div>
                    <div className="card-title">{item.name}</div>
                    <div className="card-desc">{item.desciption}</div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </Element>
    </Styled>
  );
};

export default Adventages;
