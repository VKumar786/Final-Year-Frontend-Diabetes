"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { PiPaperPlaneTilt } from "react-icons/pi";

const ParticularCollection = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [collectionData, setCollectionData] = useState<any>([]);
  const [data, setData] = useState({
    email: "",
    passkey: "",
  });

  const getCollectionData = useCallback(async () => {
    const res = await axios.get(`/api/collection/${props.params.slug}`);
    setCollectionData(res?.data?.collection || []);
  }, [props.params.slug]);

  useEffect(() => {
    getCollectionData();
  }, [getCollectionData]);

  const handleSubmit = async (e: any) => {
    const toastId = toast.loading("Adding User");
    try {
      e.preventDefault();
      setIsLoading(true);

      if (!data.email || !data.passkey)
        throw new Error("Email and PassKey are required");

      const res = await axios.put(`/api/collection/${props.params.slug}`, data);

      if (res.status !== 200)
        throw new Error(res?.data?.error || "Failed to Add User");

      setData({
        email: "",
        passkey: "",
      });
      setIsLoading(false);
      //@ts-ignore
      document.getElementById("my_modal_2").close();
      toast.success("User added successfully", { id: toastId });
      getCollectionData();
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Error while adding user", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleCollectionUserDelete = async (id: string) => {
    const toastId = toast.loading("Deleting User");
    try {
      const res = await axios.delete(
        `/api/collection/${props.params.slug}/${id}`
      );

      if (res.status !== 200)
        throw new Error(res?.data?.error || "Failed to Delete User");

      toast.success("User deleted successfully", { id: toastId });
      getCollectionData();
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Error while deleting user", {
        id: toastId,
      });
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-12 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col items-start h-full max-w-xl w-full mx-auto text-center justify-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl w-full">
            Add User 🧑
          </h2>
          <dl className="w-full mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="pt-4 col-span-2">
              <div className="rounded-lg bg-gray-50 w-full flex items-center justify-center text-xl gap-1 cursor-pointer">
                <label className="form-control w-full">
                  <input
                    type="email"
                    placeholder="Enter Email ..."
                    className="input input-bordered w-full"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                  />
                </label>
                <button
                  className="btn btn-neutral"
                  type="submit"
                  onClick={() => {
                    //@ts-ignore
                    document.getElementById("my_modal_2").showModal();
                  }}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner" />
                  ) : (
                    <IoMdAdd className=" text-xl stroke-1" />
                  )}
                </button>
              </div>
            </div>
          </dl>
        </div>

        {/* Add User Modal */}
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <form
              method="post"
              className="flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <input
                  type="email"
                  placeholder="Enter Email ..."
                  className="input input-bordered w-full"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">PassKey</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter PassKey ..."
                  className="input input-bordered w-full"
                  name="passkey"
                  value={data.passkey}
                  onChange={handleChange}
                />
              </label>
              <button className="btn btn-neutral mt-2" type="submit">
                {isLoading ? (
                  <span className="loading loading-spinner" />
                ) : (
                  <PiPaperPlaneTilt className=" text-xl stroke-1" />
                )}
                Add User
              </button>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {(collectionData?.users || [])?.map((item: any) => {
            const { userId, name, email, imageUrl } = item;
            return (
              <div
                key={userId}
                className="rounded-lg bg-gray-50 w-full border border-gray-10 py-4 px-2 flex items-center h-fit justify-between"
              >
                <Link
                  href={`/collection/${props.params.slug}/${userId}`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Image
                    className="h-16 w-16 bg-white rounded-full border border-gray-200"
                    src={
                      imageUrl ||
                      "https://avatars.githubusercontent.com/u/33460?v=4"
                    }
                    width={40}
                    height={40}
                    alt=""
                  />
                  <div className="flex flex-col items-start text-sm">
                    <p className=" max-w-full break-all text-center font-semibold tracking-wider text-md">
                      {name}
                    </p>
                    <p className=" max-w-full break-all text-center text-gray-600">
                      {email.split("@")[0]}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end mt-3">
                  <MdOutlineDeleteOutline
                    className="text-2xl text-red-500 cursor-pointer"
                    onClick={() => handleCollectionUserDelete(userId)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ParticularCollection;
