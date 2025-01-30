import React, { useState } from 'react';
import type { FormInstance, FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { BiMobileAlt, BiLockAlt } from "react-icons/bi";
import OtpInput from "react-otp-input";
import { USERS_URLS } from 'src/constants/END_POINTS';
import "./ResetPasswordForm.scss";

interface SubmitButtonProps {
  form: FormInstance;
  otp: string;
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
  otp,
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
      disabled={!submittable || otp.length < 4}
    >
      {children}
    </Button>
  );
};

// OTP

const ResetPasswordForm: React.FC = () => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  type FieldType = {
    email?: string;
    password?: string;
    confirmPassword?: string;
    seed?: string;
    remember?: string;
  };

  const OnSubmit: FormProps<FieldType>["onFinish"] = async (data) => {
    console.log("Success:", data);
    try {
      const response = await axios.post(USERS_URLS.reset,data);
      navigate("/login");
      //localStorage.setItem("userToken", response.data.data.accessToken);
      //saveLoginData();
      toast.success(response?.data?.message ||  "password updated successfuly");
      console.log("Success:", response);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message, {
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
        //layout='vertical'
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

        <Form.Item<FieldType>
          label='OTP'
          name="seed"
          className="mb-[25px] otp_bx"
          rules={[
            {
              required: true,
              message: "Please input your email address!",
            },
          ]}
        >
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            //inputType='number'
            renderSeparator={<span className='separator_line'>-</span>}
            renderInput={(props) => <input {...props} />}
          />
        </Form.Item>

        <Form.Item<FieldType>
          className="mb-[25px]"
          name="password"
          hasFeedback
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder=" New Password" prefix={<BiLockAlt />} />
        </Form.Item>

        <Form.Item<FieldType>
          className="mb-[25px]"
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm New Password"
            prefix={<BiLockAlt />}
          />
        </Form.Item>

        {/* <div className="links_bx mb-[30px] flex justify-between items-center">
          <Link to="/register" className="text-[#3A3A3D] font-medium">
            Register Now?
          </Link>
          <Link to="/forget-pass" className="text-[#4AA35A] font-medium">
            Forgot Password?
          </Link>
        </div> */}

        <Form.Item className="mb-0">
          <SubmitButton otp={otp} form={form}>{t("reset_password")}</SubmitButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
