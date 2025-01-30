import React, { useState } from "react";
import type { FormInstance, FormProps } from "antd";
import { Button, Form, Input, Modal } from "antd";
import axios, { AxiosError } from 'axios';
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { CATEGORIES_URLS, BASE_HEADERS } from "src/constants/END_POINTS";
import "./modals.scss";

interface SubmitButtonProps {
    form: FormInstance;
}

interface CatugContentSectionProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  getCategoriesList: () => void;
  catugName: string;
  //resetForm: boolean;
  
}

const UpdateCategory: React.FC<CatugContentSectionProps> = ({
  isModalOpen,
  handleCancel,
  getCategoriesList,
  catugName,
  //resetForm,
}) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [catId] = useState(0);

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
        // if (resetForm) {
        //   form.resetFields();
        // }
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
    try{
      const response = await axios.put(CATEGORIES_URLS.update(catId), data, BASE_HEADERS);
      toast.success(response?.data?.message || 'category updated successfuly');
      getCategoriesList();
      handleOk();
      console.log(response);
    }catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    }
    // try {
      // try{
      //   const response = await axios.put(CATEGORIES_URLS.update(catId), data, BASE_HEADERS);
      //   toast.success(response?.data?.message || 'category updated successfuly');
      //   getCategoriesList();
      //   handleOk();
      //   console.log(response);
      // }catch (error) {
      //   if (error instanceof AxiosError) {
      //     toast.error(error.response?.data?.message);
      //   }
      // }
    //   handleOk();
    //   const response = await axios.put(CATEGORIES_URLS.update,data, BASE_HEADERS);
    //   toast.success(response?.data?.message || 'category updated successfuly');
    //   console.log("Success:", response);
    //   getCategoriesList();
    //   form.resetFields();
    // } catch (error) {
    //   if (error instanceof AxiosError) {
    //     form.resetFields();
    //     toast.error(error.response?.data?.message);
    //   }
    // }
  };
  const [form] = Form.useForm();

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleCancel();
    }, 2000);
  };

  return (
    <>
      <Modal
        title="Update Category"
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
          {/* <Input defaultValue={catugName} className="h-[46px]" /> */}
          <Input className="h-[46px]" />
        </Form.Item>

        <Form.Item className="mb-0">
          <SubmitButton form={form}>
            {t("save")}
          </SubmitButton>
        </Form.Item>
      </Form>
      
        </div>
      </Modal>
    </>
  );
};

export default UpdateCategory;
