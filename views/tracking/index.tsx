import TrackingGraph from "@/components/TrackingGraph";
import React from "react";

const Tracking = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 md:py-16 gap-2 flex flex-col">
      <h2 className="font-semibold text-3xl text-center mb-6 flex items-center gap-2 w-full justify-center">
        Tracking
        <svg
          width="30px"
          height="30px"
          viewBox="0 0 1024 1024"
          className="icon"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M927.4 273.5v-95.4h-87.9V82.8h-201v95.3h-87.9v95.4h-78.5v-95.4h-88V82.8H183.2v95.3H95.3v95.4H16.7v190.6h78.6v95.4h75.3v95.3H246v95.3h87.9v95.4h100.5v95.3h153.9v-95.3h100.4v-95.4h88v-95.3H852.1v-95.3h75.3v-95.4h78.5V273.5z"
            fill="#E02D2D"
          />
        </svg>
      </h2>
      <TrackingGraph />
    </div>
  );
};

export default Tracking;
