import useAuthStore from "@/store/useAuthStore";
import useThemeStore from "@/store/useThemeStore";
import { UserOutlined } from "@ant-design/icons";
import {
  RiArrowLeftSLine,
  RiMoonClearFill,
  RiSunFill,
  RiShieldUserFill,
  RiSettings5Fill,
  RiLogoutBoxFill,
} from "@remixicon/react";
import { Avatar, Button, Dropdown, Flex } from "antd";
import * as S from "../Layout.styles";
import { httpGetMe } from "@/services/api/requests/auth.requests";
import { useQuery } from "@tanstack/react-query";

const Header = ({ openSidebar, toggleSidebar }) => {
  const { data, isLoading, ...rest } = useQuery({
    queryKey: ["me"],
    queryFn: httpGetMe,
    onSuccess: (data) => {
      console.log(data);
      setMe(data);
    },
  });

  const { setTheme, mode } = useThemeStore();
  const { clearAccessToken } = useAuthStore();
  // const { me } = useUserStore();

  const logout = () => {
    clearAccessToken();
    // navigate("/login", { replace: true });
  };

  const toggleTheme = () => {
    setTheme(mode === "dark" ? "light" : "dark");
  };

  const PROFILE_ITEMS = [
    {
      icon: <RiShieldUserFill />,
      label: "Abbos Ibragimov",
      key: "0",
    },
    {
      label: <div>Settings</div>,
      key: "1",
      icon: <RiSettings5Fill />,
    },
    {
      type: "divider",
    },
    {
      label: <>Logout</>,
      key: "3",
      icon: <RiLogoutBoxFill />,
      onClick: logout,
    },
  ];

  return (
    <S.Header openSidebar={openSidebar}>
      <div className="open-close-btn" onClick={() => toggleSidebar()}>
        <RiArrowLeftSLine />
      </div>
      <Flex gap="middle">
        <div className="switch-theme" onClick={() => toggleTheme()}>
          {mode === "dark" ? <RiSunFill /> : <RiMoonClearFill />}
        </div>
        <Dropdown menu={{ items: PROFILE_ITEMS }} trigger={["click"]}>
          <Avatar
            style={{ cursor: "pointer" }}
            size={35}
            shape="square"
            icon={<UserOutlined />}
          />
        </Dropdown>
      </Flex>
    </S.Header>
  );
};

export default Header;
