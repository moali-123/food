import React, { useState } from "react";
import type { FormProps } from "antd";
import { Form, Input, Modal } from "antd";
import axios, { AxiosError } from 'axios';
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { FormBtn } from '@components/index';
import { CATEGORIES_URLS, BASE_HEADERS } from "src/constants/END_POINTS";
import "./modals.scss";

interface CatugContentSectionProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  getCategoriesList: () => void;
  
}

const AddCategory: React.FC<CatugContentSectionProps> = ({
  isModalOpen,
  handleCancel,
  getCategoriesList,
}) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

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
      handleCancel();
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
        open={isModalOpen} 
        onCancel={handleCancel}
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
          <FormBtn btnText={t("save")} loading={loading} form={form} showCancel={false} />
        </Form.Item>
      </Form>
        </div>
      </Modal>
    </>
  );
};

export default AddCategory;
