import { Flex, Typography } from "antd";
import styled from "styled-components";
import React from "react";

const Styled = styled(Flex)``;

const TitleAndIconText = ({ title, value, icon, ...rest }) => {
  return (
    <Styled gap="middle">
      <Flex gap="small">
        {icon && React.cloneElement(icon, { size: 20 })}
        <Typography.Text strong style={{ width: "100%" }} {...rest}>
          {title}:
        </Typography.Text>
      </Flex>
      <Typography.Text>{value}</Typography.Text>
    </Styled>
  );
};

export default TitleAndIconText;
