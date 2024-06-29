import PageTitle from "@/components/molecules/page-title/PageTitle";
import { Breadcrumb, Col, Flex, Row } from "antd";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import ProductForm from "./_components/ProductForm";
import { useCreateBreadcrumbItems } from "./breadcrumbs/useCreateBreadcrumb";
import BackButton from "@/components/molecules/back-button/BackButton";

const CreateProductsPage = () => {
  const { t } = useTranslation();

  //   const mutation = useMutation(httpPostProduct, {
  //     onSuccess: scrollToTop,
  //     onError: scrollToTop,
  //   });

  const handleSubmit = async (values, reset) => {
    // const response = await mutation.mutateAsync(values);
    // if (response?.status === 201) {
    //   reset();
    // }
  };

  const BREADCRUMB_ITEMS = useCreateBreadcrumbItems();

  return (
    <>
      <Helmet>
        <title>{t("Mahsulot qo'shish")}</title>
      </Helmet>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("Mahsulot qo'shish")}</PageTitle>
            <BackButton />
          </Flex>
        </Col>
        <Col span={24}>
          <Breadcrumb items={BREADCRUMB_ITEMS} />
        </Col>
        <Col span={24}>
          <ProductForm
            handleSubmit={handleSubmit}
            defaultValues={{}}
            // actionLoading={isLoading}
          />
        </Col>
      </Row>
    </>
  );
};

export default CreateProductsPage;
