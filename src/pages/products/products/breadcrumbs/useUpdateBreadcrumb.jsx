import { useTranslation } from "react-i18next";
import { NavLink, useParams } from "react-router-dom";

export const useUpdateBreadcrumbItems = () => {
  const { t } = useTranslation();

  const { id } = useParams();

  return [
    {
      title: t("Mahsulot"),
    },
    {
      title: <NavLink to={"/products/products"}>{t("Mahsulotlar")}</NavLink>,
    },
    {
      title: t("Mahsulotni tahrirlash"),
    },
    {
      title: id,
    },
  ];
};
