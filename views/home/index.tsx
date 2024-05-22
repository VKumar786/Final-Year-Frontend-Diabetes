"use client";

import React, { useState } from "react";
import Input from "./Input";
import toast from "react-hot-toast";
import axios from "axios";
import { CiLocationArrow1 } from "react-icons/ci";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPregnancies, setShowPregnancies] = useState(false);
  const [data, setData] = useState({
    pregnancies: 0,
    glucose: 0.0,
    blood_pressure: 0.0,
    skin_thickness: 0.0,
    insulin: 0.0,
    bmi: 0.0,
    diabetes_pedigree_function: 0.0,
    age: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: parseFloat(value) });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const url = "https://fastapi-test-jflb.onrender.com/";

      const response = await axios.post(url, data);

      if (!response || !response.data)
        throw new Error("No response data received from the server.");
      if (response.status !== 200)
        throw new Error(`Unexpected response status: ${response.status}`);
      if (typeof response.data.result === "undefined")
        throw new Error("Missing result in response data.");

      const storeResponse = await axios.post("/api/track", {
        ...data,
        is_diabetic: response.data.result === 1,
      });

      if (storeResponse.data.error) throw new Error(storeResponse.data.error);

      if (response.data.result === 0)
        toast.success(
          "Great news! Your diabetes test result is negative. Keep up the healthy habits!",
          {
            duration: 7000,
          }
        );
      else
        toast.error(
          "Unfortunately, your diabetes test result is positive. Please consult with a healthcare provider for further guidance.",
          {
            duration: 7000,
          }
        );
    } catch (error) {
      toast.error(
        error?.toString() || "An error occurred. Please try again later.",
        {
          duration: 7000,
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-3 pb-5 px-5 md:px-10 md:pt-7 md:pb-12 gap-2 flex flex-col">
      <h2 className="font-semibold text-3xl text-center mb-6 mt-3">
        Diabetes Prediction System 🤖
      </h2>
      <form
        method="post"
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 items-center w-full"
      >
        {/* Gender */}
        <label className="form-control w-full max-w-xl">
          <div className="label">
            <span className="label-text">Select Gender</span>
          </div>
          <select
            className="select select-bordered"
            defaultValue={0}
            onChange={(e) => {
              setShowPregnancies(parseFloat(e.target.value) === 1);
            }}
          >
            <option disabled selected>
              Pick one
            </option>
            <option value={0}>Male</option>
            <option value={1}>Female</option>
          </select>
        </label>
        {/* Pregnancies */}
        {showPregnancies && (
          <Input
            name="pregnancies"
            label="Number of Pregnancies"
            placeholder="Pregnancies"
            value={data.pregnancies}
            handleChange={handleChange}
            isFloat={false}
          />
        )}
        {/* Glucose */}
        <Input
          name="glucose"
          label="Glucose Level (0 to 200)"
          placeholder="Glucose"
          value={data.glucose}
          handleChange={handleChange}
          maxVal={200}
          isFloat={true}
        />
        {/* Blood Pressure */}
        <Input
          name="blood_pressure"
          label="Blood Pressure Value (0 to 200)"
          placeholder="Blood Pressure"
          value={data.blood_pressure}
          handleChange={handleChange}
          maxVal={200}
          isFloat={true}
        />
        {/* Skin Thickness */}
        <Input
          name="skin_thickness"
          label="Skin Thickness Value (0 to 100)"
          placeholder="Skin Thickness"
          value={data.skin_thickness}
          handleChange={handleChange}
          maxVal={100}
          isFloat={true}
        />
        {/* Insulin */}
        <Input
          name="insulin"
          label="Insulin Level (0 to 500)"
          placeholder="Insulin"
          value={data.insulin}
          handleChange={handleChange}
          maxVal={500.0}
          isFloat={true}
        />
        {/* BMI */}
        <Input
          name="bmi"
          label="BMI Value (0 to 100)"
          placeholder="BMI"
          value={data.bmi}
          handleChange={handleChange}
          maxVal={100.0}
          isFloat={true}
        />
        {/* Diabetes Pedigree Function */}
        <Input
          name="diabetes_pedigree_function"
          label="Diabetes Pedigree Function Value (0 to 5)"
          placeholder="Diabetes Pedigree Function"
          value={data.diabetes_pedigree_function}
          handleChange={handleChange}
          maxVal={5.0}
          isFloat={true}
        />
        {/* Age */}
        <Input
          name="age"
          label="Age"
          placeholder="Age"
          value={data.age}
          handleChange={handleChange}
          isFloat={false}
        />
        <button
          type="submit"
          className="btn btn-wide btn-neutral text-white mt-2"
        >
          {isLoading ? (
            <span className="loading loading-spinner" />
          ) : (
            <CiLocationArrow1 className=" text-xl stroke-1" />
          )}
          Diabetes Test Result
        </button>
      </form>
    </div>
  );
};

export default Home;
