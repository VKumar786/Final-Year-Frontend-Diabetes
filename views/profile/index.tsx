"use client";

import Image from "next/image";
import React, { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PassKey from "./PassKey";
import Loading from "@/components/Loading";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { MdOutlineModeEdit } from "react-icons/md";
import { PiPaperPlaneTilt } from "react-icons/pi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "@/redux/ProfileSlice";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  const [data, setData] = useState({
    imageUrl: auth?.imageUrl || "",
    bio: auth?.bio || "",
  });

  const getUserProfile = useCallback(async () => {
    if (user) {
      const res = await axios.get("/api/user");
      dispatch(setProfile(res.data.user));
    }
  }, [dispatch, user]);

  if (!user) return <Loading />;

  const handleResumeChange = (e: any) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const file = e.target.files[0];

      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        setData({
          ...data,
          [e.target.name]: fileReader.result,
        });
      };

      fileReader.readAsDataURL(file);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      await axios.put("/api/user", data);

      //@ts-ignore
      document.getElementById("my_modal_2").close();
      await getUserProfile();

      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error("Error Updating Profile");
    }
  };

  return (
    <>
      <div className="h-screen bg-gray-200 flex flex-wrap items-center justify-center px-2">
        <div className="container relative lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 shadow-lg transform duration-200 easy-in-out">
          <div
            className=" absolute top-4 right-4 w-10 h-10 bg-white p-2 flex items-center justify-center rounded-full shadow-sm border border-gray-400 cursor-pointer"
            onClick={() => {
              //@ts-ignore
              document.getElementById("my_modal_2").showModal();
            }}
          >
            <MdOutlineModeEdit className=" text-xl" />
          </div>
          <div className=" h-32 overflow-hidden rounded-md">
            <Image
              className="w-full"
              src="https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              width={600}
              height={500}
              alt=""
            />
          </div>
          <div className="flex justify-center px-5 -mt-12 bg-white">
            <Image
              className="h-32 w-32 bg-white p-2 rounded-full   "
              src={
                auth?.imageUrl ||
                "https://avatars.githubusercontent.com/u/33460?v=4"
              }
              width={300}
              height={300}
              alt=""
            />
          </div>
          <div className="bg-white pt-6">
            <div className="text-center px-14">
              <h2 className="text-gray-800 text-3xl font-bold">
                {user?.fullName}
              </h2>
              <div className="text-gray-400 mt-2 hover:text-blue-500">
                {auth?.email}
              </div>
              <p className="mt-2 text-gray-500 text-sm">
                {auth?.bio || "Bio..."}
              </p>
            </div>
            <hr className="mt-6" />
            <PassKey text={auth?.passkey} />
          </div>
        </div>

        {/* Profile Modal */}
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <form
              method="post"
              className="flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Profile Picture</span>
                </div>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  name="imageUrl"
                  onChange={handleResumeChange}
                />
                {data.imageUrl.length !== 0 && (
                  <div className="flex gap-2 items-center">
                    <Image
                      className="w-full mt-3 max-w-16 max-h-16 border border-gray-200 rounded-md"
                      src={data.imageUrl}
                      width={50}
                      height={50}
                      alt=""
                    />
                    Image Preview
                  </div>
                )}
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Bio 🐼</span>
                </div>
                <input
                  type="text"
                  placeholder="Bio..."
                  className="input input-bordered w-full"
                  name="bio"
                  value={data.bio}
                  onChange={(e) => setData({ ...data, bio: e.target.value })}
                />
              </label>
              <button className="btn btn-neutral mt-2" type="submit">
                {isLoading ? (
                  <span className="loading loading-spinner" />
                ) : (
                  <PiPaperPlaneTilt className=" text-xl stroke-1" />
                )}
                Update
              </button>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </>
  );
};

export default Profile;
