import { ClearOutlined } from "@ant-design/icons";
import { Button } from "antd";
import styled from "styled-components";

export const StyledClearFilterButton = styled(Button)`
`;

const ClearFilterButton = ({ children, ...rest }) => {
  return (
    <StyledClearFilterButton icon={<ClearOutlined />} {...rest}>
      {children}
    </StyledClearFilterButton>
  );
};

export default ClearFilterButton;
