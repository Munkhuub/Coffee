"use client";

import SideBar from "../_components/SideBar";
import ProfileSettings from "./_components/ProfileSettings";

export default function Home() {
  return (
    <div className="w-full flex">
      <SideBar />
      <div>
        <ProfileSettings />
      </div>
    </div>
  );
}
