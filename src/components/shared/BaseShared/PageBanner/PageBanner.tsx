//import IMAGES from '@assets/images/images';
import { ReactNode } from "react";
import "./PageBanner.scss";

interface Item {
  main_title?: string;
  sub_title?: string;
  banner_text?: string;
  img_path?: string;
  json_img?: ReactNode;
}

const PageBanner = ({ main_title, sub_title, banner_text, img_path, json_img }: Item) => {
  return (
    <div id="page_banner">
      <div className="text">
        <h3>
          {main_title} <span className="sub_text">{sub_title}</span>
        </h3>
        <p>{banner_text}</p>
      </div>

      <div className="img_holder">
        <img src={img_path} alt="pic" />
        <div>{json_img}</div>
      </div>
    </div>
  );
};

export default PageBanner;
