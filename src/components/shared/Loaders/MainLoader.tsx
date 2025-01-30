import PuffLoader from 'react-spinners/PuffLoader';
import { useSelector } from 'react-redux';
// import Lottie from "lottie-react";
// import loader1 from './../../../assets/json/loader2.json';

const MainLoader = () => {
    const isLoading = useSelector((state) => state.mainLoader.isLoading);
    return (
        <>
            {isLoading ? (
                <div className="loader-spinner-bx">
                    <PuffLoader 
                        color="#4aa35a"
                        loading={isLoading}
                        size={100}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                    {/* <Lottie animationData={loader1} loop={true} /> */}
                </div>
            ) : (
                <div></div>
            )}
        </>
    );
}

export default MainLoader;
