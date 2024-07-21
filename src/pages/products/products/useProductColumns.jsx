import CustomModalConfirm from "@/components/molecules/custom-modal-confirm/CustomModalConfirm";
import useProductCategories from "@/hooks/api/useProductCategories";
import useProductFormats from "@/hooks/api/useProductFormats";
import useProductTypes from "@/hooks/useProductTypes";
import { httpDeleteProduct } from "@/services/api/requests/products.requests";
import {
  NumberToThousandFormat,
  handleSuccessNotification,
} from "@/utils/helpers.jsx";
import { DeleteFilled, EditFilled, EyeFilled } from "@ant-design/icons";
import { RiListSettingsFill } from "@remixicon/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Tag } from "antd";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useProductColumns = (pagination, filters, setFilters) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { productFormatsOptions } = useProductFormats();
  const { productCategoriesOptions } = useProductCategories();
  const productTypes = useProductTypes();

  const queryClient = useQueryClient();

  const deleteMutate = useMutation({
    mutationFn: httpDeleteProduct,
    onSuccess: () => {
      handleSuccessNotification(t("Muvaffaqiyatli bajarildi !"));
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
      console.log(error);
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
      title: t("Nomi"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("Narxi"),
      dataIndex: "price",
      key: "price",
      render: (price) => {
        return <>{NumberToThousandFormat(price, "")}</>;
      },
    },
    {
      title: t("Kategoriya"),
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
      title: t("Mahsulot turi"),
      dataIndex: "product_type",
      key: "product_type",
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
      title: t("Omboragi joriy miqdori"),
      dataIndex: "current_total_count",
      key: "format_id",
      render: (current_total_count, item) => {
        return (
          <>
            {NumberToThousandFormat(
              current_total_count,
              get(item, "format.name", "")
            )}
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
