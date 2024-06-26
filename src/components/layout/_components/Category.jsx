import { RiArrowDownSLine } from "@remixicon/react";
import { Tooltip } from "antd";
import { NavLink } from "react-router-dom";
import * as S from "../Layout.styles";

const Category = ({ item, openSidebar, open, handleToggle }) => {
  return (
    <S.Category className="category" open={open} openSidebar={openSidebar}>
      <Tooltip placement="top" title={openSidebar ? "" : item.label}>
        <div className="label" onClick={() => handleToggle(item)}>
          {openSidebar && (
            <div className="left">
              {item.icon}
              <div className="title">{item.label}</div>
            </div>
          )}

          <div className="arrow-icon">
            <RiArrowDownSLine />
          </div>
        </div>
      </Tooltip>

      <ul className="menu">
        {item?.children?.map((menu) => (
          <li className="menu-item">
            <Tooltip placement="right" title={openSidebar ? "" : menu.title}>
              <NavLink className="menu-item-link" to={menu.path}>
                <div className="icon">{menu.icon}</div>
                {openSidebar && <div className="title">{menu.title}</div>}
              </NavLink>
            </Tooltip>
          </li>
        ))}
      </ul>
    </S.Category>
  );
};

export default Category;
