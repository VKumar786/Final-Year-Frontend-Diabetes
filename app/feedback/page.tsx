"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { CiLocationArrow1 } from "react-icons/ci";
import axios from "axios";

const FeedbackPage = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is Required"),
      message: Yup.string().required("Message is Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const toastId = toast.loading('Sending feedback')
      try {
        setSubmitting(true);
        
        const res = await axios.post('/api/feedback', values)

        if (res.status !== 200)
          throw new Error(res?.data?.error || "Failed to send feedback");

        toast.success("Feedback added successfully", { id: toastId });
      } catch (error: any) {
        toast.error(error?.response?.data?.error || "Error while adding user", {
          id: toastId,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex min-h-5/6 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          imageRendering="optimizeQuality"
          fillRule="evenodd"
          clipRule="evenodd"
          viewBox="0 0 384 511.4"
          width={30}
          height={30}
        >
          <defs>
            <linearGradient
              id="a"
              gradientUnits="userSpaceOnUse"
              x1="163.52"
              y1="286.47"
              x2="163.52"
              y2="500.71"
            >
              <stop offset={0} stopColor="#FB6404" />
              <stop offset={1} stopColor="#F2BE10" />
            </linearGradient>
          </defs>
          <path
            fill="#E20919"
            d="M77.46 228.43C65.33 119.85 128.78 43.48 247.72 0c-72.85 94.5 62.09 196.88 69.53 295.03 17.44-29.75 27.34-69.48 29.3-122.55 89.18 139.92 15.25 368.59-181.02 335.73-18.02-3.01-35.38-8.7-51.21-17.17C42.76 452.8 0 369.53 0 290c0-50.69 21.68-95.95 49.74-131.91 3.75 35.23 11.73 61.51 27.72 70.34z"
          />
          <path
            fill="url(#a)"
            d="M139.16 372.49c-21.83-57.66-18.81-150.75 42.33-183.41.43 107.03 103.57 120.64 84.44 234.9 17.64-20.39 26.51-53.02 28.1-78.75 27.96 65.38 6.04 117.72-33.81 144.37-121.15 81-225.48-83.23-156.11-173.26 2.08 20.07 26.14 51.12 35.05 56.15z"
          />
        </svg>

        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Feedback
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6 outline-none"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Enter Email"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Message
              </label>
            </div>
            <div className="mt-2">
              <textarea
                id="message"
                name="message"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Message..."
                value={formik.values.message}
              />
              {formik.touched.message && formik.errors.message ? (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.message}
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-neutral btn-sm w-full"
            >
              {formik.isSubmitting ? (
                <span className="loading loading-spinner" />
              ) : (
                <CiLocationArrow1 className="text-xl stroke-1" />
              )}
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;
