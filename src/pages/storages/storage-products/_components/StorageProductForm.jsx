import CustomCascader from "@/components/atoms/form-elements/custom-cascader/CustomCascader";
import CustomDatePicker from "@/components/atoms/form-elements/custom-date-picker/CustomDatePicker";
import CustomInputNumber from "@/components/atoms/form-elements/custom-input-number/CustomInputNumber";
import CustomSelect from "@/components/atoms/form-elements/custom-select/CustomSelect";
import useProducts from "@/hooks/api/useProducts";
import useServices from "@/hooks/api/useServices";
import useStorages from "@/hooks/api/useStorages";
import useSuppliers from "@/hooks/api/useSuppliers";
import useSizeType from "@/hooks/useSizeType";
import { prepareStorageProductDto } from "@/services/api/prepare-data/storage-products";
import {
  getValidationStatus,
  getValidationStatusForArray,
} from "@/utils/helpers";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Cascader, Col, Divider, Flex, Form, Row } from "antd";
import Typography from "antd/es/typography/Typography";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { array, number, object, string } from "yup";

const StorageProductForm = ({
  defaultValues,
  handleSubmit,
  actionLoading = false,
  readOnly = false,
}) => {
  const { t } = useTranslation();

  const validationSchema = object().shape({
    name: string().required(t("Maydonni kiritishingiz shart !")),
    products: array().of(
      object().shape({
        product: string().required(t("Maydonni kiritishingiz shart !")),
        size_type: string().required(t("Maydonni kiritishingiz shart !")),
        storage_count: number()
          .min(0, t("Miqdor noldan katta yoki teng bo'lishi kerak !"))
          .required(t("Maydonni kiritishingiz shart !")),
        part_size: string().when("size_type", {
          is: "O'lchovli",
          then: () => string().required(t("Maydonni kiritishingiz shart !")),
        }),
        height: string().when("size_type", {
          is: "Formatli",
          then: () => string().required(t("Maydonni kiritishingiz shart !")),
        }),
        width: string().when("size_type", {
          is: "Formatli",
          then: () => string().required(t("Maydonni kiritishingiz shart !")),
        }),
      })
    ),
    services: array().of(
      object().shape({
        name: string().required(t("Maydonni kiritishingiz shart !")),
        count: number()
          .min(0, t("Miqdor noldan katta yoki teng bo'lishi kerak !"))
          .required(t("Maydonni kiritishingiz shart !")),
        price: number()
          .min(0, t("Narx noldan katta yoki teng bo'lishi kerak !"))
          .required(t("Maydonni kiritishingiz shart !")),
      })
    ),
  });

  const resolver = yupResolver(validationSchema);

  const { storagesOptions } = useStorages();
  const { servicesOptions } = useServices();
  const { suppliersOptions } = useSuppliers();
  const { productsOptions, productsData } = useProducts();
  const SIZE_TYPE = useSizeType();

  const {
    control,
    formState: { errors },
    reset,
    watch,
    setValue,
    getValues,
    ...rest
  } = useForm({
    defaultValues: {
      added: dayjs(),
      products: [{ size_type: "O'lchovsiz" }],
      services: [],
      ...defaultValues,
    },
    resolver,
  });

  const {
    fields: productFields,
    append: appendProduct,
    remove: removeProduct,
  } = useFieldArray({
    control,
    name: "products",
  });

  const {
    fields: serviceFields,
    append: appendService,
    remove: removeService,
  } = useFieldArray({
    control,
    name: "services",
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const handleReset = () => reset({});

  const onSubmit = rest.handleSubmit((values) => {
    handleSubmit(prepareStorageProductDto(values), handleReset);
  });

  const handleChange = (value) => {
    const currentServices = watch("services") || [];

    // Agar value bo'sh bo'lsa, barcha elementlarni o'chirish
    if (value.length === 0) {
      currentServices
        .slice()
        .reverse()
        .forEach((_, index) =>
          removeService(currentServices.length - 1 - index)
        );
      return;
    }

    const newServices = value.map((item) => item[0]);

    // Yangi service ni qo'shish
    value.forEach((item) => {
      if (!currentServices.some((service) => service.service === item[0])) {
        appendService({
          service: item[0],
          count: 1,
        });
      }
    });

    // Eskirgan service ni olib tashlash
    currentServices.forEach((currentService, index) => {
      if (!newServices.includes(currentService.service)) {
        removeService(index);
      }
    });
  };

  const handleRemoveService = (index) => {
    const currentServices = watch("services") || [];
    const serviceToRemove = currentServices[index].service;
    // Service ni services array dan o'chirish
    removeService(index);
    // Service ni services_types array dan o'chirish
    setValue(
      "service_types",
      watch("service_types")?.filter(
        (service) => service[0] !== serviceToRemove
      )
    );
  };

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
        <Col xs={24} md={18}>
          <Flex gap="large" vertical>
            <Card>
              <Flex
                horizontal
                align="center"
                justify="space-between"
                style={{ marginBottom: "20px" }}
              >
                <Typography.Title level={5}>
                  {t("Ombor va ta'minotchi")}
                </Typography.Title>
              </Flex>
              <Row gutter={[20, 20]}>
                <Col xs={24} md={6}>
                  <Form.Item
                    label={t("Ombor")}
                    {...getValidationStatus(errors, "storage")}
                    required={true}
                  >
                    <Controller
                      name="storage"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect options={storagesOptions} {...field} />
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item
                    label={t("Ta'minotchi")}
                    {...getValidationStatus(errors, "supplier")}
                    required={true}
                  >
                    <Controller
                      name="supplier"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect options={suppliersOptions} {...field} />
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item
                    label={t("Xizmatlar")}
                    {...getValidationStatus(errors, "service_types")}
                    required={false}
                  >
                    <Controller
                      name="service_types"
                      control={control}
                      render={({ field }) => (
                        <CustomCascader
                          {...field}
                          options={servicesOptions}
                          onChange={(value) => {
                            field.onChange(value); // Controller qiymatni o'zlashtirish uchun
                            handleChange(value); // Qo'shimcha logic
                          }}
                          multiple
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            {!isEmpty(serviceFields) && (
              <Card>
                <Flex
                  horizontal
                  align="center"
                  justify="space-between"
                  style={{ marginBottom: "20px" }}
                >
                  <Typography.Title level={5}>
                    {t("Qo'shimcha xizmatlar")}
                  </Typography.Title>
                </Flex>
                <Flex gap="large" vertical>
                  {serviceFields.map((item, index) => (
                    <>
                      <Row gutter={[20, 20]}>
                        <Col xs={24} md={22}>
                          <Card hoverable={true}>
                            <Row gutter={[20, 20]} key={item.id}>
                              <Col xs={24} md={6}>
                                <Form.Item
                                  label={t("Xizmat")}
                                  {...getValidationStatusForArray(
                                    errors,
                                    "services",
                                    index,
                                    "service"
                                  )}
                                  required={true}
                                >
                                  <Controller
                                    name={`services.${index}.service`}
                                    control={control}
                                    render={({ field }) => (
                                      <CustomSelect
                                        {...field}
                                        disabled={true}
                                        options={servicesOptions}
                                      />
                                    )}
                                  />
                                </Form.Item>
                              </Col>
                              <Col xs={24} md={6}>
                                <Form.Item
                                  label={t("Miqdori")}
                                  {...getValidationStatusForArray(
                                    errors,
                                    "services",
                                    index,
                                    "count"
                                  )}
                                  required={true}
                                >
                                  <Controller
                                    name={`services.${index}.count`}
                                    control={control}
                                    render={({ field }) => (
                                      <CustomInputNumber {...field} />
                                    )}
                                  />
                                </Form.Item>
                              </Col>
                              <Col xs={24} md={6}>
                                <Form.Item
                                  label={t("Narxi")}
                                  {...getValidationStatusForArray(
                                    errors,
                                    "services",
                                    index,
                                    "price"
                                  )}
                                  required={true}
                                >
                                  <Controller
                                    name={`services.${index}.price`}
                                    control={control}
                                    render={({ field }) => (
                                      <CustomInputNumber {...field} />
                                    )}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                        <Col xs={24} md={2}>
                          <Button
                            icon={<DeleteFilled />}
                            danger
                            onClick={() => handleRemoveService(index)}
                          >
                            {/* {t("O'chirish")} */}
                          </Button>
                        </Col>
                      </Row>
                    </>
                  ))}
                </Flex>
              </Card>
            )}

            <Card>
              <Flex
                horizontal
                align="center"
                justify="space-between"
                style={{ marginBottom: "20px" }}
              >
                <Typography.Title level={5}>
                  {t("Mahsulotlar")}
                </Typography.Title>
                <Button
                  icon={<PlusOutlined />}
                  type="primary"
                  onClick={() => appendProduct({ size_type: "O'lchovsiz" })}
                >
                  {t("MAHSULOT")}
                </Button>
              </Flex>
              <Flex gap="large" vertical>
                {productFields.map((item, index) => (
                  <>
                    <Row gutter={[20, 20]}>
                      <Col xs={24} md={22}>
                        <Card hoverable={true}>
                          <Row gutter={[20, 20]} key={item.id}>
                            <Col xs={24} md={6}>
                              <Form.Item
                                label={t("Mahsulot")}
                                {...getValidationStatusForArray(
                                  errors,
                                  "products",
                                  index,
                                  "product"
                                )}
                                required={true}
                              >
                                <Controller
                                  name={`products.${index}.product`}
                                  control={control}
                                  render={({ field }) => (
                                    <CustomSelect
                                      {...field}
                                      options={productsOptions}
                                      onChange={(value) => {
                                        field.onChange(value);
                                        const selectedProduct =
                                          productsData.find(
                                            (item) => item.id === value
                                          );
                                        if (selectedProduct) {
                                          setValue(
                                            `products.${index}.price`,
                                            selectedProduct.price
                                          );
                                        }
                                      }}
                                    />
                                  )}
                                />
                              </Form.Item>
                            </Col>
                            <Col xs={24} md={6}>
                              <Form.Item
                                label={t("Narxi")}
                                {...getValidationStatusForArray(
                                  errors,
                                  "products",
                                  index,
                                  "price"
                                )}
                                required={true}
                              >
                                <Controller
                                  name={`products.${index}.price`}
                                  control={control}
                                  render={({ field }) => (
                                    <CustomInputNumber {...field} />
                                  )}
                                />
                              </Form.Item>
                            </Col>
                            <Col xs={24} md={6}>
                              <Form.Item
                                label={t("Size type")}
                                {...getValidationStatusForArray(
                                  errors,
                                  "products",
                                  index,
                                  "size_type"
                                )}
                                required={true}
                              >
                                <Controller
                                  name={`products.${index}.size_type`}
                                  control={control}
                                  render={({ field }) => (
                                    <CustomSelect
                                      options={SIZE_TYPE}
                                      showSearch={false}
                                      {...field}
                                    />
                                  )}
                                />
                              </Form.Item>
                            </Col>
                            <Col xs={24} md={6}>
                              <Form.Item
                                label={t("Storage count")}
                                {...getValidationStatusForArray(
                                  errors,
                                  "products",
                                  index,
                                  "storage_count"
                                )}
                                required={true}
                              >
                                <Controller
                                  name={`products.${index}.storage_count`}
                                  control={control}
                                  render={({ field }) => (
                                    <CustomInputNumber {...field} />
                                  )}
                                />
                              </Form.Item>
                            </Col>

                            {watch(`products.${index}.size_type`) ===
                              "O'lchovli" && (
                              <Col xs={24} md={6}>
                                <Form.Item
                                  label={t("Part size")}
                                  {...getValidationStatusForArray(
                                    errors,
                                    "products",
                                    index,
                                    "part_size"
                                  )}
                                  required={true}
                                >
                                  <Controller
                                    name={`products.${index}.part_size`}
                                    control={control}
                                    render={({ field }) => (
                                      <CustomInputNumber {...field} />
                                    )}
                                  />
                                </Form.Item>
                              </Col>
                            )}

                            {watch(`products.${index}.size_type`) ===
                              "Formatli" && (
                              <>
                                <Col xs={24} md={6}>
                                  <Form.Item
                                    label={t("Height")}
                                    {...getValidationStatusForArray(
                                      errors,
                                      "products",
                                      index,
                                      "height"
                                    )}
                                    required={true}
                                  >
                                    <Controller
                                      name={`products.${index}.height`}
                                      control={control}
                                      render={({ field }) => (
                                        <CustomInputNumber {...field} />
                                      )}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={6}>
                                  <Form.Item
                                    label={t("Width")}
                                    {...getValidationStatusForArray(
                                      errors,
                                      "products",
                                      index,
                                      "width"
                                    )}
                                    required={true}
                                  >
                                    <Controller
                                      name={`products.${index}.width`}
                                      control={control}
                                      render={({ field }) => (
                                        <CustomInputNumber {...field} />
                                      )}
                                    />
                                  </Form.Item>
                                </Col>
                              </>
                            )}
                          </Row>
                        </Card>
                      </Col>
                      <Col xs={24} md={2}>
                        <Button
                          icon={<DeleteFilled />}
                          danger
                          onClick={() => removeProduct(index)}
                        >
                          {/* {t("O'chirish")} */}
                        </Button>
                      </Col>
                    </Row>
                  </>
                ))}
              </Flex>
            </Card>
          </Flex>
        </Col>
        <Col xs={24} md={6}>
          <Card>
            <Flex
              horizontal
              align="center"
              justify="space-between"
              style={{ marginBottom: "20px" }}
            >
              <Typography.Title level={5}>
                {t("Umumiy ma'lumotlar")}
              </Typography.Title>
            </Flex>
            <Row gutter={[20, 20]}>
              <Col xs={24} md={24}>
                <Form.Item
                  label={t("Qo'shilgan vaqti")}
                  {...getValidationStatus(errors, "added")}
                  required={true}
                >
                  <Controller
                    name="added"
                    control={control}
                    render={({ field }) => <CustomDatePicker {...field} />}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={24}>
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
            </Row>
          </Card>
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

export default StorageProductForm;
