import CustomDataTable from "@/components/molecules/custom-data-table/CustomDataTable";
import { httpGetProducts } from "@/services/api/products.requests";
import toast from "@/services/notification/notification";
import { useQuery } from "@tanstack/react-query";
import { Button, Col, Flex, Row, Typography } from "antd";
import axios from "axios";
import React, { useState } from "react";

const fetchPosts = async (page, pageSize) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${pageSize}`
  );
  return data;
};

const ProductsPage = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 100, // JSONPlaceholder has 100 posts
  });

  const {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
    isRefetching,
    ...rest
  } = useQuery({
    queryKey: [
      "products",
      { page: pagination.current, pageSize: pagination.pageSize },
    ],
    queryFn: () => httpGetProducts(pagination.current, pagination.pageSize),
    onError: (error) => {
      alert(1);
      toast
        .setMessage(get(error.response.data.error, "message", "Error"))
        .setDesc(get(error, "message"))
        .error();
    },
  });

  const handleTableChange = (pagination) => {
    setPagination({
      ...pagination,
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
    },
  ];

  return (
    <Row gutter={16}>
      <Col span={24}>
        <Flex align="center" justify="space-between">
          <Typography.Title level={2}>Mahsulotlar</Typography.Title>
          <Button type="primary">Mahsulot qo'shish</Button>
        </Flex>
      </Col>
      <Col span={24}>
        <CustomDataTable
          columns={columns}
          data={data}
          pagination={pagination}
          loading={isLoading}
          onChange={handleTableChange}
        />
      </Col>
    </Row>
  );
};

export default ProductsPage;
