import ProductsCover from "@/assets/images/products-cover.png";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const { Meta } = Card;

const Styled = styled.div`
  .antd-card {
    background-color: red;
  }
`;

const DashboardPage = () => {
  const { t } = useTranslation();

  return (
    <Styled>
      <Row gutter={[20, 20]}>
        <Col xs={24} md={24}>
          <Card
            hoverable={true}
            cover={
              <img
                alt="example"
                src={ProductsCover}
                style={{ width: "300px" }}
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src={<SettingOutlined />} />}
              title={t("Mahsulotlar")}
              description={t("Ishni mahsulotlar xarid qilishdan boshlang")}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            hoverable={true}
            cover={
              <img
                alt="example"
                src={ProductsCover}
                style={{ width: "300px" }}
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src={<SettingOutlined />} />}
              title={t("Mahsulotlar")}
              description={t("Ishni mahsulotlar xarid qilishdan boshlang")}
            />
          </Card>
        </Col>
      </Row>
    </Styled>
  );
};

export default DashboardPage;
