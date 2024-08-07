import { useNavigate } from "react-router-dom";
import * as S from "./HomePage.styles";
import BusinessDirections from "./sections/business-directions/BusinessDirections";
import Header from "./sections/header/Header";

const HomePage = () => {
  return (
    <S.HomePage>
      <Header />
      <BusinessDirections />
    </S.HomePage>
  );
};

export default HomePage;
