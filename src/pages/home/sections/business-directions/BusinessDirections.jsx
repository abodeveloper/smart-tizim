import { Element } from "react-scroll";
import { Container } from "react-bootstrap";
import { BusinessDirectionsStyled } from "./business-directions.styles";
import {
  RiBuilding2Fill,
  RiCupFill,
  RiHeartPulseFill,
  RiIdCardLine,
  RiSettings6Fill,
  RiStore3Fill,
} from "@remixicon/react";
import { Card, Col, Row } from "antd";
import { useTranslation } from "react-i18next";

const BusinessDirections = () => {
  const { t } = useTranslation();

  const data = [
    {
      name: "Supermarketlar",
      desciption: "Description",
      icon: <RiStore3Fill size={40} />,
    },
    {
      name: "Aptekalar",
      desciption: "Description",
      icon: <RiHeartPulseFill size={40} />,
    },
    {
      name: "Parfumeriya",
      desciption: "Description",
      icon: <RiCupFill size={40} />,
    },
    {
      name: "Santexnika",
      desciption: "Description",
      icon: <RiSettings6Fill size={40} />,
    },
    {
      name: "Oziq-ovqat do'konlari",
      desciption: "Description",
      icon: <RiCupFill size={40} />,
    },
    {
      name: "Kiyim do'konlari",
      desciption: "Description",
      icon: <RiCupFill size={40} />,
    },
    {
      name: "Qurilish mollari",
      desciption: "Description",
      icon: <RiBuilding2Fill size={40} />,
    },
    {
      name: "Har turdagi biznes",
      desciption: "Description",
      icon: <RiCupFill size={40} />,
    },
  ];

  return (
    <BusinessDirectionsStyled>
      <Element name="home" className="header" style={{ overflow: "hidden" }}>
        <Container>
          <div className="title">
            {t("Manage your entire community in a single system")}
          </div>
          <div className="desc">{t("Who is Nextcent suitable for ?")}</div>
          <Row gutter={[20, 20]} className="cards">
            {data.map((item) => {
              return (
                <Col xs={12} md={6}>
                  <div className="my-card">
                    <div className="img-box">{item.icon}</div>
                    <div className="card-title">{item.name}</div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </Element>
    </BusinessDirectionsStyled>
  );
};

export default BusinessDirections;
