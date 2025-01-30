import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Form, Input, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { InputNumber } from 'antd';
import { UploadFileInput, FormBtn } from "@components/index";
import axios, { AxiosError } from 'axios';
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { BASE_HEADERS, CATEGORIES_URLS, GETALLTAGS, RECIPES_URLS } from "src/constants/END_POINTS";

const RecipeUpdateForm = () => {
  const { t } = useTranslation();
  const [tagsList, setTagsList] = useState([]);
  const [catugList, setCatugList] = useState([]);
  const [pageSize] = useState(5);
  const [pageNumber] = useState(1);
  const [uploadedFile, SetUploadedFile] = useState('');
  const [nameValue] = useState("");
  const [catugName, setCatugNme] = useState([]);
  const navigate = useNavigate();
  //const [loading] = useState(false);
  const initialState = {
    id: null,
    name: "",
    description: "",
    //category: []
  };
  const [recipieItem, setRecipieItem ] = useState(initialState);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  
  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  interface FieldType {
    name?: string;
    tagId?: number;
    price?: number;
    categoriesIds?: string;
    recipeImage?: object;
    description ?: string;
    remember?: boolean;
  }

  const [form] = Form.useForm();
  const { TextArea } = Input;

  const getAllTags = async () => {
    try {
      const response = await axios.get(GETALLTAGS, BASE_HEADERS);
      setTagsList(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    }
  }

  const getCategoriesList = async () => {
    try {
      const response = await axios.get(CATEGORIES_URLS.getList(pageSize,pageNumber,nameValue), BASE_HEADERS);
      setCatugList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const singlePro = async () => {
    try {
      const response = await axios.get(RECIPES_URLS.getOneItem(`${id}`), BASE_HEADERS);
      console.log(response?.data);
      console.log(response?.data?.category);
      setRecipieItem(response.data);
      setCatugNme(response?.data?.category?.name);
      form.setFieldsValue({ name: response?.data?.name });
      form.setFieldsValue({ tagId: response?.data?.tag?.id });
      form.setFieldsValue({ price: response?.data?.price });
      form.setFieldsValue({ categoriesIds: response?.data?.category?.[0]?.id });
      form.setFieldsValue({ description: response?.data?.description });
      //form.setFieldsValue({ recipeImage: SetUploadedFile });
    } catch (erroe) {
      console.log(erroe);
    } finally {
      //setLoading(false);
    }
  };

  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append('name', data.name)
    formData.append('tagId', data.tagId)
    formData.append('price', data.price)
    formData.append('categoriesIds', data.categoriesIds)
    formData.append('description', data.description)
    formData.append('recipeImage', uploadedFile)

    return formData;
  }

  const OnSubmit: FormProps<FieldType>["onFinish"] = async (data) => {
    const recipeData = appendToFormData(data);
    //console.log("Success:", data);
    try {
      handleOk();
      const response = await axios.put(RECIPES_URLS.update(`${id}`), recipeData, BASE_HEADERS);
      toast.success(response?.data?.message || 'recipe added successfuly');
      navigate("/dashboard/recipes");
      console.log(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    singlePro();
    getAllTags();
    getCategoriesList();
  }, []);
  

  return (
    <div className="recipe_form">
      update form
      <h1>{recipieItem.name}</h1>
      <p>{recipieItem.description}</p>
      <p>{catugName}</p>
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
              message: "Please enter Recipe name",
            },
          ]}
        >
          <Input placeholder="Recipe Name" />
        </Form.Item>

        <Form.Item<FieldType>
          //label="Password"
          className="mb-[25px]"
          name="tagId"
          hasFeedback
          rules={[{ required: true, message: "Please select Recipe tag" }]}
        >
          <Select
            showSearch
            allowClear
            placeholder="Tag"
            optionFilterProp="label"
            onChange={onChange}
            onSearch={onSearch}
            options={
              tagsList.map((tag)=>(
                {
                  key: tag.id,
                  value: tag.id,
                  label: tag.name,
                }
              ))
            }
          />
        </Form.Item>

        <Form.Item<FieldType>
          //label="Username"
          className="mb-[25px]"
          name="price"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please enter price",
            },
          ]}
        >
          <InputNumber type="number" suffix="EGP" defaultValue='3' onChange={onChange} />
        </Form.Item>

        <Form.Item<FieldType>
          //label="Password"
          className="mb-[25px]"
          name="categoriesIds"
          hasFeedback
          rules={[{ required: true, message: "Please select categ" }]}
        >
          <Select
            showSearch
            allowClear
            placeholder="Categ"
            optionFilterProp="label"
            onChange={onChange}
            onSearch={onSearch}
            options={
              catugList.map((catu)=>(
                {
                  key: catu.id,
                  value: catu.id,
                  label: catu.name,
                }
              ))
            }
          />
        </Form.Item>

        <Form.Item<FieldType>
          //label="Username"
          className="mb-[25px]"
          name="description"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please enter price",
            },
          ]}
        >
          <TextArea rows={4} placeholder="maxLength is 6" maxLength={200} />
        </Form.Item>

        <UploadFileInput acceptedType="image/*" uploadedFile={SetUploadedFile} InputName="recipeImage" />

        <Form.Item className="mb-0">
          <div className="form_action_btns">
            <FormBtn btnText={t("save")} loading={loading} form={form} showCancel={true} />
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

export default RecipeUpdateForm