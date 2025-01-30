import React from 'react';
import {
  PageBanner,
  CatugContentSection,
} from "@components/index";
import IMAGES from "@assets/images/images";
import { useTranslation } from "react-i18next";
import "./Categories.scss";

const Categories: React.FC = () => {

  const { t } = useTranslation();

  return (
    <div id="catug_page">
      <PageBanner
        main_title={t('categories')}
        sub_title={t('items')}
        banner_text={t('pages_welcome_text')}
        img_path={IMAGES.usersBanner}
      />

      {/* <CatugTitleSection showAddModal={showAddModal} /> */}
      <CatugContentSection  />
      {/* <CatugContentSection isModalVisible={isModalVisible} handleCancele={handleCancele}  /> */}
      {/* <AddCategory isModalVisible={isModalVisible} handleCancel={handleCancel} /> */}
    </div>
  );
};

export default Categories;
