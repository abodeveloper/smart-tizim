import { Card, Result } from "antd";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

export const StyledErrorResult = styled(Result)``;

const ErrorResult = ({ error, ...rest }) => {
  const { t } = useTranslation();
  return (
    <Card>
      <StyledErrorResult
        status="error"
        title={get(error?.response?.data?.error, "message", t("Xatolik"))}
        subTitle={get(error, "message")}
        {...rest}
      />
    </Card>
  );
};

export default ErrorResult;
