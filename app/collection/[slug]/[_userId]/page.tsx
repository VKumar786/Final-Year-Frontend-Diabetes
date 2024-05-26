"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IoSpeedometerOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { PiHeartbeat } from "react-icons/pi";
import { MdOutlineBloodtype } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoBookmarksOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import DiabetesChart from "../../../../components/TrackingGraph/DiabetesChart";

const ParticularUserTracking = (props: any) => {
  const [tracks, setTracks] = useState<any>([]);
  const [track, setTrack] = useState<any>(null);
  const modalRef = useRef(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `/api/collection/${props.params.slug}/${props.params._userId}`
      );
      setTracks(res.data.tracks);
    } catch (error) {
      toast.error("Error fetching tracks");
    }
  };

  useEffect(() => {
    fetchData();
  }, [props]);

  if (!tracks.length) {
    return (
      <div className="flex flex-1 items-center justify-center flex-col gap-5 text-slate-500 dark:text-slate-400">
        <p>
          Oops! It looks like your saved products is empty. Start adding items
          to your saved products and enjoy shopping!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 md:py-16 gap-2 flex flex-col">
      <div>
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
        <DiabetesChart tracks={tracks} />
        <h2 className="font-semibold mt-10 text-3xl text-center mb-6 flex items-center gap-2 w-full justify-center">
          Session Entry
          <IoBookmarksOutline />
        </h2>
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
          {tracks.map((item: any) => {
            const { bmi, blood_pressure, glucose, is_diabetic, createdAt, id } =
              item;
            return (
              <div
                key={createdAt + bmi + blood_pressure + glucose}
                className="inline-flex justify-between font-medium h-auto py-5 border border-gray-300 px-3 rounded-md hover:bg-gray-50"
              >
                <div className="w-full">
                  <div
                    className="flex justify-around gap-2 cursor-pointer"
                    onClick={() => {
                      //@ts-ignore
                      modalRef?.current?.showModal();
                      setTrack(item);
                    }}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 items-center w-full">
                        <MdOutlineBloodtype />
                        {glucose}
                      </div>
                      <div className="flex gap-2 items-center w-full">
                        <PiHeartbeat />
                        {blood_pressure}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 items-center w-full">
                        <IoSpeedometerOutline />
                        {bmi}
                      </div>
                      <div className="flex gap-2 items-center w-full">
                        <CiCalendar />
                        {new Date(createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-300 my-2" />
                  <div className="flex justify-between mt-1">
                    <div
                      className={`flex ${
                        is_diabetic ? "bg-green-400" : " bg-red-400"
                      } text-white rounded-md px-2`}
                    >
                      {is_diabetic ? "Diabetes" : "Not Diabetes"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {track && (
          <dialog ref={modalRef} className="modal">
            <div className="modal-box grid grid-cols-2">
              <div className="flex gap-2 items-center w-full">
                <h3 className=" font-semibold">Glucose: </h3>
                {track.glucose}
              </div>
              <div className="flex gap-2 items-center w-full">
                <h3 className=" font-semibold">Blood Pressure: </h3>
                {track.blood_pressure}
              </div>
              <div className="flex gap-2 items-center w-full">
                <h3 className=" font-semibold">BMI: </h3>
                {track.bmi}
              </div>
              <div className="flex gap-2 items-center w-full">
                <h3 className=" font-semibold">Date: </h3>
                {new Date(track.createdAt).toLocaleString()}
              </div>
              <div className="flex gap-2 items-center w-full">
                <h3 className=" font-semibold">Age: </h3>
                {track.age}
              </div>
              <div className="flex gap-2 items-center w-full">
                <h3 className=" font-semibold">Insulin: </h3>
                {track.insulin}
              </div>
              <div className="flex gap-2 items-center w-full">
                <h3 className=" font-semibold">Skin Thickness: </h3>
                {track.skin_thickness}
              </div>
              <div className="flex gap-2 items-center w-full">
                <h3 className=" font-semibold">Pregnancies: </h3>
                {track.pregnancies}
              </div>

              <div className="flex gap-2 items-center w-full">
                <h3 className=" font-semibold">Status: </h3>
                <div
                  className={`flex ${
                    track.is_diabetic ? "bg-green-400" : " bg-red-400"
                  } text-white rounded-md px-2`}
                >
                  {track.is_diabetic ? "Diabetes" : "Not Diabetes"}
                </div>
              </div>
              <div className="flex gap-2 items-center w-full col-span-2">
                <h3 className=" font-semibold">Diabetes Pedigree Function: </h3>
                {track.diabetes_pedigree_function}
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default ParticularUserTracking;
