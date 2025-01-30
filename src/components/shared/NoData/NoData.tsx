import IMAGES from "@assets/images/images";
import "./NoData.scss";

const NoData = () => {
  return (
    <div id="not_found_bx">
      <div className="img_holder">
        <img src={IMAGES.deleteImg} alt="pic" />
      </div>
      <h3>No Data !</h3>
      <p>
        are you sure you want to delete this item ? if you are sure just click
        on delete it
      </p>
    </div>
  );
};

export default NoData;
