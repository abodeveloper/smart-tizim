import { useEffect, useState } from "react";
import * as S from "./Layout.styles";
import Content from "./_components/Content";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";

const DashboardLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(window.innerWidth > 567);

  const toggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 567) {
        setOpenSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <S.Layout openSidebar={openSidebar}>
      <Sidebar
        openSidebar={openSidebar}
        toggleSidebar={toggleSidebar}
        setOpenSidebar={setOpenSidebar}
      />
      <div className="content-box">
        <Header openSidebar={openSidebar} toggleSidebar={toggleSidebar} />
        <Content />
      </div>
    </S.Layout>
  );
};

export default DashboardLayout;
