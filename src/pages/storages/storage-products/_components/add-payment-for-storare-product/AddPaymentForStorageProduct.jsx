import CustomDatePicker from "@/components/atoms/form-elements/custom-date-picker/CustomDatePicker";
import CustomInputNumber from "@/components/atoms/form-elements/custom-input-number/CustomInputNumber";
import TitleAndIconText from "@/components/molecules/title-and-icon-text/TitleAndIconText";
import { httpAddPaymentStorageProduct } from "@/services/api/requests/storage-products.requests";
import {
  NumberToThousandFormat,
  getValidationStatus,
  handleSuccessNotification,
} from "@/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  RiBankCardLine,
  RiCashLine,
  RiCopperCoinLine,
  RiMoneyDollarBoxLine,
} from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { Button, Col, Flex, Form, Modal, Row } from "antd";
import dayjs from "dayjs";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { object, string } from "yup";

const AddPaymentForStorageProduct = ({ summa, refetch, item }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { t } = useTranslation();

  const validationSchema = object()
    .shape({
      cash: string().nullable(),
      card: string().nullable(),
      other: string().nullable(),
    })
    .test(
      "one-of-three-required",
      t("Cash, Card yoki Other maydonlaridan biri kiritilishi shart !"),
      function (value) {
        return value.cash || value.card || value.other;
      }
    );

  const resolver = yupResolver(validationSchema);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
  } = useForm({
    resolver,
    defaultValues: {
      date: dayjs(),
    },
  });

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: httpAddPaymentStorageProduct,
    onSuccess: () => {
      handleSuccessNotification(t("Muvaffaqiyatli bajarildi !"));
      handleCancel();
      reset();
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    mutateAsync({ ...data, storage_product: get(item, "id", "") });
  };

  useEffect(() => {
    const card = getValues("card") || 0;
    const other = getValues("other") || 0;
    const remainingCash = summa - card - other;
    if (remainingCash !== getValues("cash")) {
      setValue("cash", remainingCash >= 0 ? remainingCash : 0);
    }
  }, [summa, watch("card"), watch("other")]);

  useEffect(() => {
    const cash = getValues("cash") || 0;
    const other = getValues("other") || 0;
    const remainingCard = summa - cash - other;
    if (remainingCard !== getValues("card")) {
      setValue("card", remainingCard >= 0 ? remainingCard : 0);
    }
  }, [summa, watch("cash"), watch("other")]);

  useEffect(() => {
    const cash = getValues("cash") || 0;
    const card = getValues("card") || 0;
    const remainingOther = summa - cash - card;
    if (remainingOther !== getValues("other")) {
      setValue("other", remainingOther >= 0 ? remainingOther : 0);
    }
  }, [summa, watch("cash"), watch("card")]);

  return (
    <>
      <Button onClick={showModal} type="primary">
        {t("To'lov qilish")}
      </Button>
      <Modal
        width={400}
        title={t("To'lov qilish")}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Flex align="center" gap="middle" justify="end">
            <Button key="cancel" onClick={handleCancel}>
              {t("Bekor qilish")}
            </Button>
            <Button
              key="submit"
              type="primary"
              disabled={isLoading}
              loading={isLoading}
              onClick={handleSubmit(onSubmit)}
            >
              {t("To'lash")}
            </Button>
          </Flex>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
          style={{ margin: "30px 0px" }}
        >
          <Row gutter={[20, 15]}>
            <Col xs={24} md={24}>
              <TitleAndIconText
                type="danger"
                title={t("Qarzdorlik").toUpperCase()}
                value={NumberToThousandFormat(summa)}
                icon={<RiMoneyDollarBoxLine />}
              />
            </Col>
            <Col xs={24} md={24}>
              <Form.Item
                label={t("Naqt")}
                {...getValidationStatus(errors, "cash")}
                required={true}
              >
                <Controller
                  name="cash"
                  control={control}
                  render={({ field }) => (
                    <CustomInputNumber prefix={<RiCashLine />} {...field} />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24}>
              <Form.Item
                label={t("Karta orqali")}
                {...getValidationStatus(errors, "card")}
                required={true}
              >
                <Controller
                  name="card"
                  control={control}
                  render={({ field }) => (
                    <CustomInputNumber prefix={<RiBankCardLine />} {...field} />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24}>
              <Form.Item
                label={t("Boshqa")}
                {...getValidationStatus(errors, "other")}
                required={true}
              >
                <Controller
                  name="other"
                  control={control}
                  render={({ field }) => (
                    <CustomInputNumber
                      prefix={<RiCopperCoinLine />}
                      {...field}
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24}>
              <Form.Item
                label={t("Sana")}
                {...getValidationStatus(errors, "date")}
                required={true}
              >
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => <CustomDatePicker {...field} />}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AddPaymentForStorageProduct;
