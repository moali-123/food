import React from "react";
import type { FormInstance, FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from 'axios';
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { BiMobileAlt } from "react-icons/bi";
import { USERS_URLS } from "src/constants/END_POINTS";
import "./ForgetPasswordForm.scss";

interface SubmitButtonProps {
  form: FormInstance;
}

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
    >
      {children}
    </Button>
  );
};

const ForgetPasswordForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  type FieldType = {
    email?: string;
  };

  const OnSubmit: FormProps<FieldType>["onFinish"] = async (data) => {
    //console.log("Success:", data);
    try {
      const response = await axios.post(USERS_URLS.resetRequest,data);
      navigate("/reset-pass");
      toast.success(response?.data?.message || "plseae check your email");
      console.log("Success:", response);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message, {
          position: 'top-center',
        });
      } 
    }
  };

  const [form] = Form.useForm();

  return (
    <div id="login_form">
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
          name="email"
          hasFeedback
          rules={[
            {
              type: "email",
              message: "The input is not a valid email address!",
            },
            {
              required: true,
              message: "Please input your email address!",
            },
          ]}
        >
          <Input placeholder="Enter your E-mail" prefix={<BiMobileAlt />} />
        </Form.Item>

        <Form.Item className="mb-0">
          <SubmitButton form={form}>{t("submit")}</SubmitButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgetPasswordForm;
