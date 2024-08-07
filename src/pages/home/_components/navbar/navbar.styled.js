import styled from "styled-components";

export const NavbarStyled = styled.div`
  .desctop-navbar {
    .content {
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .logo-box {
        display: flex;
        align-items: center;
        color: ${(props) => props.theme.colors.primaryColor};
        font-weight: bold;
      }
      ul {
        display: flex;
        align-items: center;
        list-style: none;
        margin: 0;
        padding: 0;
        li {
          margin: 0 25px;
          a {
            color: var(--Text-Gray-900, #18191f);
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 24px; /* 150% */
            cursor: pointer;
          }
          .active {
            color: "red";
          }
        }
      }
      .right-box {
        button {
          border-radius: 5px;
          padding: 10px;
        }
      }
    }
  }
`;
