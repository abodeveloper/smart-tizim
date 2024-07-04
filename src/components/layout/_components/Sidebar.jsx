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
  RiArrowLeftSLine,
  RiBarChartHorizontalFill,
  RiColorFilterFill,
  RiServiceFill,
  RiShakeHandsFill,
  RiStackFill,
  RiBubbleChartFill,
  RiShapesFill,
  RiAlignItemBottomFill,
  RiContactsBookFill,
  RiGroupFill,
} from "@remixicon/react";
import * as S from "../Layout.styles";
import Category from "./Category";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = ({ openSidebar, toggleSidebar }) => {
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
      label: "MAHSULOT",
      icon: <RiProductHuntFill />,
      children: [
        {
          title: "Mahsulot",
          path: "/products/products",
          icon: <RiStackFill />,
        },
        // {
        //   title: "Omborga mahsulot",
        //   path: "/products/products-add",
        //   icon: <RiCopperCoinFill />,
        // },
        {
          title: "Kategoriya",
          path: "/products/category",
          icon: <RiBarChartHorizontalFill />,
        },
        {
          title: "Format",
          path: "/products/formats",
          icon: <RiShapesFill />,
        },
      ],
    },
    {
      label: "MIJOZLAR",
      icon: <RiTeamFill />,
      children: [
        {
          title: "Mijozlar",
          path: "/clients/clients",
          icon: <RiGroupFill />,
        },
      ],
    },
    {
      label: "MOLIYA",
      icon: <RiBankFill />,
      children: [
        {
          title: "Kirim",
          path: "/payments/kirim",
          icon: <RiGroupFill />,
        },
        {
          title: "Chiqim",
          path: "/payments/chiqim",
          icon: <RiGroupFill />,
        },
        {
          title: "Tranzaktsiya",
          path: "/payments/tranzaktsiya",
          icon: <RiGroupFill />,
        },
      ],
    },
    {
      label: "XIZMATLAR",
      icon: <RiShakeHandsFill />,
      children: [
        {
          title: "Xizmatlar",
          path: "/services/services",
          icon: <RiServiceFill />,
        },
      ],
    },
    {
      label: "STATISTIKA",
      icon: <RiBarChartBoxFill />,
      children: [
        {
          title: "Savdo statistikasi",
          path: "/statistics/orders-statistic",
          icon: <RiAlignItemBottomFill />,
        },
        {
          title: "Ombor statistikasi",
          path: "/statistics/stores-statistic",
          icon: <RiColorFilterFill />,
        },
        {
          title: "Mijoz statistikasi",
          path: "/statistics/clients-statistic",
          icon: <RiContactsBookFill />,
        },
        {
          title: "Xizmatlar statistikasi",
          path: "/statistics/services-statistic",
          icon: <RiBubbleChartFill />,
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
      <div className="logo-box">
        <div className="logo">{openSidebar ? "LOGO" : "L"} </div>
        <div className="mobile-open-close-btn" onClick={() => toggleSidebar()}>
          <RiArrowLeftSLine />
        </div>
      </div>

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
