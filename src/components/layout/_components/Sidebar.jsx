import {
  RiBankFill,
  RiBarChartBoxFill,
  RiCopperCoinFill,
  RiDashboard3Fill,
  RiDashboardFill,
  RiProductHuntFill,
  RiShoppingBag3Fill,
  RiShoppingCartFill,
  RiTeamFill,
  RiUserSettingsFill,
  RiSettings6Fill,
} from "@remixicon/react";
import * as S from "../Layout.styles";
import Category from "./Category";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = ({ openSidebar }) => {
  const location = useLocation();

  const [MENUS, setMenus] = useState([
    {
      label: "ASOSIY",
      icon: <RiDashboardFill />,
      children: [
        {
          title: "Bosh sahifa",
          path: "/admin/dashboard",
          icon: <RiDashboard3Fill />,
        },
        {
          title: "Savdo",
          path: "/admin/orders",
          icon: <RiShoppingCartFill />,
        },
        {
          title: "Mahsulotlar",
          path: "/admin/products",
          icon: <RiProductHuntFill />,
        },
        {
          title: "Omborxona",
          path: "/admin/warehouse",
          icon: <RiShoppingBag3Fill />,
        },
        {
          title: "Statistika",
          path: "/admin/statistics",
          icon: <RiBarChartBoxFill />,
        },
        {
          title: "Moliya",
          path: "/admin/payment",
          icon: <RiBankFill />,
        },
        {
          title: "Mijozlar",
          path: "/admin/clients",
          icon: <RiTeamFill />,
        },
      ],
    },
    {
      label: "BOSHQA",
      icon: <RiSettings6Fill />,
      children: [
        {
          title: "Qarzdorlar",
          path: "/admin/qarzdor",
          icon: <RiCopperCoinFill />,
        },
        {
          title: "Sozlamalar",
          path: "/admin/settings",
          icon: <RiUserSettingsFill />,
        },
      ],
    },
    {
      label: "MAHSULOT",
      icon: <RiSettings6Fill />,
      children: [
        {
          title: "Mahsulot",
          path: "/products/products",
          icon: <RiCopperCoinFill />,
        },
        {
          title: "Omborga mahsulot",
          path: "/products/products",
          icon: <RiCopperCoinFill />,
        },
        {
          title: "Kategoriya",
          path: "/products/products",
          icon: <RiCopperCoinFill />,
        },
        {
          title: "Format",
          path: "/products/products",
          icon: <RiCopperCoinFill />,
        },
        {
          title: "O'chirilgan mahsulotlar",
          path: "/products/products",
          icon: <RiCopperCoinFill />,
        },
      ],
    },
  ]);

  useEffect(() => {
    const updatedMenu = MENUS.map((menu) => {
      const isOpen = menu.children.some(
        (child) => child.path === location.pathname
      );
      return { ...menu, isOpen };
    });

    setMenus(updatedMenu);
  }, [location.pathname]);

  const handleCategoryClick = (clickedItem) => {
    const updatedMenu = MENUS.map((menu) =>
      menu.label === clickedItem.label
        ? { ...menu, isOpen: !menu.isOpen }
        : { ...menu, isOpen: false }
    );
    setMenus(updatedMenu);
  };

  return (
    <S.Sidebar openSidebar={openSidebar}>
      <div className="logo-box">{openSidebar ? "LOGO" : "L"}</div>
      <div className="menu-box">
        <div className="categories">
          {MENUS.map((item, index) => (
            <Category
              item={item}
              openSidebar={openSidebar}
              key={index}
              open={item.isOpen}
              handleToggle={handleCategoryClick}
            />
          ))}
        </div>
      </div>
    </S.Sidebar>
  );
};

export default Sidebar;
