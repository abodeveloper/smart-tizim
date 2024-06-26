import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import * as S from "./HomePage.styles";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <S.HomePage>
      <Button type="primary" onClick={() => navigate("/auth/sign-in")}>
        Sign In
      </Button>
      <Button type="default" onClick={() => navigate("/auth/sign-up")}>
        Sign Up
      </Button>
    </S.HomePage>
  );
};

export default HomePage;
