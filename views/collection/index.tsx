"use client";

import { setCollection } from "@/redux/CollectionSlice";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiCalendar } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { CiClock1 } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";

const Collection = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const collection = useSelector((state: any) => state.collection);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  const getCollections = useCallback(async () => {
    if (user) {
      const res = await axios.get("/api/collection");
      dispatch(setCollection(res.data.collections));
    }
  }, [dispatch, user]);

  useEffect(() => {
    getCollections();
  }, [getCollections]);

  if (!user) {
    return (
      <div className="flex flex-1 items-center my-10 justify-center flex-col gap-5 text-slate-500 dark:text-slate-400">
        <p>
          Oops! It looks like you are not logged in. Please SignIn to view your
          collection.
        </p>
        <Link href={"/sign-in"}>
          <button className="btn btn-sm btn-neutral">SignIn</button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: any) => {
    const toastId = toast.loading("Creating collection");
    try {
      e.preventDefault();
      setIsLoading(true);

      const response = await axios.post("/api/collection", {
        name,
      });

      console.log(response);

      if (response.status !== 200)
        throw new Error(response?.data?.error || "Failed to create collection");

      toast.success("Collection created successfully", {
        id: toastId,
      });

      getCollections();
      setName("");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Error creating collection", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCollectionDelete = async (id: string) => {
    const toastId = toast.loading("Deleting collection");
    try {
      const response = await axios.delete(`/api/collection/${id}`);

      if (response.status !== 200)
        throw new Error(
          response?.data?.error || "Failed to deleted collection"
        );

      toast.success("Collection deleted successfully", {
        id: toastId,
      });

      getCollections();
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Error deleting collection", {
        id: toastId,
      });
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-12 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col items-start h-full max-w-xl w-full mx-auto text-center justify-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl w-full">
            Collection
          </h2>
          <p className="mt-4 w-full text-gray-500">
            A track group of related data.
          </p>
          <dl className="w-full mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="pt-4 col-span-2">
              <div className="rounded-lg bg-gray-50 w-full flex items-center justify-center text-xl gap-1 cursor-pointer">
                <form
                  method="post"
                  className="flex items-center gap-4 w-full"
                  onSubmit={handleSubmit}
                >
                  <label className="form-control w-full">
                    <input
                      type="text"
                      placeholder="New collection name"
                      className="input input-bordered w-full"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                  <button className="btn btn-neutral" type="submit">
                    {isLoading ? (
                      <span className="loading loading-spinner" />
                    ) : (
                      <IoMdAdd className=" text-xl stroke-1" />
                    )}
                  </button>
                </form>
              </div>
              <p className=" text-sm text-gray-400 mt-2">
                Collection name must be unique
              </p>
            </div>
          </dl>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {collection.map((item: any) => {
            const { id, name, createdAt, updatedAt } = item;
            return (
              <div
                key={id}
                className="rounded-lg bg-gray-50 w-full border border-gray-10 py-4 px-2 flex items-between flex-col h-fit"
              >
                <Link
                  href={`/collection/${id}`}
                  className="flex flex-col gap-2 cursor-pointer"
                >
                  <p className=" max-w-full break-all text-center">{name}</p>
                  <div className="flex gap-2 items-center justify-between">
                    <div className="flex gap-2 items-center">
                      <CiCalendar />
                      {new Date(createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2 items-center">
                      <CiClock1 />
                      {new Date(updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
                <div className="flex justify-end mt-3">
                  <MdOutlineDeleteOutline
                    className="text-2xl text-red-500 cursor-pointer"
                    onClick={() => handleCollectionDelete(id)}
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

export default Collection;
