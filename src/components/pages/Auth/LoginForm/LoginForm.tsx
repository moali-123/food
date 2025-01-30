import React, { useState } from "react";
import type { FormProps } from "antd";
import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from 'axios';
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { BiMobileAlt, BiLockAlt } from "react-icons/bi";
import { USERS_URLS } from "src/constants/END_POINTS";
import FormBtn from "@components/shared/FormBtn/FormBtn";
import "./LoginForm.scss";

interface LoginFormProps {
  saveLoginData: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ saveLoginData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  interface FieldType {
    email?: string;
    password?: string;
    remember?: boolean;
  }

  const OnSubmit: FormProps<FieldType>["onFinish"] = async (data) => {
    console.log("Success:", data);
    try {
      handleOk();
      const response = await axios.post(USERS_URLS.login,data);
      navigate("/dashboard");
      localStorage.setItem("userToken", response.data.token);
      saveLoginData();
      toast.success(response?.data?.message || t('welcome_toast'));
      console.log("Success:", response);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || t('some_thing_wrong'));
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
              message: t('email_valid'),
            },
            {
              required: true,
              message: t('email_required'),
            },
          ]}
        >
          <Input placeholder={t('enter_your_email')} prefix={<BiMobileAlt />} />
        </Form.Item>

        <Form.Item<FieldType>
          //label="Password"
          className="mb-[25px]"
          name="password"
          hasFeedback
          rules={[{ required: true, message: t('password_required') }]}
        >
          <Input.Password placeholder={t('password')} prefix={<BiLockAlt />} />
        </Form.Item>

        <div className="links_bx mb-[30px] flex justify-between items-center">
          <Link to="/register" className="text-[#3A3A3D] font-medium">
            {t('register_now')}
          </Link>
          <Link to="/forget-pass" className="text-[#4AA35A] font-medium">
            {t('forgot_password?')}
          </Link>
        </div>

        <Form.Item className="mb-0">
          <FormBtn btnText={t("login")} loading={loading} form={form} showCancel={false} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
