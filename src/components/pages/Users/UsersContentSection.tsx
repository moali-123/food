import React, { useEffect, useState, ReactNode } from 'react';
import { useTranslation } from "react-i18next";
import { Space, Table, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ConfirmDelete, NoData, SearchFilter, EmailSearchFilter } from '@components/index';
import axios, { AxiosError } from 'axios';
import { toast } from "react-toastify";
import IMAGES from '@assets/images/images';
import { USERS_URLS, BASE_HEADERS, BASE_IMG_URL } from 'src/constants/END_POINTS';

interface DataType {
    key: string;
    id: number;
    userName: string;
    email: string;
    country: string;
    phoneNumber: number;
    imagePath: string;
    action: ReactNode;
  }
  
const UsersContentSection: React.FC = () => {
    const { t } = useTranslation();
    const [usersList, setUsersList] = useState<DataType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(0);
    const [totalItems, setTotalItems] = useState(0)
    const [pageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [nameValue, setNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [roleValue, setRoleValue] = useState("");

    const columns: ColumnsType<DataType> = [
      {
        title: t('user_name'),
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: t('email'),
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: t('country'),
        dataIndex: 'country',
        key: 'country',
      },
      {
        title: t('phone_number'),
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      },
      {
        title: t('image'),
        dataIndex: 'imagePath',
        key: 'imagePath', 
      },
      {
        title: t('action'),
        key: 'action',
        dataIndex: 'action',
      },
    ];

    const showModal = (id: number) => {
        setUserId(id);
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setIsModalOpen(false);
        }, 2000);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [selectedOption, setSelectedOption] = useState(null);

    const { Option } = Select;
    const handleShowChange = (value) => {
        setSelectedOption(value);
    };
    const handleRoleChange = (value) => {
        setRoleValue(value);
    };
    const handleClear = () => {
      setRoleValue('');
      // Add any additional logic here
    };
    
    const deleteUser = async () => {
        try{
          const response = await axios.delete(USERS_URLS.delete(userId), BASE_HEADERS);
          toast.success(response?.data?.message || 'user deleted successfuly');
          getUsersList();
          handleOk();
          console.log(response);
        }catch (error) {
          if (error instanceof AxiosError) {
            toast.error(error.response?.data?.message || "un expected error");
          }
        }
    }

    const getUsersList = async () => {
        try {
          setLoading(true);
          const response = await axios.get(USERS_URLS.getList(pageSize,pageNumber,nameValue,emailValue,roleValue), BASE_HEADERS);
          response.data?.totalNumberOfRecords && setTotalItems(response?.data?.totalNumberOfRecords)
          setUsersList(response.data?.data || []);
          console.log(response.data.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
    };
    
    useEffect(() => {
        getUsersList();
    }, [pageNumber, nameValue, emailValue, roleValue]);

  return (
    <div className='table_bx'>
        <div className="flex gap-[15px] mb-[15px]">
          <Select 
            placeholder={t('search_by')} 
            onChange={handleShowChange} 
            allowClear
            className='w-[200px] h-[46px] mb-[5px]'
          >
              <Option value="option1">{t('user_name')}</Option>
              <Option value="option2">{t('email')}</Option>
              <Option value="option3">{t('country')}</Option>
              <Option value="option4">{t('role')}</Option>
          </Select>

          {selectedOption === 'option1' && (
              <div id="div1" className='w-[250px]'>
                <SearchFilter setNameValue={setNameValue} />
              </div>
          )}
          {selectedOption === 'option2' && (
              <div id="div2" className='w-[250px]'>
                <EmailSearchFilter setEmailValue={setEmailValue} />
              </div>
          )}
          {selectedOption === 'option3' && (
              <div id="div2" className='w-[250px]'>
                aaaaaaaaaaa
              </div>
          )}
          {selectedOption === 'option4' && (
              <div id="div3">
                <Select 
                  placeholder={t('search_by')}
                  onChange={handleRoleChange} 
                  allowClear
                  onClear={handleClear}
                  value={roleValue}
                  className='w-[200px] h-[46px] mb-[5px]'
                >
                    <Option value="1">{t('admin')}</Option>
                    <Option value="2">{t('user')}</Option>
                </Select>
              </div>
          )}
        </div>
        {/* <div className="flex gap-[15px]">
          <SearchFilter setNameValue={setNameValue} />
          <EmailSearchFilter setEmailValue={setEmailValue} />
        </div> */}

        {loading ? (
          <div className="loader w-[100%] flex justify-center items-center p-10">
            <img className="w-[100px]" src={IMAGES.circle_preloader} alt="pic" />
          </div>
        ) : (
          <>
          {usersList.length > 0 ? (
            <Table
              columns={columns}
              className='table_bx'
              //scroll={{ x: `100%` }}
              pagination={{ pageSize,total: totalItems, onChange(page) {
                  console.log(page)
                  setPageNumber(page)
              }, showSizeChanger: false}}
              dataSource={
                usersList.map((user, index) => ({
                    key: index.toString(),
                    userName: user.userName,
                    email: user.email,
                    country: user.country,
                    phoneNumber: user.phoneNumber,
                    imagePath: user.imagePath ? 
                    (<img className='recipe_img' src={`${BASE_IMG_URL}/${user.imagePath}`} alt='pic' />) :
                    (<img className='recipe_img' src={IMAGES.deleteImg}  alt='pic'/>),
                    action: (
                        <Space size="middle">
                            <span className='action_icon'>
                            <img src={IMAGES.editIcon} alt='pic' /> {t('edit')}
                            </span>
                            <span className='action_icon' onClick={()=>showModal(user.id)}>
                            <img src={IMAGES.deleteIcon} alt='pic' /> {t('delete')}
                            </span>
                        </Space>
                    ),
                }))
              }
            />) : (<NoData />)
          }
          </>
        )}
      
      <ConfirmDelete 
        isModalOpen={isModalOpen} 
        handleOk={deleteUser} 
        handleCancel={handleCancel}
        loading={loading}
        deleteItem="category"
      />
    </div>
  )
}

export default UsersContentSection