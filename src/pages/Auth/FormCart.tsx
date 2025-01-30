import IMAGES from "@assets/images/images";
import "./Auth.scss";
import { ReactNode } from "react";

  interface Item{
    bx_width?: string,
    bx_title?: string,
    title_text?: string,
    content?: ReactNode,
  }
const FormCart = ({bx_width,bx_title,title_text,content}:Item) => {
  return (
    <>
      <div className={`${bx_width} pb-[35px] pt-[30px] px-[50px] bg-[#fff] rounded-[16px] z-50`}>
        <div className="flex items-center justify-center mb-2">
          <img className="w-[300px]" src={IMAGES.coloredLogo} alt="pic" />
        </div>

        <h3 className="text-[#494949] text-[24px] font-semibold mb-2">{ bx_title }</h3>
        <p className="text-[#a9a9a9] text-[15px] mb-[20px]">{ title_text }</p>

        <div>{ content }</div>
      </div>
    </>
  );
};

export default FormCart;
