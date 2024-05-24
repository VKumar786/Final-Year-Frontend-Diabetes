"use client";

import React from "react";
import toast from "react-hot-toast";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

const PassKey = ({ text }: { text: string }) => {
  return (
    <div
      className="flex bg-gray-50"
      onClick={() => {
        toast.success("PassKey Copied to clipboard");
        window.navigator.clipboard.writeText(text);
      }}
    >
      <div className="flex justify-between items-center p-4 w-full hover:bg-gray-100 cursor-pointer flex-wrap flex-col sm:flex-row">
        <span className="font-semibold">PassKey </span>
        <p>{text}</p>
        <HiOutlineClipboardDocumentList className=" text-2xl" />
      </div>
    </div>
  );
};

export default PassKey;
