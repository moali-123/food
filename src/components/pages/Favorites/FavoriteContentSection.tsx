import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Row, Col, Pagination } from "antd"; 
import { DeleteOutlined } from '@ant-design/icons';
import {
  USER_RECIPES_URLS,
  BASE_HEADERS,
  BASE_IMG_URL,
} from "src/constants/END_POINTS";
import { NoData } from "@components/index";
import IMAGES from "@assets/images/images";

const FavoriteContentSection = () => {
  const [favList, setFavList] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1); // State to manage current page
  const itemsPerPage = 4; // Number of items per page

  const getFavList = async () => {
    try {
      const response = await axios.get(USER_RECIPES_URLS.getList, BASE_HEADERS);
      setFavList(response.data.data);
      console.log(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const removeFav = async (id) => {
    try {
      const response = await axios.delete(
        USER_RECIPES_URLS.removeFromFav(id),
        BASE_HEADERS
      );
      toast.success(response?.data?.message || "Recipe Removed successfully");
      getFavList();
      console.log(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.data?.message);
      }
    }
  };

  useEffect(() => {
    getFavList();
  }, []);

  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = favList.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {loading ? (
        <div className="loader w-[100%] flex justify-center items-center p-10">
          <img className="w-[100px]" src={IMAGES.circle_preloader} alt="pic" />
        </div>
      ) : (
        <>
          {favList.length > 0 ? (
            <Row
              gutter={{
                xs: 25,
                sm: 25,
                md: 25,
                lg: 25,
              }}
            >
              {loading ? (
                <div className="loader w-[100%] flex justify-center items-center p-10">
                  <img
                    className="w-[100px]"
                    src={IMAGES.circle_preloader}
                    alt="pic"
                  />
                </div>
              ) : (
                <>
                  {currentItems.map((fav) => (
                    <Col
                      className="gutter-row"
                      key={fav.id}
                      sm={24}
                      md={12}
                      xl={6}
                    >
                      <div className="fav-bx">
                        <div className="">
                          <div className="overlay">
                            <p>{fav.recipe.description}</p>
                          </div>
                        </div>
                        {fav.recipe.imagePath ? (
                          <img
                            className="recipe_img"
                            src={`${BASE_IMG_URL}/${fav.recipe.imagePath}`}
                            alt="pic"
                          />
                        ) : (
                          <img
                            className="recipe_img"
                            src={IMAGES.deleteImg}
                            alt="pic"
                          />
                        )}
                        <h3>{fav.recipe.name}</h3>
                        {/* <p>{fav.recipe.description}</p> */}
                        <button className="remove_fav" onClick={() => removeFav(fav.id)}>
                        <DeleteOutlined />
                        </button>
                      </div>
                    </Col>
                  ))}
                </>
              )}
            </Row>
          ) : (
            <NoData />
          )}
          {/* Render Pagination Component */}
          {favList.length > 0 && (
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={favList.length}
              onChange={handlePageChange}
              style={{ textAlign: "center", marginTop: "20px" }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default FavoriteContentSection;
