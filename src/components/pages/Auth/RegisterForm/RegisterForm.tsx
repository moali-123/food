import React, { useState } from "react";
import type { FormProps } from "antd";
import { Form, Input, Row, Col, InputNumber, Select } from "antd";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from 'axios';
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { BiMobileAlt, BiLockAlt } from "react-icons/bi";
import { UploadFileInput } from "@components/index";
import { USERS_URLS } from "src/constants/END_POINTS";
import FormBtn from "@components/shared/FormBtn/FormBtn";
import './RegisterForm.scss';

const RegisterForm = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [uploadedFile, SetUploadedFile] = useState('');
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
    confirmPassword?: string;
    phoneNumber?: number;
    userName?: string;
    country?: string;
    profileImage?: object;
  }

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  
  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append('userName', data.userName)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('confirmPassword', data.confirmPassword)
    formData.append('phoneNumber', data.phoneNumber)
    formData.append('country', data.country)
    formData.append('profileImage', uploadedFile)

    return formData;
  }

  const OnSubmit: FormProps<FieldType>["onFinish"] = async (data) => {
    const recipeData = appendToFormData(data);
    //console.log("Success:", data);
    try {
      handleOk();
      const response = await axios.post(USERS_URLS.register, recipeData);
      toast.success(response?.data?.message || 'registered successfuly');
      navigate("/verify-account");
      console.log(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  const [form] = Form.useForm();

  return (
    <div id='register_form'>
      <Form
        name="validateOnly"
        form={form}
        initialValues={{ remember: true }}
        onFinish={OnSubmit}
        autoComplete="off"
      >
        <Row
        gutter={{
            xs: 25,
            sm: 25,
            md: 25,
            lg: 25,
        }}
        >
          <Col className="gutter-row" sm={24} md={12} xl={12}>
            <Form.Item<FieldType>
              //label="Username"
              className="mb-[25px]"
              name="userName"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: t('name_required'),
                },
              ]}
            >
              <Input placeholder={t('user_name')} prefix={<BiMobileAlt />} />
            </Form.Item> 

            <Form.Item<FieldType>
              //label="Password"
              className="mb-[25px]"
              name="country"
              hasFeedback
              rules={[{ required: true, message: t('country_required') }]}
            >
              <Select
                showSearch
                allowClear
                placeholder= {t('country')}
                optionFilterProp="label"
                onChange={onChange}
                onSearch={onSearch}
                options={[
                  {
                    value: 'one',
                    label: 'one',
                  },
                  {
                    value: 'two',
                    label: 'two',
                  }
                ]}
              />
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

          </Col>

          <Col className="gutter-row" sm={24} md={12} xl={12}>
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
              //label="Username"
              className="mb-[25px]"
              name="phoneNumber"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: t('phone_required'),
                },
              ]}
            >
              <InputNumber type="number" prefix={<BiMobileAlt />} placeholder={t('phone_number')} />
            </Form.Item>

            <Form.Item<FieldType>
              //label="Password"
              className="mb-[25px]"
              name="confirmPassword"
              hasFeedback
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: t('confirm_password_required'),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error( t('paswword_match_required') ));
                  },
                }),
              ]}
            >
              <Input.Password placeholder={t('confirm_password')} prefix={<BiLockAlt />} />
            </Form.Item>

          </Col>
        </Row>

        <UploadFileInput acceptedType="image/*" uploadedFile={SetUploadedFile} InputName="profileImage" />

        <Form.Item className="mb-0">
          <FormBtn btnText={t("register")} loading={loading} form={form} showCancel={false} />
        </Form.Item>
      </Form>
    </div>
  )
}

export default RegisterForm