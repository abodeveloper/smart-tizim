import BackButton from "@/components/atoms/back-button/BackButton";
import CardTitle from "@/components/molecules/card-title/CardTitle";
import CustomDataTable from "@/components/molecules/custom-data-table/CustomDataTable";
import ErrorResult from "@/components/molecules/error-result/ErrorResult";
import PageLoader from "@/components/molecules/page-loader/PageLoader";
import PageTitle from "@/components/molecules/page-title/PageTitle";
import TitleAndIconText from "@/components/molecules/title-and-icon-text/TitleAndIconText";
import {
  httpGetStorageProductOne,
  httpGetStorageProducts,
} from "@/services/api/requests/storage-products.requests";
import {
  NumberToThousandFormat,
  formatTimeForUI,
  objectToQueryString,
} from "@/utils/helpers";
import {
  RiBankCardLine,
  RiCalendarTodoFill,
  RiCashLine,
  RiColorFilterFill,
  RiCopperCoinLine,
  RiPhoneFill,
  RiRefundFill,
  RiRefundLine,
  RiShakeHandsFill,
  RiSlideshowLine,
  RiStackFill,
  RiUser2Fill,
} from "@remixicon/react";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Card, Col, Divider, Flex, Row, Tag } from "antd";
import { get, isEmpty } from "lodash";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import AddPaymentForStorageProduct from "./_components/add-payment-for-supplier/AddPaymentForSupplier";
import { useDetailBreadcrumbItems } from "./breadcrumbs/useDetailBreadcrumb";
import { httpGetSupplierOne } from "@/services/api/requests/suppliers.requests";
import StorageProductsPage from "@/pages/storages/storage-products/StorageProductsPage";
import { useEffect, useState } from "react";
import { useStorageProductColumns } from "@/pages/storages/storage-products/useStorageProductColumns";
import GlobalSearchInput from "@/components/molecules/global-search-input/GlobalSearchInput";
import ClearFilterButton from "@/components/atoms/clear-filter-button/ClearFilterButton";
import CreateButton from "@/components/atoms/create-button/CreateButton";

const SupplierDetailPage = () => {
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
    queryKey: ["supplier-one", id],
    queryFn: () => httpGetSupplierOne(id),
    select: (response) => response.data,
  });

  const BREADCRUMB_ITEMS = useDetailBreadcrumbItems();

  return (
    <>
      <Helmet>
        <title>{t("Ta'minotchi")}</title>
      </Helmet>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("Ta'minotchi")}</PageTitle>
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
                              value={get(data, "name", "")}
                              icon={<RiUser2Fill />}
                            />
                            <TitleAndIconText
                              title={t("Telefon").toUpperCase()}
                              value={get(data, "phone", "")}
                              icon={<RiPhoneFill />}
                            />
                            <TitleAndIconText
                              title={t("Ta'minotchi turi").toUpperCase()}
                              value={get(data, "supplier_type", "")}
                              icon={<RiStackFill />}
                            />
                            <TitleAndIconText
                              title={t("Sana").toUpperCase()}
                              value={formatTimeForUI(get(data, "added", ""))}
                              icon={<RiCalendarTodoFill />}
                            />
                            {get(data, "desc", "") ? (
                              <TitleAndIconText
                                title={t("Izoh").toUpperCase()}
                                value={get(data, "desc", "")}
                                icon={<RiSlideshowLine />}
                              />
                            ) : (
                              ""
                            )}
                          </Flex>
                        </Card>
                      </Flex>
                    </Col>
                    <Col xs={24} md={6}>
                      <Card title={<CardTitle title={t("To'lovlar")} />}>
                        <Flex vertical gap={"large"}>
                          {get(data, "status", "") === "Qarzdorlik" ? (
                            <>
                              <TitleAndIconText
                                title={t("Qarzdorlik").toUpperCase()}
                                value={NumberToThousandFormat(
                                  get(data, "debt_balance", "")
                                )}
                                icon={<RiRefundLine />}
                              />
                              <Divider style={{ margin: "0" }} />
                              <TitleAndIconText
                                title={t("Holati").toUpperCase()}
                                value={
                                  <Tag color={"red"}>{t("Qardorlik")}</Tag>
                                }
                                icon={<RiColorFilterFill />}
                              />
                              <AddPaymentForStorageProduct
                                summa={get(data, "debt_balance", "")}
                                refetch={refetch}
                                item={data}
                              />
                            </>
                          ) : (
                            <>
                              <TitleAndIconText
                                title={t("Holati").toUpperCase()}
                                value={
                                  <Tag color={"green"}>{t("To'langan")}</Tag>
                                }
                                icon={<RiColorFilterFill />}
                              />
                            </>
                          )}
                        </Flex>
                      </Card>
                    </Col>
                    <Col xs={24}>
                      <StorageProducts supplier={get(data, "id", "")} />
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

export default SupplierDetailPage;

const StorageProducts = ({ supplier }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: null,
  });

  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState("");

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
    queryKey: [
      "storage-products",
      {
        page: pagination.current,
        pageSize: pagination.pageSize,
        filters: filters,
      },
    ],
    queryFn: () =>
      httpGetStorageProducts(
        pagination.current,
        pagination.pageSize,
        objectToQueryString({ supplier, ...filters })
      ),
    select: (response) => response.data,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data) {
      setPagination((prevPagination) => ({
        ...prevPagination,
        current: data.current || 1,
        pageSize: data.pageSize || 10,
        total: data.total || "",
      }));
    }
  }, [data]);

  const handleTableChange = (newPagination, tabelFilters) => {
    setPagination({
      ...newPagination,
    });
    setFilters(tabelFilters);
  };

  const clearFilters = () => {
    setFilters({});
    setSearch("");
  };

  const handleOnSearch = (value) => {
    setFilters({ ...filters, search: value });
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const TABLE_COLUMNS = useStorageProductColumns(
    pagination,
    filters,
    setFilters,
    refetch
  ).filter((item) => item.key !== "supplier");

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("Omborga mahsulot")}</PageTitle>
          </Flex>
        </Col>
        <Col span={24}>
          <Row gutter={[20, 20]}>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <GlobalSearchInput
                value={search}
                enterButton
                onSearch={handleOnSearch}
                onChange={handleChangeSearch}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={18} xl={18}>
              <Flex align="center" justify="end" gap="middle">
                <ClearFilterButton onClick={clearFilters} />
                <CreateButton onClick={() => navigate("create")} />
              </Flex>
            </Col>
            <Col span={24}>
              <CustomDataTable
                columns={TABLE_COLUMNS}
                data={data?.results || []}
                pagination={pagination}
                loading={isLoading || isRefetching}
                onChange={handleTableChange}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
