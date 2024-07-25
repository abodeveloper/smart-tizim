import BackButton from "@/components/atoms/back-button/BackButton";
import ClearFilterButton from "@/components/atoms/clear-filter-button/ClearFilterButton";
import CreateButton from "@/components/atoms/create-button/CreateButton";
import CardTitle from "@/components/molecules/card-title/CardTitle";
import CustomDataTable from "@/components/molecules/custom-data-table/CustomDataTable";
import ErrorResult from "@/components/molecules/error-result/ErrorResult";
import GlobalSearchInput from "@/components/molecules/global-search-input/GlobalSearchInput";
import PageLoader from "@/components/molecules/page-loader/PageLoader";
import PageTitle from "@/components/molecules/page-title/PageTitle";
import TitleAndIconText from "@/components/molecules/title-and-icon-text/TitleAndIconText";
import { useStorageProductColumns } from "@/pages/storages/storage-products/useStorageProductColumns";
import {
  httpDeletePaymentStorageProduct,
  httpGetStorageProducts,
} from "@/services/api/requests/storage-products.requests";
import { httpGetSupplierOne } from "@/services/api/requests/suppliers.requests";
import {
  NumberToThousandFormat,
  formatTimeForUI,
  handleSuccessNotification,
  objectToQueryString,
} from "@/utils/helpers";
import { DeleteFilled } from "@ant-design/icons";
import {
  RiCalendarTodoFill,
  RiColorFilterFill,
  RiListSettingsFill,
  RiPhoneFill,
  RiRefundLine,
  RiSlideshowLine,
  RiStackFill,
  RiUser2Fill,
} from "@remixicon/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Breadcrumb, Button, Card, Col, Divider, Flex, Row, Tag } from "antd";
import { get, isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import AddDebtForSupplier from "./_components/add-debt-for-supplier/AddDebtForSupplier";
import AddPaymentForSupplier from "./_components/add-payment-for-supplier/AddPaymentForSupplier";
import { useDetailBreadcrumbItems } from "./breadcrumbs/useDetailBreadcrumb";
import CustomModalConfirm from "@/components/molecules/custom-modal-confirm/CustomModalConfirm";

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
                        {!isEmpty(get(data, "payments", [])) && (
                          <Payments
                            data={get(data, "payments", [])}
                            refetch={refetch}
                          />
                        )}
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
                              <AddDebtForSupplier
                                refetch={refetch}
                                item={data}
                              />
                              <Divider style={{ margin: "0" }} />
                              <TitleAndIconText
                                title={t("Holati").toUpperCase()}
                                value={
                                  <Tag color={"red"}>{t("Qardorlik")}</Tag>
                                }
                                icon={<RiColorFilterFill />}
                              />
                              <AddPaymentForSupplier
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
                      <Divider />
                      <StorageProducts
                        supplier={get(data, "id", "")}
                        supplierRefetch={refetch}
                      />
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

const StorageProducts = ({ supplier, supplierRefetch }) => {
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

  const handleRefetch = () => {
    refetch();
    supplierRefetch();
  };

  const TABLE_COLUMNS = useStorageProductColumns(
    pagination,
    filters,
    setFilters,
    handleRefetch
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
                <CreateButton
                  onClick={() => navigate("/storages/storage-products/create")}
                />
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

function Payments({ data, refetch }) {
  const { t } = useTranslation();

  const deleteMutate = useMutation({
    mutationFn: httpDeletePaymentStorageProduct,
    onSuccess: () => {
      handleSuccessNotification(t("Muvaffaqiyatli bajarildi !"));
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDelete = (id) => {
    deleteMutate.mutate(id);
  };

  const columns = [
    {
      title: t("#"),
      dataIndex: "index",
      key: "index",
      render: (value, item, index) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: t("Naqt"),
      dataIndex: "cash",
      key: "cash",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>;
      },
    },
    {
      title: t("Karta"),
      dataIndex: "card",
      key: "card",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>;
      },
    },
    {
      title: t("Boshqa"),
      dataIndex: "other",
      key: "other",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>;
      },
    },
    {
      title: t("Jami summa"),
      dataIndex: "total",
      key: "other",
      render: (value, row) => {
        return <>{NumberToThousandFormat(row.cash + row.card + row.other)}</>;
      },
    },
    {
      title: <RiListSettingsFill size={15} />,
      dataIndex: "id",
      key: "operation",
      align: "center",
      width: 50,
      align: "center",
      render: (id) => (
        <Flex align="center" justify="space-between" gap={"small"}>
          <CustomModalConfirm
            trigger={<Button danger icon={<DeleteFilled />} />}
            onOk={() => handleDelete(id)}
          />
        </Flex>
      ),
    },
  ];

  return (
    <CustomDataTable title={t("To'lovlar")} data={data} columns={columns} />
  );
}
