import BackButton from "@/components/atoms/back-button/BackButton";
import CustomDataTable from "@/components/molecules/custom-data-table/CustomDataTable";
import ErrorResult from "@/components/molecules/error-result/ErrorResult";
import PageLoader from "@/components/molecules/page-loader/PageLoader";
import PageTitle from "@/components/molecules/page-title/PageTitle";
import TitleAndIconText from "@/components/molecules/title-and-icon-text/TitleAndIconText";
import { httpGetStorageProductOne } from "@/services/api/requests/storage-products.requests";
import { NumberToThousandFormat, formatTimeForUI } from "@/utils/helpers";
import {
  RiCalendarTodoFill,
  RiColorFilterFill,
  RiRefundFill,
  RiRefundLine,
  RiShakeHandsFill,
  RiStackFill,
  RiUser2Fill,
} from "@remixicon/react";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Button, Card, Col, Divider, Flex, Row, Tag } from "antd";
import { get } from "lodash";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useDetailBreadcrumbItems } from "./breadcrumbs/useDetailBreadcrumb";
import CardTitle from "@/components/molecules/card-title/CardTitle";
import AddPaymentForStorageProduct from "./_components/add-payment-for-storare-product/AddPaymentForStorageProduct";

const StorageProductDetailPage = () => {
  const { id } = useParams();

  const { t } = useTranslation();

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
    isRefetching,
    ...rest
  } = useQuery({
    queryKey: ["storage-product-one", id],
    queryFn: () => httpGetStorageProductOne(id),
    select: (response) => response.data,
  });

  const BREADCRUMB_ITEMS = useDetailBreadcrumbItems();

  return (
    <>
      <Helmet>
        <title>{t("Omborga mahsulot")}</title>
      </Helmet>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("Omborga mahsulot")}</PageTitle>
            <BackButton />
          </Flex>
        </Col>
        <Col span={24}>
          <Breadcrumb items={BREADCRUMB_ITEMS} />
        </Col>
        <Col span={24}>
          {isLoading ? (
            <PageLoader />
          ) : (
            <>
              {error ? (
                <ErrorResult error={error} />
              ) : (
                <>
                  <Divider />
                  <Row gutter={[20, 20]}>
                    <Col xs={24} md={18}>
                      <Flex vertical gap={"large"}>
                        <Card>
                          <Flex vertical gap={"large"}>
                            <TitleAndIconText
                              title={t("Ta'minotchi").toUpperCase()}
                              value={get(data, "supplier.name", "")}
                              icon={<RiUser2Fill />}
                            />
                            <TitleAndIconText
                              title={t("Sana").toUpperCase()}
                              value={formatTimeForUI(get(data, "date", ""))}
                              icon={<RiCalendarTodoFill />}
                            />
                            <TitleAndIconText
                              title={t("Mahsulot").toUpperCase()}
                              value={NumberToThousandFormat(
                                get(data, "total_product_summa", "")
                              )}
                              icon={<RiStackFill />}
                            />
                            <TitleAndIconText
                              title={t("Qo'shimcha xizmatlar").toUpperCase()}
                              value={NumberToThousandFormat(
                                get(data, "total_service_summa", "")
                              )}
                              icon={<RiShakeHandsFill />}
                            />
                            <TitleAndIconText
                              title={t("Umumiy summa").toUpperCase()}
                              value={NumberToThousandFormat(
                                get(data, "total_summa", "")
                              )}
                              icon={<RiRefundLine />}
                            />
                          </Flex>
                        </Card>
                        <Services data={get(data, "services", [])} />
                        <Products data={get(data, "products", [])} />
                      </Flex>
                    </Col>
                    <Col xs={24} md={6}>
                      <Card title={<CardTitle title={t("To'lov")} />}>
                        <Flex vertical gap={"large"}>
                          <TitleAndIconText
                            title={t("Umumiy summa").toUpperCase()}
                            value={NumberToThousandFormat(
                              get(data, "total_summa", "")
                            )}
                            icon={<RiRefundLine />}
                          />
                          <TitleAndIconText
                            title={t("To'langan summa").toUpperCase()}
                            value={NumberToThousandFormat(
                              get(data, "total_pay", "")
                            )}
                            icon={<RiRefundFill />}
                          />
                          <TitleAndIconText
                            title={t("Holati").toUpperCase()}
                            value={
                              get(data, "status", "") === "Qarzdorlik" ? (
                                <Tag color={"red"}>
                                  {t("Qardorlik")} (
                                  {NumberToThousandFormat(
                                    get(data, "total_summa", "") -
                                      get(data, "total_pay", "")
                                  )}
                                  )
                                </Tag>
                              ) : (
                                <Tag color={"green"}>{t("To'langan")}</Tag>
                              )
                            }
                            icon={<RiColorFilterFill />}
                          />
                          {get(data, "status", "") === "Qarzdorlik" && (
                            <AddPaymentForStorageProduct
                              summa={
                                get(data, "total_summa", "") -
                                get(data, "total_pay", "")
                              }
                            />
                          )}
                        </Flex>
                      </Card>
                    </Col>
                  </Row>
                </>
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default StorageProductDetailPage;

function Products({ data }) {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("#"),
      dataIndex: "id",
      key: "id",
      render: (value, item, index) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: t("Nomi"),
      dataIndex: "product",
      key: "product",
      render: (value) => {
        return <>{get(value, "name", "")}</>;
      },
    },
    {
      title: t("Narxi"),
      dataIndex: "price",
      key: "price",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>;
      },
    },
    {
      title: t("O'lcham turi"),
      dataIndex: "size_type",
      key: "size_type",
    },
    {
      title: t("Miqdori"),
      dataIndex: "count",
      key: "count",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>;
      },
    },
    {
      title: t("Ombor"),
      dataIndex: "supplier",
      key: "supplier",
      render: (value) => {
        return <>{get(value, "name", "")}</>;
      },
    },
  ];

  return (
    <CustomDataTable title={t("Mahsulotlar")} data={data} columns={columns} />
  );
}

function Services({ data }) {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("#"),
      dataIndex: "id",
      key: "id",
      render: (value, item, index) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: t("Nomi"),
      dataIndex: "service",
      key: "service",
      render: (value) => {
        return <>{get(value, "name", "")}</>;
      },
    },
    {
      title: t("Narxi"),
      dataIndex: "price",
      key: "price",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>;
      },
    },
    {
      title: t("Miqdori"),
      dataIndex: "count",
      key: "count",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>;
      },
    },
  ];

  return (
    <CustomDataTable title={t("Xizmatlar")} data={data} columns={columns} />
  );
}
