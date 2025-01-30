import React, { useEffect, useState, ReactNode } from 'react';
import { useTranslation } from "react-i18next";
import type { FormProps } from "antd";
import { Space, Table, Form, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ConfirmDelete, NoData, SearchFilter, AddCategory, UpdateCategory, FormBtn } from '@components/index';
import axios, { AxiosError } from 'axios';
import { toast } from "react-toastify";
import IMAGES from '@assets/images/images';
import { CATEGORIES_URLS, BASE_HEADERS } from 'src/constants/END_POINTS';

interface DataType {
  key: string;
  name: string;
  id: number;
  creationDate: string;
  action: ReactNode;
}

const CategoryContentSection: React.FC = () => {
  const { t } = useTranslation();
  const [categoriesList, setCategoriesList] = useState<DataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [catId, setCatId] = useState(0);
  const [totalItems, setTotalItems] = useState(0)
  const [pageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [nameValue, setNameValue] = useState("");
  const [catugName, setCatugName] = useState();
  const [form] = Form.useForm();

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('creation_date'),
      dataIndex: 'creationDate',
      key: 'creationDate',
    },
    {
      title: t('action'),
      key: 'action',
      dataIndex: 'action',
    },
  ];
  
  const showDeleteModal = (id: number) => {
    setCatId(id);
    setIsModalOpen(true);
  };

  const showUpdateModal = (categoryItem) => {
    form.resetFields();  // Reset the form fields
    form.setFieldsValue({ name: categoryItem?.name });  // Set the initial value for the form field
    setCatId(categoryItem?.id);
    setCatugName(categoryItem?.name);  // Update the state if needed for other uses
    setIsUpdateModalOpen(true);  // Show the modal
  };

  const showAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
      setIsAddModalOpen(false);
      setIsUpdateModalOpen(false);
    }, 2000);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setIsAddModalOpen(false);
    setIsUpdateModalOpen(false);
    //setResetForm(true); 
  };

  const deleteCategory = async () => {
    try{
      const response = await axios.delete(CATEGORIES_URLS.delete(catId), BASE_HEADERS);
      toast.success(response?.data?.message || 'category deleted successfuly');
      getCategoriesList();
      handleOk();
      console.log(response);
    }catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    }
  }

  interface FieldType {
    name?: string;
  }
  const updateCategory: FormProps<FieldType>["onFinish"] = async (data) => {
    try{
      handleOk();
      const response = await axios.put(CATEGORIES_URLS.update(catId), data, BASE_HEADERS);
      toast.success(response?.data?.message || 'category updated successfuly');
      getCategoriesList();
      console.log(response);
    }catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  const getCategoriesList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(CATEGORIES_URLS.getList(pageSize, pageNumber, nameValue), BASE_HEADERS);
      response.data?.totalNumberOfRecords && setTotalItems(response?.data?.totalNumberOfRecords);
      setCategoriesList(response.data?.data || []);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategoriesList();
  }, [pageNumber, nameValue]); 

  return (
    <>
    <div className="title_bx">
      <div className="text">
        <h3>{t('categories_table_details')}</h3>
        <p>{t('user_table_subtitle')}</p>
      </div>

      <button className="add_btn" onClick={()=>showAddModal()}>{t('add_new_category')}</button>
    </div>
    <div className='table_bx'>
      <SearchFilter setNameValue={setNameValue} />

      {loading ? (
        <div className="loader w-[100%] flex justify-center items-center p-10">
        <img className="w-[100px]" src={IMAGES.circle_preloader} alt="pic" />
      </div>
      ) : (
        <>
        {categoriesList.length > 0 ? (
          <>
          <Table
            className='table_bx'
            //scroll={{ x: `100%` }}
            columns={columns}
            pagination={{ pageSize, total: totalItems, onChange(page) {
              console.log(page)
              setPageNumber(page)
            }, }}
            dataSource={
              categoriesList.map((category, index) => ({
                key: index.toString(),
                id: category.id,
                name: category.name,
                creationDate: category.creationDate,
                action: (
                  <Space size="middle">
                    <span className='action_icon' onClick={()=>showUpdateModal(category)}>
                      <img src={IMAGES.editIcon} alt='pic' /> {t('edit')}
                    </span>
                    <span className='action_icon' onClick={()=>showDeleteModal(category.id)}>
                      <img src={IMAGES.deleteIcon} alt='pic' /> {t('delete')}
                    </span>
                  </Space>
                ),
              }))
            }
          />
          </>) : (<NoData />)
        }
        </>
      )}
      
      <ConfirmDelete 
        isModalOpen={isModalOpen} 
        handleOk={deleteCategory} 
        handleCancel={handleCancel}
        loading={loading}
        deleteItem="category"
      />

      <AddCategory 
        isModalOpen={isAddModalOpen} 
        handleCancel={handleCancel}
        getCategoriesList={getCategoriesList}
      />

      <UpdateCategory 
        isModalOpen={isUpdateModalOpen} 
        //handleOk={updateCategory} 
        handleCancel={handleCancel}
        modalContent={
          <>
          <div>
            <Form
              name="validateOnly"
              form={form}
              initialValues={{ remember: true }}
              onFinish={updateCategory}
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
              <Input defaultValue={catugName} className="h-[46px]" />
            </Form.Item>

            <Form.Item className="mb-0">
              <FormBtn btnText={t("save")} loading={loading} form={form} showCancel={false} />
            </Form.Item>
          </Form>
          </div>
          </>
        }
      />
    </div>
    </>
  );
};

export default CategoryContentSection;
