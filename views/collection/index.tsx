import Image from "next/image";
import React from "react";
import { IoMdAdd } from "react-icons/io";

const Collection = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-12 sm:px-6 sm:py-16 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div className="flex flex-col items-start h-full">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Collection
          </h2>
          <p className="mt-4 text-gray-500">A track group of related data.</p>
          <dl className="w-full mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">Total Tracks</dt>
              <dd className="mt-2 text-sm text-gray-500">100</dd>
            </div>
            <div className="pt-4">
              <div className="rounded-lg bg-gray-50 w-full border border-dashed border-gray-400 h-20 flex items-center justify-center text-xl gap-1 cursor-pointer">
                <IoMdAdd className="text-3xl" />
                Collection
              </div>
            </div>
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <div className="rounded-lg bg-gray-100 w-full border border-dashed border-gray-400 h-56" />
        </div>
      </div>
    </div>
  );
};

export default Collection;
