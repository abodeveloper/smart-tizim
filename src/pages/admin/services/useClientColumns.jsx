import CustomModalConfirm from "@/components/molecules/custom-modal-confirm/CustomModalConfirm";
import useClientTypes from "@/hooks/useClientTypes";
import { httpDeleteClient } from "@/services/api/requests/clients.requests";
import {
  formatTimeForUI,
  handleSuccessNotification,
} from "@/utils/helpers.jsx";
import { DeleteFilled, EditFilled, EyeFilled } from "@ant-design/icons";
import { RiListSettingsFill } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { Button, Flex, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useClientColumns = (pagination, filters, setFilters, refetch) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const clientTypes = useClientTypes();

  const deleteMutate = useMutation({
    mutationFn: httpDeleteClient,
    onSuccess: () => {
      handleSuccessNotification();
      refetch();
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
      title: t("Telefon raqami"),
      dataIndex: "phone",
      key: "phone",
      render: (phone) => {
        return <>{phone}</>;
      },
    },
    {
      title: t("Mijoz turi"),
      dataIndex: "client_type",
      filters: [...clientTypes],
      filteredValue: filters.client_type || null,
      filterSearch: true,
      render: (client_type) => {
        switch (client_type) {
          case "Doimiy":
            return <Tag color={"green"}>{client_type}</Tag>;
          case "Tezkor":
            return <Tag color={"red"}>{client_type}</Tag>;
        }
      },
    },
    {
      title: t("Holati"),
      dataIndex: "is_active",
      key: "is_active",
      filters: [
        { text: t("Aktiv"), value: 1 },
        { text: "Aktiv emas", value: 0 },
      ],
      filteredValue: filters.is_active || null,
      render: (is_active) => {
        switch (is_active) {
          case true:
            return <Tag color={"green"}>{t("Aktiv")}</Tag>;
          case false:
            return <Tag color={"red"}>{t("Aktiv emas")}</Tag>;
        }
      },
    },
    {
      title: t("Qo'shilgan vaqti"),
      dataIndex: "added",
      key: "added",
      render: (added) => {
        return <>{formatTimeForUI(added)}</>;
      },
    },
    {
      title: t("Izoh"),
      dataIndex: "desc",
      key: "desc",
      render: (desc) => {
        return <>{desc}</>;
      },
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
            onClick={() => navigate(`update/${id}`)}
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
