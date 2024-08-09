import LogoIcon from "@/assets/images/logo-icon.png";
import Logo from "@/assets/images/logo.png";
import {
  RiAlignItemBottomFill,
  RiArrowLeftSLine,
  RiBankFill,
  RiBarChartBoxFill,
  RiBarChartHorizontalFill,
  RiBubbleChartFill,
  RiColorFilterFill,
  RiContactsBookFill,
  RiDashboard3Fill,
  RiDashboardFill,
  RiDatabase2Fill,
  RiDeleteBinFill,
  RiDraftFill,
  RiExchange2Fill,
  RiGroupFill,
  RiHandCoinFill,
  RiHomeOfficeFill,
  RiProductHuntFill,
  RiSettings6Fill,
  RiShakeHandsFill,
  RiShapesFill,
  RiShoppingBag3Fill,
  RiShoppingCart2Fill,
  RiShoppingCartFill,
  RiStackFill,
  RiTeamFill,
  RiTriangleFill,
  RiUserSettingsFill,
  RiUserStarFill,
  RiWaterFlashFill,
} from "@remixicon/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as S from "../Layout.styles";
import Category from "./Category";

const Sidebar = ({ openSidebar, toggleSidebar, setOpenSidebar }) => {
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
          path: "/trades/trades",
          icon: <RiShoppingCartFill />,
          isClick: true,
        },
        {
          title: "Mahsulotlar",
          path: "/products/products",
          icon: <RiProductHuntFill />,
          isClick: true,
        },
        {
          title: "Omborxonalar",
          path: "/storages/storages",
          icon: <RiHomeOfficeFill />,
          isClick: true,
        },
        {
          title: "Statistika",
          path: "/statistics/trade-statistics",
          icon: <RiBarChartBoxFill />,
          isClick: true,
        },
        {
          title: "Moliya",
          path: "/admin/payment",
          icon: <RiBankFill />,
        },
        {
          title: "Mijozlar",
          path: "/clients/clients",
          icon: <RiTeamFill />,
          isClick: true,
        },
        {
          title: "Xizmatlar",
          path: "/admin/services",
          icon: <RiShakeHandsFill />,
        },
      ],
    },
    {
      label: "SAVDO",
      icon: <RiShoppingCartFill />,
      children: [
        {
          title: "Savdolar",
          path: "/trades/trades",
          icon: <RiHandCoinFill />,
        },
        {
          title: "Savdo qo'shish",
          path: "/trades/trade-create",
          icon: <RiShoppingCart2Fill />,
        },
        {
          title: "Qoralama",
          path: "/trades/qoralama",
          icon: <RiDraftFill />,
        },
      ],
    },
    {
      label: "MAHSULOT",
      icon: <RiProductHuntFill />,
      children: [
        {
          title: "Mahsulotlar",
          path: "/products/products",
          icon: <RiStackFill />,
        },
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
        {
          title: "Maxsus mijozlar",
          path: "/clients/special-clients",
          icon: <RiUserStarFill />,
        },
      ],
    },
    {
      label: "OMBORXONA",
      icon: <RiHomeOfficeFill />,
      children: [
        {
          title: "Omborxonalar",
          path: "/storages/storages",
          icon: <RiDatabase2Fill />,
        },
        {
          title: "Omborga mahsulot",
          path: "/storages/storage-products",
          icon: <RiShoppingBag3Fill />,
        },
        {
          title: "Ta'minotchilar",
          path: "/storages/suppliers",
          icon: <RiUserStarFill />,
        },
        {
          title: "Yaroqsiz mahsulotlar",
          path: "/storages/storage-products-off",
          icon: <RiWaterFlashFill />,
        },
      ],
    },
    {
      label: "MOLIYA",
      icon: <RiBankFill />,
      children: [
        {
          title: "Chiqim",
          path: "/finance/finance-outcomes",
          icon: <RiExchange2Fill />,
        },
        {
          title: "Tranzaktsiya",
          path: "/finance/finance-transactions",
          icon: <RiTriangleFill />,
        },
      ],
    },
    {
      label: "STATISTIKA",
      icon: <RiBarChartBoxFill />,
      children: [
        {
          title: "Savdo statistikasi",
          path: "/statistics/trade-statistics",
          icon: <RiAlignItemBottomFill />,
        },
        {
          title: "Ombor statistikasi",
          path: "/statistics/storage-statistics",
          icon: <RiColorFilterFill />,
        },
        {
          title: "Mijoz statistikasi",
          path: "/statistics/client-statistics",
          icon: <RiContactsBookFill />,
        },
        {
          title: "Xizmatlar statistikasi",
          path: "/statistics/service-statistics",
          icon: <RiBubbleChartFill />,
        },
      ],
    },
    {
      label: "SOZLAMALAR",
      icon: <RiSettings6Fill />,
      children: [
        {
          title: "O'chirilgan",
          path: "/settings/delete-basket",
          icon: <RiDeleteBinFill />,
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
        (child) => child.path === location.pathname && !child.isClick
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
        <div className="logo">
          {openSidebar ? (
            <img src={Logo} style={{ width: "150px" }} />
          ) : (
            <img src={LogoIcon} style={{ width: "40px" }} />
          )}{" "}
        </div>
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
              setOpenSidebar={setOpenSidebar}
            />
          ))}
        </div>
      </div>
    </S.Sidebar>
  );
};

export default Sidebar;
