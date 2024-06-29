import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export const useCreateBreadcrumbItems = () => {
  const { t } = useTranslation();

  return [
    {
      title: t("Mahsulot"),
    },
    {
      title: <NavLink to={"/products/products"}>{t("Mahsulotlar")}</NavLink>,
      href: "#",
    },
    {
      title: t("Mahsulot qo'shish"),
    },
  ];
};
