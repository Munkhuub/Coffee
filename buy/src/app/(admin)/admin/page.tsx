"use client";
import React from "react";
import Header from "../_components/Header";
import Transactions from "../_components/Transactions";
import AdminProfile from "../_components/AdminProfile";

const page = () => {
  return (
    <div className="w-full ">
      <Header />
      <div className="flex flex-col gap-8 pt-11 pl-20">
        <AdminProfile />
        <Transactions />
      </div>
    </div>
  );
};

export default page;
