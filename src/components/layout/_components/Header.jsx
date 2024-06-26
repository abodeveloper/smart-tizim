import React from "react";
import * as S from "../Layout.styles";
import useThemeStore from "@/store/useThemeStore";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { RiArrowLeftSLine, RiMoonClearFill, RiSunFill } from "@remixicon/react";
import { Button } from "antd";

const Header = ({ openSidebar, toggleSidebar }) => {
  const { setTheme, mode } = useThemeStore();
  const { clearAccessToken } = useAuthStore();
  // const { me } = useUserStore();

  const logout = () => {
    clearAccessToken();
    navigate("/login", { replace: true });
  };

  const toggleTheme = () => {
    setTheme(mode === "dark" ? "light" : "dark");
  };

  return (
    <S.Header openSidebar={openSidebar}>
      <div className="open-close-btn" onClick={() => toggleSidebar()}>
        <RiArrowLeftSLine />
      </div>
      <div className="switch-theme" onClick={() => toggleTheme()}>
        {mode === "dark" ? <RiSunFill /> : <RiMoonClearFill />}
      </div>
    </S.Header>
  );
};

export default Header;
