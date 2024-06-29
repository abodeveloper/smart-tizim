import { useState } from "react";
import * as S from "./Layout.styles";
import Content from "./_components/Content";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";

const DashboardLayout = () => {
  
  const [openSidebar, setOpenSidebar] = useState(true);

  const toggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  return (
    <S.Layout openSidebar={openSidebar}>
      <Sidebar openSidebar={openSidebar} toggleSidebar={toggleSidebar} />
      <div className="content-box">
        <Header openSidebar={openSidebar} toggleSidebar={toggleSidebar} />
        <Content />
      </div>
    </S.Layout>
  );
};

export default DashboardLayout;
