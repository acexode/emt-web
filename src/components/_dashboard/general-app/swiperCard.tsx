import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// Import Swiper styles
import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import "./swiper.css";
import img from "../../../assets/emtLogo.svg";

// SwiperCore.use([Navigation, Pagination, Autoplay]);

const RootStyle = styled(Card)(({ theme }) => ({
  inset: "0px",
  zIndex: 8,
  backgroundColor: "rgba(22,28,36,0.64)",
  [theme.breakpoints.up("md")]: {
    height: "100%",
    display: "flex",
    textAlign: "left",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const SwiperCard = () => {
  return (
    <RootStyle>
 
     <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        // pagination={{ clickable: true }}
        navigation={false}
      >
        <SwiperSlide className="slideMainBg">
          <div className="slide slideContent">
            <img src={img} alt="Image 1" className="imgCard" />
            <div className="slide-text">
              <h3 className="slideContentText">Slide 1</h3>
              <h2 className="slideContentMainText">Some text about slide 1</h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slideMainBg">
          <div className="slide slideContent">
            <img src={img} alt="Image 2" className="imgCard" />
            <div className="slide-text">
              <h3 className="slideContentText">Slide 2</h3>
              <h2 className="slideContentMainText">Some text about slide 2</h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slideMainBg">
          <div className="slide slideContent">
            <img src={img} alt="Image 3" className="imgCard" />
            <div className="slide-text">
              <h3 className="slideContentText">Slide 3</h3>
              <h2 className="slideContentMainText">Some text about slide 3</h2>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </RootStyle>
  );
};

export default SwiperCard;
