import { httpPostSignIn } from "@/services/api/auth.requests";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { LockFilled, UserOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, Col, Flex, Form, Input, Row, Typography } from "antd";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { StyledSignInPage } from "./SignIn.styles";

const { Title, Text, Paragraph, Link } = Typography;

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
      setAccessToken(data);
      setMe(data);
      navigate("/");
    },
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { username: "+998935221776", password: "Admin" },
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
              <Title>LOGO</Title>
            </Flex>
          </Col>
          <Col span={24}>
            <Col span={24}>
              <Flex align="center" justify="center" vertical>
                <Title level={2}>{t("Kirish", { ns: "auth" })}</Title>
                <Text>
                  {t(
                    "Iltimos, tizimga kirish uchun hisob ma'lumotlarini kiriting.",
                    {
                      ns: "auth",
                    }
                  )}
                </Text>
              </Flex>
            </Col>
          </Col>
          <Col span={24}>
            <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
              <Flex justify="center" vertical gap={"15px"}>
                <Form.Item
                  label="Username"
                  validateStatus={errors.username ? "error" : ""}
                  help={errors.username?.message}
                  required={true}
                >
                  <Input
                    {...register("username")}
                    placeholder="Enter your username"
                    prefix={<UserOutlined />}
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  validateStatus={errors.password ? "error" : ""}
                  help={errors.password?.message}
                  required={true}
                >
                  <Input.Password
                    {...register("password")}
                    placeholder="Enter your password"
                    prefix={<LockFilled />}
                    required={true}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
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
