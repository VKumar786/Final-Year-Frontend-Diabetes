import Image from "next/image";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import PassKey from "./PassKey";
import { currentUser } from "@clerk/nextjs/server";
import Loading from "@/components/Loading";

const Profile = async () => {
  const user = await currentUser();

  if (!user) return <Loading />;

  return (
    <>
      <div className="h-screen bg-gray-200 flex flex-wrap items-center justify-center  ">
        <div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 bg-white  shadow-lg    transform   duration-200 easy-in-out">
          <div className=" h-32 overflow-hidden">
            <Image
              className="w-full"
              src="https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              width={600}
              height={500}
              alt=""
            />
          </div>
          <div className="flex justify-center px-5 -mt-12">
            <Image
              className="h-32 w-32 bg-white p-2 rounded-full   "
              src={
                user?.imageUrl ||
                "https://avatars.githubusercontent.com/u/33460?v=4"
              }
              width={300}
              height={300}
              alt=""
            />
          </div>
          <div className=" ">
            <div className="text-center px-14">
              <h2 className="text-gray-800 text-3xl font-bold">
                {user?.fullName}
              </h2>
              <div className="text-gray-400 mt-2 hover:text-blue-500">
                {"@" +
                  (user?.fullName || "")
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, "")}
              </div>
              <p className="mt-2 text-gray-500 text-sm">🐼 My Bio...</p>
            </div>
            <hr className="mt-6" />
            <PassKey text={uuidv4()} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
