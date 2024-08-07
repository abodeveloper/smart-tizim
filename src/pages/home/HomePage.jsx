import * as S from "./HomePage.styles";
import Adventages from "./sections/adventages/Adventages";
import BusinessDirections from "./sections/business-directions/BusinessDirections";
import Header from "./sections/header/Header";
import Footer from "./sections/footer/Footer";

const HomePage = () => {
  return (
    <S.HomePage>
      <Header />
      <BusinessDirections />
      <Adventages />
      <Footer />
    </S.HomePage>
  );
};

export default HomePage;
