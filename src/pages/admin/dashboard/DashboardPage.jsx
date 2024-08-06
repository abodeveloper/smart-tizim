import ProductsCover from "@/assets/images/products-cover.png";
import { Button, Card, Col, Flex, Row, Steps } from "antd";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
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
        width: 50%;
      }
    }
    .ant-card-body {
      padding: 20px;
      padding-top: 10px;
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
                  <div>
                    {t(
                      "Ishni mahsulotlaringizni tizimga kiritishdan boshlang."
                    )}
                  </div>
                  <>
                    <Steps
                      current={-1}
                      direction="vertical"
                      items={[
                        {
                          title: (
                            <NavLink to={"/products/category"}>
                              {t("Mahsulot kategoriyalarini qo'shing")}
                            </NavLink>
                          ),
                          description: t(
                            "Ishni mahsulotlaringiz turlarini tizimga kiritishdan boshlang !"
                          ),
                        },
                        {
                          title: (
                            <NavLink to={"/products/formats"}>
                              {t("Mahsulot formatlarini qo'shing")}
                            </NavLink>
                          ),
                          description: t(
                            "Mahsulotlaringizning turli o'lchov birliklarini tizimga kiriting !"
                          ),
                        },
                        {
                          title: (
                            <NavLink to={"/products/formats"}>
                              {t("Mahsulotlaringizni qo'shing")}
                            </NavLink>
                          ),
                          description: t(
                            "Siz endi mahsulotlaringizni tizimga kiritishingiz mumkin !"
                          ),
                        },
                      ]}
                    />
                  </>
                </Flex>
              }
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            hoverable={true}
            cover={<img alt="example" src={ProductsCover} />}
          >
            <Meta
              title={t("Omborxona")}
              description={
                <Flex gap={"large"} vertical>
                  <div>
                    {t(
                      "Ishni mahsulotlaringizni tizimga kiritishdan boshlang."
                    )}
                  </div>
                  <>
                    <Steps
                      current={-1}
                      direction="vertical"
                      items={[
                        {
                          title: (
                            <NavLink to={"/products/category"}>
                              {t("Mahsulot kategoriyalarini qo'shing")}
                            </NavLink>
                          ),
                          description: t(
                            "Ishni mahsulotlaringiz turlarini tizimga kiritishdan boshlang !"
                          ),
                        },
                        {
                          title: (
                            <NavLink to={"/products/formats"}>
                              {t("Mahsulot formatlarini qo'shing")}
                            </NavLink>
                          ),
                          description: t(
                            "Mahsulotlaringizning turli o'lchov birliklarini tizimga kiriting !"
                          ),
                        },
                        {
                          title: (
                            <NavLink to={"/products/formats"}>
                              {t("Mahsulotlaringizni qo'shing")}
                            </NavLink>
                          ),
                          description: t(
                            "Siz endi mahsulotlaringizni tizimga kiritishingiz mumkin !"
                          ),
                        },
                      ]}
                    />
                  </>
                </Flex>
              }
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            hoverable={true}
            cover={<img alt="example" src={ProductsCover} />}
          >
            <Meta
              title={t("Savdolar")}
              description={
                <Flex gap={"large"} vertical>
                  <div>
                    {t(
                      "Ishni mahsulotlaringizni tizimga kiritishdan boshlang."
                    )}
                  </div>
                  <>
                    <Steps
                      current={-1}
                      direction="vertical"
                      items={[
                        {
                          title: (
                            <NavLink to={"/products/category"}>
                              {t("Mijozlaringizni qo'shing")}
                            </NavLink>
                          ),
                          description: t(
                            "Ishni mahsulotlaringiz turlarini tizimga kiritishdan boshlang !"
                          ),
                        },
                        {
                          title: (
                            <NavLink to={"/products/formats"}>
                              {t("Mahsulot formatlarini qo'shing")}
                            </NavLink>
                          ),
                          description: t(
                            "Mahsulotlaringizning turli o'lchov birliklarini tizimga kiriting !"
                          ),
                        },
                      ]}
                    />
                  </>
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
