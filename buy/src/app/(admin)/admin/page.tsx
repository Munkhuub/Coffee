"use client";
import React from "react";
import Header from "../_components/Header";
import SideBar from "../_components/SideBar";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { SelectDays } from "../_components/SelectDays";
import { SelectAmount } from "../_components/SelectAmount";

const page = () => {
  return (
    <div className="w-full">
      <Header />
      <SideBar />
      <div>
        <div className="flex justify-between">
          <div className="flex gap-3">
            <img className="size-12 rounded-full bg-black" />
            <div>
              <h5 className="font-bold">Jake</h5>
              <p className="text-[14px]">buymeacoffee.com/baconpancakes1</p>
            </div>
          </div>
          <Button className="flex gap-2">
            <CopyIcon />
            <p>Share page link</p>
          </Button>
        </div>
        <div className="border-t border-[#E4E4E7] w-full"></div>
        <div>
          <div>
            <h3>Earnings</h3>
            <SelectDays />
          </div>
          <p className="text-4xl font-bold">$450</p>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <h5>Recent transactions</h5>
          <SelectAmount />
        </div>
        <div>
          <div className="flex gap-3">
            <img className="size-12 rounded-full bg-black" />
            <div>
              <h5 className="font-bold">Jake</h5>
              <p className="text-[14px]">instagram.com/welesley</p>
            </div>
          </div>
          <div>
            <p className="font-bold">+ $1</p>
            <p className="text-[#71717A] text-xs">10 hours ago</p>
          </div>
        </div>
        <p>
          Thank you for being so awesome everyday! You always manage to brighten
          up my day when I’m feeling down. Although $1 isn’t that much money
          it’s all I can contribute at the moment{" "}
        </p>
      </div>
    </div>
  );
};

export default page;
