import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import chart1 from './../../../assets/json/chart1.json'; 
import chart2 from './../../../assets/json/chart2.json'; 
import chart3 from './../../../assets/json/chart3.json'; 
import IMAGES from '@assets/images/images';
import { USERS_URLS, RECIPES_URLS, CATEGORIES_URLS, BASE_HEADERS } from 'src/constants/END_POINTS';

const HomeContent = () => {

    const { t } = useTranslation();
    const [usersData, setUsersData] = useState();
    const [recipesData, setRecipesData] = useState();
    const [categoriesData, setCategoriesData] = useState();

    const getUsersData = async () => {
        try {
          const response = await axios.get(USERS_URLS.getUsersNum(), BASE_HEADERS);
          console.log(response.data.totalNumberOfRecords);
          setUsersData(response.data.totalNumberOfRecords);
        } catch (error) {
          console.log(error);
        }
    };

    const getRecipesData = async () => {
        try {
          const response = await axios.get(RECIPES_URLS.getRecipeNum(), BASE_HEADERS);
          console.log(response.data.totalNumberOfRecords);
          setRecipesData(response.data.totalNumberOfRecords);
        } catch (error) {
          console.log(error);
        }
    };

    const getCategoriesData = async () => {
        try {
          const response = await axios.get(CATEGORIES_URLS.getCategoriesNum(), BASE_HEADERS);
          console.log(response.data.totalNumberOfRecords);
          setCategoriesData(response.data.totalNumberOfRecords);
        } catch (error) {
          console.log(error);
        }
    };
    
    useEffect(() => {
        getUsersData();
        getRecipesData();
        getCategoriesData();
    }, []);

  return (
    <div className="record_container">
        <div className="record_bx">
            <h3><img src={IMAGES.usersIcon} alt='pic' /> {t('users')}</h3>
            <Lottie className='lottie_bx w-[70%]' animationData={chart1} loop={true} />
            <div>
                <h4>{t('total_number')}</h4>
                <p>{usersData}</p>
            </div>
        </div>
        <div className="record_bx">
            <h3><img src={IMAGES.recipesIcon} alt='pic' /> {t('recipes')}</h3>
            <Lottie className='lottie_bx w-[80%]' animationData={chart2} loop={true} />
            <div>
                <h4>{t('total_number')}</h4>
                <p>{recipesData}</p>
            </div>
        </div>
        <div className="record_bx">
            <h3><img src={IMAGES.categoriesIcon} alt='pic' /> {t('categories')}</h3>
            <Lottie className='lottie_bx' animationData={chart3} loop={true} />
            <div>
                <h4>{t('total_number')}</h4>
                <p>{categoriesData}</p>
            </div>
        </div>
    </div>
  )
}

export default HomeContent