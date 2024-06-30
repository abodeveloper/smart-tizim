import { Modal } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

const CustomModalConfirm = ({ trigger, title, content, onOk, onCancel }) => {
  const { t } = useTranslation();

  const showModal = () => {
    Modal.confirm({
      title: title || t("Tasdiqlash"),
      content: content || t("Siz haqiqatdan buni bajarmoqchimisiz ?"),
      cancelText: t("Bekor qilish"),
      onOk: onOk || (() => console.log("Ok clicked")),
      onCancel: onCancel || (() => console.log("Cancel clicked")),
    });
  };

  const TriggerElement = React.cloneElement(trigger, {
    onClick: showModal,
  });

  return TriggerElement;
};

export default CustomModalConfirm;
