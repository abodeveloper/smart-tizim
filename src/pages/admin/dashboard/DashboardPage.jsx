import ProductsCover from "@/assets/images/products-cover.png";
import { Button, Card, Col, Flex, Row } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const { Meta } = Card;

const Styled = styled.div`
  .ant-card {
    .ant-card-cover {
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 60%;
      }
    }
    .ant-card-body {
      padding: 40px;
      padding-top: 20px;
    }
  }
`;

const DashboardPage = () => {
  const { t } = useTranslation();

  return (
    <Styled>
      <Row gutter={[20, 20]}>
        <Col xs={24} md={24}>
          <Card>
            <Meta
              title={t("SMART TIZIM")}
              description={t("Ushbu dastur orqali biznesingizni boshqaring !")}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            hoverable={true}
            cover={<img alt="example" src={ProductsCover} />}
          >
            <Meta
              title={t("Mahsulotlar")}
              description={
                <Flex gap={"large"} vertical>
                  <div>{t("Ishni mahsulotlar xarid qilishdan boshlang.")}</div>
                  <div>
                    <Button type="primary">{t("Mahsulot qo'shish")}</Button>
                  </div>
                </Flex>
              }
            />
          </Card>
        </Col>
      </Row>
    </Styled>
  );
};

export default DashboardPage;
