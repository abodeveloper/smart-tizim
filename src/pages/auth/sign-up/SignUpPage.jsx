import CustomInput from "@/components/atoms/form-elements/custom-input/CustomInput";
import CustomPasswordInput from "@/components/atoms/form-elements/custom-password-input/CustomPasswordInput";
import { httpPostSignIn } from "@/services/api/requests/auth.requests";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { getValidationStatus } from "@/utils/helpers";
import { UserOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, Col, Flex, Form, Row, Typography } from "antd";
import { get } from "lodash";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { StyledSignUpPage } from "./SignUpPage.styles";

const { Title, Text } = Typography;

const SignUpPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { setAccessToken } = useAuthStore();
  const { setMe } = useUserStore();

  const schema = object().shape({
    username: string().required(t("Username kiritilishi kerak !")),
    password: string().required(t("Password kiritilishi kerak !")),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: httpPostSignIn,
    onSuccess: (data) => {
      setAccessToken(get(data, "data.token"));
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { username: "", password: "" },
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    mutateAsync(values);
  };

  return (
    <StyledSignUpPage>
      <Card>
        <Row gutter={[0, 24]}>
          <Col span={24}>
            <Flex align="center" justify="center">
              <Title className="logo-box">LOGO</Title>
            </Flex>
          </Col>
          <Col span={24}>
            <Flex align="center" justify="center" vertical>
              <Title level={2}>{t("Ro'yxatdan o'tish")}</Title>
              <Text>
                {t(
                  "Iltimos, ro'yxatdan o'tish uchun hisob ma'lumotlaringizni kiriting."
                )}
              </Text>
            </Flex>
          </Col>
          <Col span={24}>
            <Form
              layout="vertical"
              className="login-form"
              name="login-form"
              size="large"
              onFinish={handleSubmit(onSubmit)}
            >
              <Flex justify="center" vertical gap={"15px"}>
                <Form.Item
                  label={t("Korxona nomi")}
                  {...getValidationStatus(errors, "username")}
                  required={true}
                >
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        placeholder={t("Username ni kiriting")}
                        prefix={<UserOutlined />}
                      />
                    )}
                  />
                </Form.Item>
                <Form.Item
                  label={t("Familiya")}
                  {...getValidationStatus(errors, "username")}
                  required={true}
                >
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        placeholder={t("Username ni kiriting")}
                        prefix={<UserOutlined />}
                      />
                    )}
                  />
                </Form.Item>
                <Form.Item
                  label={t("Username")}
                  {...getValidationStatus(errors, "username")}
                  required={true}
                >
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        placeholder={t("Username ni kiriting")}
                        prefix={<UserOutlined />}
                      />
                    )}
                  />
                </Form.Item>

                <Form.Item
                  label={t("Parol")}
                  {...getValidationStatus(errors, "password")}
                  required={true}
                >
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <CustomPasswordInput
                        {...field}
                        placeholder={t("Parolni kiriting")}
                      />
                    )}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                    loading={isPending}
                    disabled={isPending}
                  >
                    {t("Ro'yxatdan o'tish")}
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Flex align="center" justify="center">
                    <Text>
                      <span style={{ marginRight: "5px" }}>
                        {t("Akkauntingiz bo'lsa")}:
                      </span>
                      <NavLink to={"/auth/sign-in"}>{t("Kirish")}</NavLink>
                    </Text>
                  </Flex>
                </Form.Item>
              </Flex>
            </Form>
          </Col>
        </Row>
      </Card>
    </StyledSignUpPage>
  );
};

export default SignUpPage;
