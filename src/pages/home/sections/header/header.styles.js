import styled from "styled-components";
import { Element } from "react-scroll";

export const HeaderStyled = styled(Element)`
  background-color: #f5f7fa;
  .main {
    margin-top: 100px;
    .left {
      height: calc(100vh - 100px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title {
        color: var(--Neutral-D_Grey, #4d4d4d);
        font-size: 46px;
        font-style: normal;
        font-weight: 600;
        line-height: 67px; /* 118.75% */
        span {
          color: ${(props) => props.theme.colors.primaryColor};
        }
      }
      .description {
        color: var(--Neutral-Grey, #717171);
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 150% */
        margin-top: 16px;
      }
      button {
        margin-top: 20px;
        border-radius: 10px;
      }
    }
    .right {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        max-width: 100%;
      }
    }
  }

  @media (max-width: 576px) {
    .main {
      margin-top: 85px;
      .left {
        height: calc(100vh - 85px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title {
          font-size: 32px;
          font-weight: 600;
          line-height: 47px; /* 118.75% */
        }
        .description {
          font-size: 14px;
          font-weight: 400;
          line-height: 24px; /* 150% */
          margin-top: 10px;
        }
        button {
          margin-top: 15px;
          border-radius: 10px;
        }
      }
      .right {
        height: inherit;
        /* display: flex;
        justify-content: center;
        align-items: center; */
      }
    }
  }
`;
