import React, { useState } from "react";
import type { FormInstance, FormProps } from "antd";
import { Button, Form, Input, Modal } from "antd";
import axios, { AxiosError } from 'axios';
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { CATEGORIES_URLS, BASE_HEADERS } from "src/constants/END_POINTS";

interface SubmitButtonProps {
    form: FormInstance;
}

interface CatugContentSectionProps {
  isModalVisible: boolean;
  handleCancele: () => void;
  getCategoriesList: () => void;
  
}

const AddCategoryModal: React.FC<CatugContentSectionProps> = ({
  isModalVisible,
  handleCancele,
  getCategoriesList,
}) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
    form,
    children,
}) => {
    const [submittable, setSubmittable] = React.useState<boolean>(false);  
    // Watch all values
    const values = Form.useWatch([], form);
  
    React.useEffect(() => {
      form
        .validateFields({ validateOnly: true })
        .then(() => setSubmittable(true))
        .catch(() => setSubmittable(false));
    }, [form, values]);
  
    return (
      <Button
        className="submit_btn"
        type="primary"
        htmlType="submit"
        disabled={!submittable}
        loading={loading}
      >
        {children}
      </Button>
    );
};

  interface FieldType {
    name?: string;
  }
  const OnSubmit: FormProps<FieldType>["onFinish"] = async (data) => {
    try {
      handleOk();
      const response = await axios.post(CATEGORIES_URLS.add,data, BASE_HEADERS);
      toast.success(response?.data?.message || 'category added successfuly');
      console.log("Success:", response);
      getCategoriesList();
      form.resetFields();
    } catch (error) {
      if (error instanceof AxiosError) {
        form.resetFields();
        toast.error(error.response?.data?.message);
      }
    }
  };
  const [form] = Form.useForm();

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleCancele();
    }, 2000);
  };

  // const addCategory = () => {
  //   alert('aaaaaaaaaaaa');
  //   //handleOk();
  // }

  return (
    <>
      <Modal
        title="Add Category"
        open={isModalVisible}
        onCancel={handleCancele}
        modalRender={(modal) => <div id="add_category_modal">{modal}</div>}
        footer={[]}
      >
        <div>
        <Form
        name="validateOnly"
        form={form}
        initialValues={{ remember: true }}
        onFinish={OnSubmit}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          //label="Username"
          className="mb-[25px]"
          name="name"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please input category name",
            },
          ]}
        >
          <Input placeholder="Enter Category name" className="h-[46px]" />
        </Form.Item>

        <Form.Item className="mb-0">
          <SubmitButton form={form}>
            {t("save")}
          </SubmitButton>
        </Form.Item>

        {/* <Button
            className="confirm_btn"
            key="submit"
            type="primary"
            loading={loading}
            onClick={addCategory}
          >
            Save
          </Button> */}
      </Form>
        </div>
      </Modal>
    </>
  );
};

export default AddCategoryModal;
