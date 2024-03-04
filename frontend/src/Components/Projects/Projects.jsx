import React, { useEffect, useState } from "react";
import "./Projects.css";
import { Link, useParams } from "react-router-dom";
import {
  getPortfolioById,
  getPortfolioByListNameLogo,
  createContact,
} from "../../services/portfolioService";
import Contact from "../Contact/Contact";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Projects = () => {
  const { projectId } = useParams();

  const [portfolios, setPortfolios] = useState({});
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [videoUrls, setVideoUrls] = useState([]);

  const [portfolioList, setPortfolioList] = useState([]);

  useEffect(() => {
    if (!isDataFetched) {
      fetchPortfolios();
      fetchPortfolioList();
    }
  }, [isDataFetched]);

  const fetchPortfolios = async () => {
    try {
      const portfoliosData = await getPortfolioById(projectId);

      const urls = [];
      for (let i = 1; i <= 18; i++) {
        const key = `workUrl_${i}`;
        if (portfoliosData.data[key]) {
          urls.push(portfoliosData.data[key]);
        }
      }
      setVideoUrls(urls);

      setPortfolios(portfoliosData.data);
      setIsDataFetched(true);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    }
  };

  const fetchPortfolioList = async () => {
    try {
      const data = await getPortfolioByListNameLogo();
      setPortfolioList(data.data);
      setIsDataFetched(true);
      console.log(data.data, "getPortfolioByListNameLogo");
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    }
  };

  return (
    <div className="projects">
      <div className="relative h-screen">
        <video
          className="absolute top-0 left-0 object-cover w-full h-full"
          // height="315"
          autoPlay
          muted
          controls={false}
          src={portfolios.bannerUrl}
          frameborder="0"
          allowfullscreen
          loop
        ></video>
      </div>

      <div className="aboutProject container mx-auto py-16 flex gap-40 flex-col md:flex-row items-start">
        {/* <div className="aboutProject md:w-1/2 md:pr-8 mb-6 md:mb-0"> */}

        <div className=" w-full mb-6 md:mb-0">
          <h2 className="heading text-3xl text-white-700 font-bold mb-4 md:text-left">
            ABOUT PROJECT
          </h2>
          <p className="text-lg text-white-700">{portfolios.about}</p>
        </div>
        <div className="aboutProjectVideo">
          <video
            className="w-full object-cover h-full"
            src={portfolios.aboutUrl}
            frameborder="0"
            autoPlay
            muted
            controls={false}
            allowfullscreen
            loop
          ></video>
        </div>
      </div>

      <div className="WorkDiv container mx-auto py-16">
        <h2 className="heading text-3xl font-bold mb-8 text-center">Works</h2>
        <div className="swiperDiv">
          <Swiper
            freeMode={true}
            navigation={false} // Enable navigation
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 36,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {videoUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <video
                  className="customVideo"
                  src={url}
                  autoPlay
                  muted
                  controls={false}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                  loop
                ></video>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="container mx-auto py-16">
        <h2 className="heading text-center text-3xl font-bold mb-8">
          Our Other Projects
        </h2>
        {/* New Changes Started */}
        <div className="workDiv flex mt-1 flex-wrap">
          {/* portfolioCard */}
          {portfolioList.map((portfolio, index) => (
            <div
              className="portfolioCard w-1/4 md:w-1/4 sm:w-2/4 relative"
              key={index}
            >
              <Link to={`/Projects/${portfolio._id}`}>
                <img
                  className="portfolioImg w-full"
                  src={portfolio.imageUrl}
                  alt="Project 1"
                />
                <div className="onHover absolute top-0">
                  <div className="textContainer m-4">
                    <h5 className="font-primary w-full text-white ml-4">
                      {portfolioList.title}
                    </h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          {/* portfolioCard End */}
        </div>
        {/* New Changes Ended */}
      </div>

      <div className="container mx-auto py-16">
        <h2 className="heading text-3xl font-bold mb-8">Let's Get in Touch</h2>
        <div className="contactDiv flex flex-col md:flex-row items-center gap-8">
          {/* <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0"> */}
          <div className="w-full mb-6 md:mb-0">
            <h3 className="heading text-xl font-semibold mb-2">
              1SHDEEP CREATIVES
            </h3>
            <p className="md:text-left">
              F. No 2/6 Panchwati Complex, 3B Saket Nagar, Bhopal.
              <br />
              Mobile: +91 9179940591
              <br />
              Email: vanshdeepofficial@gmail.com
              <br />
              Mon-Fri: 9am to 6pm
            </p>
          </div>

          <Contact />
        </div>
      </div>
    </div>
  );
};

export default Projects;
