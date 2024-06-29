import { useTranslation } from "react-i18next";

export const useListBreadcrumbItems = () => {
  const { t } = useTranslation();

  return [
    {
      title: t("Mahsulot"),
    },
    {
      title: t("Mahsulotlar"),
    },
  ];
};
