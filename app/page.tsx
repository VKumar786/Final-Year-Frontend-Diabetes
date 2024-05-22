import Home from "@/views/home";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import React from "react";

const HomePage = async () => {
  const user = await currentUser();

  // const response = await axios.post("/api/user", {
  //   userId: "",
  // });

  // console.log(response);

  return (
    <>
      {/* <button onClick={handleSubmit}>asdlkfjasdkjf</button> */}
      {/* Your additional code goes here */}
      <Home />
    </>
  );
};

export default HomePage;
