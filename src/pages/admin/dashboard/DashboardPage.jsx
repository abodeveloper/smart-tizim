import { Col, Row, Typography } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import ProductsCover from "@/assets/images/products-cover.png";
import { useTranslation } from "react-i18next";

const { Meta } = Card;

const DashboardPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Row gutter={[20, 20]}>
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
    </div>
  );
};

export default DashboardPage;
