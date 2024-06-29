import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import styled from "styled-components";

export const StyledCreateButton = styled(Button)``;

const CreateButton = ({ children, ...rest }) => {
  return (
    <StyledCreateButton type="primary" icon={<PlusOutlined />} {...rest}>
      {children}
    </StyledCreateButton>
  );
};

export default CreateButton;
