"use client";

import React, { useState } from "react";
import Input from "./Input";
import toast from "react-hot-toast";
import axios from "axios";

const Home = () => {
  const [showPregnancies, setShowPregnancies] = useState(false);
  const [data, setData] = useState({
    pregnancies: 0,
    glucose: 0,
    blood_pressure: 0,
    skin_thickness: 0,
    insulin: 0,
    bmi: 0,
    diabetes_pedigree_function: 0,
    age: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: parseFloat(value) });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const url = "https://fastapi-test-jflb.onrender.com/";

      const response = await axios.post(url, {
        pregnancies: 3,
        glucose: 150,
        blood_pressure: 80,
        skin_thickness: 25,
        insulin: 100,
        bmi: 28.5,
        diabetes_pedigree_function: 0.627,
        age: 45,
      });

      if (!response || !response.data)
        throw new Error("No response data received from the server.");
      if (response.status !== 200)
        throw new Error(`Unexpected response status: ${response.status}`);
      if (typeof response.data.result === "undefined")
        throw new Error("Missing result in response data.");

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
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-3 pb-5 px-5 md:px-10 md:pt-7 md:pb-12 gap-2 flex flex-col">
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
          />
        )}
        {/* Glucose */}
        <Input
          name="glucose"
          label="Glucose Level (0 to 200)"
          placeholder="Glucose"
          value={data.glucose}
          handleChange={handleChange}
        />
        {/* Blood Pressure */}
        <Input
          name="blood_pressure"
          label="Blood Pressure Value (0 to 200)"
          placeholder="Blood Pressure"
          value={data.blood_pressure}
          handleChange={handleChange}
        />
        {/* Blood Pressure */}
        <Input
          name="skin_thickness"
          label="Skin Thickness Value (0 to 100)"
          placeholder="Skin Thickness"
          value={data.skin_thickness}
          handleChange={handleChange}
        />
        {/* Insulin */}
        <Input
          name="insulin"
          label="Insulin Level (0 to 500)"
          placeholder="Insulin"
          value={data.insulin}
          handleChange={handleChange}
        />
        {/* BMI */}
        <Input
          name="bmi"
          label="BMI Value (0 to 100)"
          placeholder="BMI"
          value={data.bmi}
          handleChange={handleChange}
        />
        {/* Diabetes Pedigree Function */}
        <Input
          name="diabetes_pedigree_function"
          label="Diabetes Pedigree Function Value (0 to 5)"
          placeholder="Diabetes Pedigree Function"
          value={data.diabetes_pedigree_function}
          handleChange={handleChange}
        />
        {/* Age */}
        <Input
          name="age"
          label="Age"
          placeholder="Age"
          value={data.age}
          handleChange={handleChange}
        />
        <button
          type="submit"
          className="btn btn-wide btn-primary text-white mt-2"
        >
          <span className="loading loading-spinner"></span>
          Diabetes Test Result
        </button>
      </form>
    </div>
  );
};

export default Home;
