import { Button } from "antd";
import styled from "styled-components";
import UploadModal from "../upload-modal/UploadModal";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

export const StyledUploadButton = styled(Button)``;

const UploadButton = ({ ...rest }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <StyledUploadButton
        icon={<UploadOutlined />}
        onClick={showModal}
        {...rest}
      >
        Yuklash
      </StyledUploadButton>
      <UploadModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </>
  );
};

export default UploadButton;
