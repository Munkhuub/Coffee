"use client";
import AdminProfile from "./_components/AdminProfile";
import Transactions from "./_components/Transactions";
import SideBar from "./_components/SideBar";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("API Error:", err));
  }, []);
  return (
    <div className="w-full flex">
      <SideBar />
      <div className="flex flex-col gap-8 pt-11 w-full px-8 md:px-20">
        <AdminProfile />
        <Transactions />
      </div>
    </div>
  );
}
