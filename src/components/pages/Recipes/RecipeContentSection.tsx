import React, { useEffect, useState, ReactNode, useContext } from "react";
import { Space, Table, Select } from "antd";
import { useTranslation } from "react-i18next";
import { HeartOutlined, HeartFilled } from "@ant-design/icons"; // Import HeartFilled for a filled heart icon
import { ConfirmDelete, NoData, SearchFilter } from "@components/index";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import IMAGES from "@assets/images/images";
import {
  RECIPES_URLS,
  BASE_HEADERS,
  BASE_IMG_URL,
  GETALLTAGS,
  CATEGORIES_URLS,
  USER_RECIPES_URLS,
} from "src/constants/END_POINTS";
import { AuthContext } from "src/context/AuthContext";
import { Link } from "react-router-dom";

interface TagType {
  name: string;
}

interface DataType {
  key: string;
  name: string;
  price: string;
  description: string;
  tag: TagType;
  imagePath: string;
  action: ReactNode;
  id: number;
}

const RecipeContentSection: React.FC = () => {
  const { t } = useTranslation();
  const [recipesList, setRecipesList] = useState<DataType[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set()); // Add state to manage favorites
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recipeId, setRecipeId] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [pageSize] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [nameValue, setNameValue] = useState("");
  const [tagIdValue, setTagIdValue] = useState("");
  const [catuValue, setCatuValue] = useState("");
  const [tagsList, setTagsList] = useState([]);
  const [catugList, setCatugList] = useState([]);
  const { loginData } = useContext(AuthContext);

  const showModal = (id: number) => {
    setRecipeId(id);
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

  const onTagChange = (value: string) => {
    setTagIdValue(value);
  };
  const onCatuChange = (value: string) => {
    setCatuValue(value);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const getAllTags = async () => {
    try {
      const response = await axios.get(GETALLTAGS, BASE_HEADERS);
      setTagsList(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  const getCategoriesList = async () => {
    try {
      const response = await axios.get(
        CATEGORIES_URLS.getList(pageSize, pageNumber, nameValue),
        BASE_HEADERS
      );
      setCatugList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async () => {
    try {
      const response = await axios.delete(
        RECIPES_URLS.delete(recipeId),
        BASE_HEADERS
      );
      toast.success(response?.data?.message || "Category deleted successfully");
      getRecipesList();
      handleOk();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Error deleting category");
      }
    }
  };

  const addToFav = async (id: number) => {
    try {
      const response = await axios.post(
        USER_RECIPES_URLS.addToFav,
        { recipeId: id },
        BASE_HEADERS
      );
      setFavorites(new Set(favorites.add(id))); // Update state after adding to favorites
      console.log(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.data?.message);
      }
    }
  };

  const removeFav = async (id: number) => {
    try {
      const response = await axios.delete(
        USER_RECIPES_URLS.removeFromFav(recipeId),
        BASE_HEADERS
      );
      toast.success(response?.data?.message || "Recipe removed successfully");
      favorites.delete(id); // Remove from favorites
      setFavorites(new Set(favorites)); // Update state after removing from favorites
      console.log(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.data?.message);
      }
    }
  };

  const getRecipesList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        RECIPES_URLS.getFilterList(
          pageSize,
          pageNumber,
          nameValue,
          tagIdValue,
          catuValue
        ),
        BASE_HEADERS
      );
      setTotalItems(response.data?.totalNumberOfRecords || 0);
      setRecipesList(response.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecipesList();
    getAllTags();
    getCategoriesList();
  }, [pageNumber, nameValue, tagIdValue, catuValue]);

  return (
    <div className="table_bx">
      <div className="flex gap-[15px]">
        <SearchFilter setNameValue={setNameValue} />

        <Select
          className="w-[200px] h-[46px]"
          showSearch
          allowClear
          placeholder={t('tag')}
          optionFilterProp="label"
          onChange={onTagChange}
          onSearch={onSearch}
          options={tagsList.map((tag) => ({
            key: tag.id,
            value: tag.id,
            label: tag.name,
          }))}
        />

        <Select
          className="w-[200px] h-[46px]"
          showSearch
          allowClear
          placeholder={t('category')}
          optionFilterProp="label"
          onChange={onCatuChange}
          onSearch={onSearch}
          options={catugList.map((catu) => ({
            key: catu.id,
            value: catu.id,
            label: catu.name,
          }))}
        />
      </div>

      {loading ? (
        <div className="loader w-[100%] flex justify-center items-center p-10">
          <img className="w-[100px]" src={IMAGES.circle_preloader} alt="pic" />
        </div>
      ) : (
        <>
          {recipesList.length > 0 ? (
            <Table
              className="table_bx"
              //scroll={{ x: `100%` }}
              columns={[
                {
                  title: t('name'),
                  dataIndex: "name",
                  key: "name",
                },
                {
                  title: t('image'),
                  dataIndex: "imagePath",
                  key: "imagePath",
                },
                {
                  title: t('price'),
                  dataIndex: "price",
                  key: "price",
                },
                {
                  title: t('description'),
                  key: "description",
                  dataIndex: "description",
                },
                {
                  title: t('tag'),
                  key: "tag",
                  dataIndex: "tag",
                  render: (tag: TagType) => tag.name,
                },
                {
                  title: t('action'),
                  key: "action",
                  dataIndex: "action",
                },
              ]}
              pagination={{
                pageSize,
                total: totalItems,
                onChange: (page) => {
                  setPageNumber(page);
                },
              }}
              dataSource={recipesList.map((recipe) => ({
                key: recipe.id.toString(),
                name: recipe.name,
                imagePath: recipe.imagePath ? (
                  <img
                    className="recipe_img"
                    src={`${BASE_IMG_URL}/${recipe.imagePath}`}
                    alt="pic"
                  />
                ) : (
                  <img
                    className="recipe_img"
                    src={IMAGES.deleteImg}
                    alt="pic"
                  />
                ),
                price: recipe.price,
                description: recipe.description,
                tag: recipe.tag,
                action:
                  loginData?.userGroup === "SuperAdmin" ? (
                    <Space size="middle">
                      <span className="action_icon">
                        <Link to={`/dashboard/recipe-update/${recipe.id}`}>
                          <img src={IMAGES.editIcon} alt="pic" /> {t('edit')}
                        </Link>
                      </span>
                      <span
                        className="action_icon"
                        onClick={() => showModal(recipe.id)}
                      >
                        <img src={IMAGES.deleteIcon} alt="pic" /> {t('delete')}
                      </span>
                    </Space>
                  ) : (
                    <Space size="middle">
                      {favorites.has(recipe.id) ? (
                        <span
                          className="toggle-fav"
                          onClick={() => removeFav(recipe.id)}
                        >
                          <HeartFilled style={{ color: "red" }} />
                        </span>
                      ) : (
                        <span
                          className="toggle-fav"
                          onClick={() => addToFav(recipe.id)}
                        >
                          <HeartOutlined />
                        </span>
                      )}
                    </Space>
                  ),
              }))}
            />
          ) : (
            <NoData />
          )}
        </>
      )}

      <ConfirmDelete
        isModalOpen={isModalOpen}
        handleOk={deleteCategory}
        handleCancel={handleCancel}
        loading={loading}
        deleteItem="category"
      />
    </div>
  );
};

export default RecipeContentSection;
