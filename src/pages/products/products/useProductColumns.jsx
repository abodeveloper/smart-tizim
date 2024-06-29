import { get } from "lodash";
import { Tag, Button, Flex } from "antd";
import { EyeFilled, EditFilled, DeleteFilled } from "@ant-design/icons";
import { RiListSettingsFill } from "@remixicon/react";
import useProductFormats from "@/hooks/api/useProductFormats";
import useProductCategories from "@/hooks/api/useProductCategories";
import useProductTypes from "@/hooks/useProductTypes";

export const useProductColumns = (pagination, filters, setFilters) => {
  const { productFormatsOptions } = useProductFormats();
  const { productCategoriesOptions } = useProductCategories();
  const productTypes = useProductTypes();

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
      key: "operation",
      align: "center",
      width: 100,
      render: () => (
        <Flex align="center" justify="space-between" gap={"middle"}>
          <Button type="primary" icon={<EyeFilled />} />
          <Button icon={<EditFilled />} />
          <Button danger icon={<DeleteFilled />} />
        </Flex>
      ),
    },
  ];
};
