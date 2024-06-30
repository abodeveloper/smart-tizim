import CustomInputNumber from "@/components/atoms/form-elements/custom-input-number/CustomInputNumber";
import CustomInput from "@/components/atoms/form-elements/custom-input/CustomInput";
import CustomSelect from "@/components/atoms/form-elements/custom-select/CustomSelect";
import useProductCategories from "@/hooks/api/useProductCategories";
import useProductFormats from "@/hooks/api/useProductFormats";
import useProductTypes from "@/hooks/useProductTypes";
import { getValidationStatus } from "@/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Divider, Flex, Form, Row } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { number, object, string } from "yup";

const ProductForm = ({
  defaultValues,
  handleSubmit,
  actionLoading = false,
  readOnly = false,
}) => {
  const { t } = useTranslation();

  const validationSchema = object().shape({
    category_id: string().required(t("Maydonni kiritishingiz shart !")),
    format_id: string().required(t("Maydonni kiritishingiz shart !")),
    product_type: string().required(t("Maydonni kiritishingiz shart !")),
    name: string().required(t("Maydonni kiritishingiz shart !")),
    price: number()
      .min(0, t("Narx noldan katta yoki teng bo'lishi kerak !"))
      .required(t("Maydonni kiritishingiz shart !")),
  });

  const resolver = yupResolver(validationSchema);

  const { productCategoriesOptions } = useProductCategories();
  const { productFormatsOptions } = useProductFormats();
  const productTypes = useProductTypes();

  const {
    control,
    formState: { errors },
    reset,
    watch,
    ...rest
  } = useForm({
    defaultValues,
    resolver,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const handleReset = () => reset({});

  const onSubmit = rest.handleSubmit((values) => {
    handleSubmit(values, handleReset);
  });

  return (
    <Form
      layout="vertical"
      className="create-form"
      name="create-form"
      size="large"
      onFinish={onSubmit}
    >
      <Divider />
      <Row gutter={[20, 20]}>
        <Col xs={24} md={6}>
          <Form.Item
            label={t("Name")}
            {...getValidationStatus(errors, "name")}
            required={true}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => <CustomInput {...field} />}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item
            label={t("Kategoriya")}
            {...getValidationStatus(errors, "category_id")}
            required={true}
          >
            <Controller
              name="category_id"
              control={control}
              render={({ field }) => (
                <CustomSelect options={productCategoriesOptions} {...field} />
              )}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item
            label={t("Format")}
            {...getValidationStatus(errors, "format_id")}
            required={true}
          >
            <Controller
              name="format_id"
              control={control}
              render={({ field }) => (
                <CustomSelect options={productFormatsOptions} {...field} />
              )}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item
            label={t("Mahsulot turi")}
            {...getValidationStatus(errors, "product_type")}
            required={true}
          >
            <Controller
              name="product_type"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  showSearch={false}
                  options={productTypes}
                  {...field}
                />
              )}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item
            label={t("Narxi")}
            {...getValidationStatus(errors, "price")}
            required={true}
          >
            <Controller
              name="price"
              control={control}
              render={({ field }) => <CustomInputNumber {...field} />}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item
            label={t("Barcode")}
            {...getValidationStatus(errors, "bar_code")}
          >
            <Controller
              name="bar_code"
              control={control}
              render={({ field }) => <CustomInput {...field} />}
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
      <Form.Item>
        <Flex align="center" justify="end" gap="middle">
          <Button htmlType="button" onClick={handleReset}>
            {t("Tozalash")}
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={actionLoading}
            disabled={actionLoading}
          >
            {t("Yuborish")}
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
