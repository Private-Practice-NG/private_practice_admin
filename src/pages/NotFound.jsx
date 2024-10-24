// import React from "react";
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="404-page auth-body w-screen h-screen flex flex-col justify-center items-center gap-6 px-3">
      <svg
        className="w-[200px] sm:w-[200px]"
        viewBox="0 0 489 189"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-0.00807816 153.04V122.766L75.8975 3.18181H101.998V45.0852H86.5509L38.6993 120.813V122.234H146.565V153.04H-0.00807816ZM87.2611 185V143.807L87.9713 130.401V3.18181H124.015V185H87.2611ZM243.467 188.995C228.197 188.936 215.058 185.178 204.049 177.72C193.1 170.263 184.666 159.461 178.747 145.316C172.888 131.171 169.988 114.155 170.047 94.2685C170.047 74.4413 172.977 57.5438 178.836 43.576C184.755 29.6082 193.189 18.9844 204.138 11.7045C215.146 4.36553 228.256 0.696016 243.467 0.696016C258.677 0.696016 271.757 4.36553 282.707 11.7045C293.715 19.0436 302.179 29.697 308.097 43.6648C314.016 57.5734 316.946 74.4413 316.886 94.2685C316.886 114.214 313.927 131.259 308.009 145.405C302.149 159.55 293.745 170.352 282.796 177.809C271.846 185.266 258.737 188.995 243.467 188.995ZM243.467 157.124C253.883 157.124 262.199 151.886 268.413 141.41C274.628 130.934 277.706 115.22 277.646 94.2685C277.646 80.4782 276.226 68.9962 273.385 59.8224C270.603 50.6487 266.638 43.7535 261.489 39.1371C256.399 34.5206 250.391 32.2124 243.467 32.2124C233.109 32.2124 224.823 37.3911 218.609 47.7486C212.394 58.1061 209.257 73.6127 209.198 94.2685C209.198 108.236 210.589 119.896 213.371 129.247C216.212 138.539 220.207 145.523 225.356 150.199C230.505 154.815 236.542 157.124 243.467 157.124ZM341.545 153.04V122.766L417.45 3.18181H443.551V45.0852H428.104L380.252 120.813V122.234H488.118V153.04H341.545ZM428.814 185V143.807L429.524 130.401V3.18181H465.568V185H428.814Z"
          fill="url(#paint0_linear_359_1157)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_359_1157"
            x1="243.5"
            y1="-57"
            x2="243.5"
            y2="246"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#10ACF5" />
            <stop offset="1" stopColor="#66FFD2" />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-center">
        <h1 className="poppins text-[18px] font-[500] uppercase">
          Page not found
        </h1>
        <p className="mt-4 text-[14px] xsm:text-[16px] sm:w-[600px] mx-auto">
          It looks like the page you are looking for might have been moved,
          renamed, or doesn't exist. Let's get you back on track!
        </p>
      </div>
      <div className="return-home-button-wrapper w-full xsm:w-[300px] mt-6">
        <button
          onClick={() => navigate('/')}
          className="poppins bg-[#10acf5] w-full xsm:w-[300px] mx-auto py-4 px-3 text-[16px] text-white rounded-[5px]"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
