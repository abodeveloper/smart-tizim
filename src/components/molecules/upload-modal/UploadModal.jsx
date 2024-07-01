import {
  handleSuccessNotification
} from "@/utils/helpers";
import { UploadOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Button, Col, Form, Modal, Row, Upload } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

const schema = yup.object().shape({
  file: yup.mixed().required("Fayl kerak"),
});

const UploadModal = ({
  isModalVisible,
  handleCancel,
  uploadRequest,
  refetch,
}) => {
  const { t } = useTranslation();

  const { control, handleSubmit, setValue, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: uploadRequest,
    onSuccess: () => {
      handleSuccessNotification();
      handleCancel();
      reset();
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    mutateAsync({ file: data.file[0].originFileObj });
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Modal
      title={t("Excel faylini yuklash")}
      open={isModalVisible}
      onCancel={handleCancel}
      okText={t("Yuborish")}
      cancelText={t("Bekor qilish")}
      onOk={handleSubmit(onSubmit)}
    >
      <Form onFinish={handleSubmit(onSubmit)} style={{ marginTop: "20px" }}>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Form.Item label={t("Fayl")}>
              <Controller
                name="file"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <Upload
                    name="file"
                    beforeUpload={() => false}
                    fileList={field.value}
                    onChange={(info) => setValue("file", normFile(info))}
                  >
                    <Button icon={<UploadOutlined />}>
                      {t("Faylni tanlang")}
                    </Button>
                  </Upload>
                )}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UploadModal;
