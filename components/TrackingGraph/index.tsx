"use client";

import React from "react";
import DiabetesChart from "./DiabetesChart";
import { IoSpeedometerOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { PiHeartbeat } from "react-icons/pi";
import { MdOutlineBloodtype } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoBookmarksOutline } from "react-icons/io5";
import { MdOutlineHealthAndSafety } from "react-icons/md";

const trackingData = [
  {
    testInstances: 1,
    pregnancies: 2,
    glucose: 90,
    blood_pressure: 70,
    skin_thickness: 20,
    insulin: 80,
    bmi: 22.0,
    diabetes_pedigree_function: 0.5,
    age: 25,
    created_at: "2024-05-20T08:00:00Z",
  },
  {
    testInstances: 2,
    pregnancies: 3,
    glucose: 180,
    blood_pressure: 85,
    skin_thickness: 35,
    insulin: 130,
    bmi: 28.5,
    diabetes_pedigree_function: 0.8,
    age: 35,
    created_at: "2024-05-21T08:00:00Z",
  },
  {
    testInstances: 3,
    pregnancies: 1,
    glucose: 110,
    blood_pressure: 80,
    skin_thickness: 25,
    insulin: 100,
    bmi: 24.0,
    diabetes_pedigree_function: 0.6,
    age: 30,
    created_at: "2024-05-22T08:00:00Z",
  },
  {
    testInstances: 4,
    pregnancies: 4,
    glucose: 150,
    blood_pressure: 90,
    skin_thickness: 30,
    insulin: 120,
    bmi: 27.0,
    diabetes_pedigree_function: 0.75,
    age: 40,
    created_at: "2024-05-23T08:00:00Z",
  },
  {
    testInstances: 5,
    pregnancies: 2,
    glucose: 200,
    blood_pressure: 95,
    skin_thickness: 40,
    insulin: 150,
    bmi: 30.0,
    diabetes_pedigree_function: 0.9,
    age: 45,
    created_at: "2024-05-24T08:00:00Z",
  },
];

const TrackingGraph = () => {
  const data = {
    testInstances: [1, 2, 3, 4, 5],
    pregnancies: [2, 3, 1, 4, 2],
    glucose: [90, 180, 110, 150, 200],
    blood_pressure: [70, 85, 80, 90, 95],
    skin_thickness: [20, 35, 25, 30, 40],
    insulin: [80, 130, 100, 120, 150],
    bmi: [22.0, 28.5, 24.0, 27.0, 30.0],
    diabetes_pedigree_function: [0.5, 0.8, 0.6, 0.75, 0.9],
    age: [25, 35, 30, 40, 45],
  };

  const diabetesPrediction = [0, 1, 0, 1, 1];

  return (
    <div>
      <DiabetesChart data={data} diabetesPrediction={diabetesPrediction} />
      <h2 className="font-semibold mt-10 text-3xl text-center mb-6 flex items-center gap-2 w-full justify-center">
        Session Entry
        <IoBookmarksOutline />
      </h2>
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
        {trackingData.map((item) => {
          const { bmi, created_at, blood_pressure, glucose } = item;
          return (
            <div
              key={created_at + bmi}
              className="inline-flex justify-between font-medium h-auto py-5 border border-gray-300 px-3 rounded-md hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                //@ts-ignore
                document.getElementById("my_modal_2").showModal();
              }}
            >
              <div className="w-full">
                <div className="flex justify-around gap-2">
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
                      {new Date(created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="border border-gray-300 my-2" />
                <div className="flex justify-between mt-1">
                  <div className="flex">
                    <MdOutlineHealthAndSafety
                      className={`text-2xl ${
                        Math.random() ? "fill-green-400" : " fill-red-400"
                      }`}
                    />
                    Not Diabetes
                  </div>
                  <MdOutlineDeleteOutline className=" text-2xl text-red-500" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box grid grid-cols-2">
          <div className="flex gap-2 items-center w-full">
            <h3 className=" font-semibold">Glucose: </h3>
            {trackingData[0].glucose}
          </div>
          <div className="flex gap-2 items-center w-full">
            <h3 className=" font-semibold">Blood Pressure: </h3>
            {trackingData[0].blood_pressure}
          </div>
          <div className="flex gap-2 items-center w-full">
            <h3 className=" font-semibold">BMI: </h3>
            {trackingData[0].bmi}
          </div>
          <div className="flex gap-2 items-center w-full">
            <h3 className=" font-semibold">Date: </h3>
            {new Date(trackingData[0].created_at).toLocaleString()}
          </div>
          <div className="flex gap-2 items-center w-full">
            <h3 className=" font-semibold">Age: </h3>
            {trackingData[0].age}
          </div>
          <div className="flex gap-2 items-center w-full">
            <h3 className=" font-semibold">Insulin: </h3>
            {trackingData[0].insulin}
          </div>
          <div className="flex gap-2 items-center w-full">
            <h3 className=" font-semibold">Skin Thickness: </h3>
            {trackingData[0].skin_thickness}
          </div>
          <div className="flex gap-2 items-center w-full">
            <h3 className=" font-semibold">Pregnancies: </h3>
            {trackingData[0].pregnancies}
          </div>
          <div className="flex gap-2 items-center w-full col-span-2">
            <h3 className=" font-semibold">Diabetes Pedigree Function: </h3>
            {trackingData[0].diabetes_pedigree_function}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default TrackingGraph;
