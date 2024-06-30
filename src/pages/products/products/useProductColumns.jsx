import { get } from "lodash";
import { Tag, Button, Flex } from "antd";
import { EyeFilled, EditFilled, DeleteFilled } from "@ant-design/icons";
import { RiListSettingsFill } from "@remixicon/react";
import useProductFormats from "@/hooks/api/useProductFormats";
import useProductCategories from "@/hooks/api/useProductCategories";
import useProductTypes from "@/hooks/useProductTypes";
import { useNavigate } from "react-router-dom";
import CustomModalConfirm from "@/components/molecules/custom-modal-confirm/CustomModalConfirm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpDeleteProduct } from "@/services/api/requests/products.requests";
import {
  handleErrorNotification,
  handleSuccessNotification,
} from "@/utils/helpers";

export const useProductColumns = (pagination, filters, setFilters) => {
  const navigate = useNavigate();

  const { productFormatsOptions } = useProductFormats();
  const { productCategoriesOptions } = useProductCategories();
  const productTypes = useProductTypes();

  const queryClient = useQueryClient();

  const deleteMutate = useMutation({
    mutationFn: httpDeleteProduct,
    onSuccess: () => {
      handleSuccessNotification();
      queryClient.invalidateQueries({
        queryKey: [
          "products",
          {
            page: pagination.current,
            pageSize: pagination.pageSize,
            filters: filters,
          },
        ],
      });
    },
    onError: (error) => {
      handleErrorNotification(error);
    },
  });

  const handleDelete = (id) => {
    deleteMutate.mutate(id);
  };

  return [
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
      title: <RiListSettingsFill size={15} />,
      dataIndex: "id",
      key: "operation",
      align: "center",
      width: 100,
      render: (id) => (
        <Flex align="center" justify="space-between" gap={"middle"}>
          <Button type="primary" icon={<EyeFilled />} />

          <Button
            onClick={() => navigate(`/products/products/update/${id}`)}
            icon={<EditFilled />}
          />
          <CustomModalConfirm
            trigger={<Button danger icon={<DeleteFilled />} />}
            onOk={() => handleDelete(id)}
          />
        </Flex>
      ),
    },
  ];
};
