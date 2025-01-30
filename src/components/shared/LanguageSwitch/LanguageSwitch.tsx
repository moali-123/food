import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
//import languageIcon from '../../../assets/images/svg/world-language.svg';
import { showLoader, hideLoader } from 'src/redux/loaderSlice';
import { useDispatch } from 'react-redux';
import IMAGES from '@assets/images/images';

const LanguageSwitch = () => {
    const { i18n } = useTranslation();
    document.documentElement.lang = i18n.language;
    const dispatch = useDispatch();

    const fireLoader = () => {
        dispatch(showLoader());

        setTimeout(() => {
        dispatch(hideLoader());
        }, 800);
    };

    useEffect(() => {
        fireLoader();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language]);

    return (
        <>        
        <div className='choose-lang'>
            {i18n.language === 'en' && <span
                onClick={() => {
                    fireLoader(),
                    window.scroll({
                        top: 0,
                        behavior: 'smooth',
                    }),
                    i18n.changeLanguage('ar')
                }}
            >
                عربي <img className='flag_img' src={IMAGES.saFlag} alt='pic' />
            </span>}

            {i18n.language === 'ar' && <span
                onClick={() => {
                    fireLoader(),
                    window.scroll({
                        top: 0,
                        behavior: 'smooth',
                    }),
                    i18n.changeLanguage('en')
                }}
            >
                english <img className='flag_img' src={IMAGES.ukFlag} alt='pic' />
            </span>}
        </div>
        </>
    );
}

export default LanguageSwitch;
