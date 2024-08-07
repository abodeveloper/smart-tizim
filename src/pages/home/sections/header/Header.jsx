import { PlayCircleOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Navbar from "../../_components/navbar/Navbar";
import { HeaderStyled } from "./header.styles";
import Image from "@/assets/images/4380.jpg";

const Header = () => {
  const { t } = useTranslation();

  return (
    <HeaderStyled>
      <Navbar />
      <Container>
        <div className="main">
          <Row gullter={[20, 20]}>
            <Col xs={24} md={12}>
              <div className="left">
                <h1 className="title">
                  Experience the easier
                  <span> way for transaction</span>
                </h1>
                <p className="description">
                  {t(
                    "Quo is the most easier way for transaction with your friends and family, now matter where are you. An exceptional way for make your life one step easier"
                  )}
                </p>
                <div>
                  <Button
                    icon={<PlayCircleOutlined />}
                    type="primary"
                    size="large"
                  >
                    {t("Register")}
                  </Button>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="right">
                <img src={Image} alt="" />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </HeaderStyled>
  );
};

export default Header;
