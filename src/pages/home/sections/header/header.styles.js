import styled from "styled-components";

export const HeaderStyled = styled.div`
  background-color: #f5f7fa;
  .main {
    .left {
      height: calc(100vh - 100px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title {
        color: var(--Neutral-D_Grey, #4d4d4d);
        font-size: 64px;
        font-style: normal;
        font-weight: 600;
        line-height: 76px; /* 118.75% */
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
      img{
        max-width: 100%;
      }
    }
  }
`;
