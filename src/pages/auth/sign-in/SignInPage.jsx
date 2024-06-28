import { httpPostSignIn } from "@/services/api/auth.requests";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { LockFilled, UserOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, Col, Flex, Form, Input, Row, Typography } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { StyledSignInPage } from "./SignInPage.styles";
import toast from "@/services/notification/notification";
import { get } from "lodash";

const { Title, Text } = Typography;

const SignInPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { setAccessToken } = useAuthStore();
  const { setMe } = useUserStore();

  const schema = object().shape({
    username: string().required("Username is required !!!"),
    password: string().required("Password is required !!!"),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: httpPostSignIn,
    mutationKey: ["login"],
    onSuccess: (data) => {
      setAccessToken(get(data, "data.token"));
      navigate("/");
    },
    onError: (error) => {
      toast
        .setMessage(get(error.response.data.error, "message", "Error"))
        .setDesc(get(error, "message"))
        .error();
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
    mutate(values);
  };

  return (
    <StyledSignInPage>
      <Card>
        <Row gutter={[0, 24]}>
          <Col span={24}>
            <Flex align="center" justify="center">
              <Title className="logo-box">LOGO</Title>
            </Flex>
          </Col>
          <Col span={24}>
            <Flex align="center" justify="center" vertical>
              <Title level={2}>{t("Kirish", { ns: "auth" })}</Title>
              <Text>
                {t(
                  "Iltimos, tizimga kirish uchun hisob ma'lumotlarini kiriting.",
                  { ns: "auth" }
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
                  label="Username"
                  validateStatus={errors.username ? "error" : ""}
                  help={errors.username?.message}
                  required={true}
                >
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter your username"
                        prefix={<UserOutlined />}
                      />
                    )}
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  validateStatus={errors.password ? "error" : ""}
                  help={errors.password?.message}
                  required={true}
                >
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input.Password
                        {...field}
                        placeholder="Enter your password"
                        prefix={<LockFilled />}
                      />
                    )}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    Tizimga kirish
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Flex align="center" justify="center">
                    <Text>
                      <span style={{ marginRight: "5px" }}>
                        Akkauntingiz bo'lmasa:
                      </span>
                      <NavLink to={"/auth/sign-up"}>Ro'yxatdan o'ting</NavLink>
                    </Text>
                  </Flex>
                </Form.Item>
              </Flex>
            </Form>
          </Col>
        </Row>
      </Card>
    </StyledSignInPage>
  );
};

export default SignInPage;
