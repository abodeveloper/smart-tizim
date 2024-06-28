import CustomDataTable from "@/components/molecules/custom-data-table/CustomDataTable";
import { useErrorNotification } from "@/hooks/helpers/useErrorNotification";
import { httpGetProducts } from "@/services/api/products.requests";
import { objectToQueryString } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Button, Col, Flex, Row, Tag, Typography } from "antd";
import { get } from "lodash";
import { useEffect, useState } from "react";
import {
  DeleteFilled,
  EyeFilled,
  EditFilled,
  HomeOutlined,
  PlusOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import useProductFormats from "@/hooks/api/useProductFormats";
import useProductCategories from "@/hooks/api/useProductCategories";
import { useTheme } from "styled-components";
import useProductTypes from "@/hooks/useProductTypes";
import PageTitle from "@/components/molecules/page-title/PageTitle";

const ProductsPage = () => {
  const styledComponentsTheme = useTheme();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: null,
  });

  const [filters, setFilters] = useState({});

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
      "products",
      {
        page: pagination.current,
        pageSize: pagination.pageSize,
        filters: filters,
      },
    ],
    queryFn: () =>
      httpGetProducts(
        pagination.current,
        pagination.pageSize,
        objectToQueryString(filters)
      ),
    select: (response) => response.data,
  });

  useErrorNotification({
    isError,
    error,
  });

  useEffect(() => {
    if (data) {
      setPagination({
        current: get(data, "current", 1),
        pageSize: get(data, "pageSize", 10),
        total: get(data, "total", ""),
      });
    }
  }, [data]);

  const handleTableChange = (pagination, tabelFilters) => {
    setPagination({
      ...pagination,
    });
    setFilters(tabelFilters);
  };

  const clearFilters = () => {
    setFilters({});
  };

  const { productFormatsOptions } = useProductFormats();
  const { productCategoriesOptions } = useProductCategories();
  const productTypes = useProductTypes();

  const columns = [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
      render: (id, item, index) => {
        return (
          <>{(pagination.current - 1) * pagination.pageSize + index + 1}</>
        );
      },
    },
    {
      title: "Nomi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Narxi",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Kategoriya",
      dataIndex: "category",
      key: "category_id",
      render: (category) => {
        return <>{get(category, "name", "")}</>;
      },
      filters: [...productCategoriesOptions],
      filteredValue: filters.category_id || null,
      filterSearch: true,
    },
    {
      title: "Mahsulot turi",
      dataIndex: "product_type",
      filters: [...productTypes],
      filteredValue: filters.product_type || null,
      filterSearch: true,
      render: (product_type) => {
        switch (product_type) {
          case "Sanaladigan":
            return <Tag color={"green"}>{product_type}</Tag>;
          case "Sanalmaydigan":
            return <Tag color={"red"}>{product_type}</Tag>;
        }
      },
    },
    {
      title: "Omboragi joriy miqdori",
      dataIndex: "current_total_count",
      key: "format_id",
      render: (current_total_count, item) => {
        return (
          <>
            {current_total_count} {get(item, "format.name", "")}
          </>
        );
      },
      filters: [...productFormatsOptions],
      filteredValue: filters.format_id || null,
      filterSearch: true,
    },
    {
      title: "Amallar",
      key: "operation",
      fixed: "right",
      width: 100,
      render: () => (
        <Flex align="center" justify="space-between">
          <EyeFilled
            style={{ color: styledComponentsTheme.colors.primaryColor }}
          />
          <EditFilled twoToneColor="red" />
          <DeleteFilled twoToneColor="red" />
        </Flex>
      ),
    },
  ];

  const BREADCRUMB_ITEMS = [
    {
      title: "Asosiy",
      icon: <HomeOutlined />,
    },
    {
      title: "Mahsulotlar",
    },
  ];

  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <Flex align="center" justify="space-between">
          <PageTitle>Mahsulotlar</PageTitle>
          <Flex align="center" justify="space-between" gap="middle">
            <Button icon={<ClearOutlined />} onClick={clearFilters}>
              Tozalash
            </Button>
            <Button type="primary" icon={<PlusOutlined />}>
              Qo'shish
            </Button>
          </Flex>
        </Flex>
      </Col>
      <Col span={24}>
        <Breadcrumb items={BREADCRUMB_ITEMS} />
      </Col>
      <Col span={24}>
        <Flex align="center" justify="space-between" gap="middle">
          <Button icon={<ClearOutlined />} onClick={clearFilters}>
            Tozalash
          </Button>
          <Button type="primary" icon={<PlusOutlined />}>
            Qo'shish
          </Button>
        </Flex>
        <CustomDataTable
          columns={columns}
          data={get(data, "results", [])}
          pagination={pagination}
          loading={isLoading}
          onChange={handleTableChange}
        />
      </Col>
    </Row>
  );
};

export default ProductsPage;
