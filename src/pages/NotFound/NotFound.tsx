import { Link } from "react-router-dom";
import IMAGES from "@assets/images/images";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div id="notfound">
      <div className="content">
        <div className="logo_bx">
          <Link to="/">
            <img src={IMAGES.logo2} alt="pic" />
          </Link>
        </div>

        <div className="text">
          <h3>Oops....</h3>
          <h4>Page not found</h4>
          <p>
            This Page doesn't exist or was removed! We suggest you back to home.
          </p>

          <Link className="back_btn" to="/">
            <img src={IMAGES.whiteBackArrow} alt="pic" />
            <span>
              Back To <br /> Home
            </span>
          </Link>
        </div>

        <span></span>
      </div>
    </div>
  );
};

export default NotFound;
