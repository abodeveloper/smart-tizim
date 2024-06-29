import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "antd";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { object, string } from "yup";

const ProductForm = ({
  defaultValues,
  handleSubmit,
  actionLoading = false,
  readOnly = false,
}) => {
  const { t } = useTranslation();

  const validationSchema = object().shape({
    name: string().required(t("Maydonni kiritishingiz shart !")),
    product: string().required(t("Maydonni kiritishingiz shart !")),
    format: string().required(t("Maydonni kiritishingiz shart !")),
    storage_type: string().required(t("Maydonni kiritishingiz shart !")),
    price: string()
      .test(
        "is-greater-than-zero",
        t("Narx noldan katta yoki teng bo'lishi kerak !"),
        (value) => parseFloat(value) >= 0
      )
      .required(t("Maydonni kiritishingiz shart !")),
  });

  const resolver = yupResolver(validationSchema);

  const {
    control,
    formState: { errors, isSubmitted },
    reset,
    setValue,
    watch,
    trigger,
    ...rest
  } = useForm({
    defaultValues,
    resolver,
  });

  const handleCancel = () => reset();

  const onSubmit = rest.handleSubmit((values) =>
    handleSubmit(values, handleCancel)
  );

  return (
    <>
      <Form
        layout="vertical"
        className="create-form"
        name="create-form"
        size="large"
        onFinish={handleSubmit(onSubmit)}
      ></Form>
    </>
  );
};

export default ProductForm;
