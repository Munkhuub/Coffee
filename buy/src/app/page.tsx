import Image from "next/image";
import Header from "./(admin)/_components/Header";
import { Button } from "@/components/ui/button";
import { CameraIcon, CoffeeIcon } from "lucide-react";
import HeartIcon from "./(customer)/_components/assets/HeartIcon";
import Donation from "./(customer)/_components/Donation";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="h-[319px] w-full bg-[#F4F4F5] flex items-center justify-center">
        <Button className="flex gap-2 ">
          <CameraIcon />
          <p>Add a cover image</p>
        </Button>
      </div>
      <div className="flex px-20 mt-[-85px] w-full  gap-5">
        <div className="w-[50%] flex flex-col gap-5">
          <div className="bg-white p-6 rounded-lg border border-[#F4F4F5]">
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <img className="size-12 rounded-full bg-black" />
                <h5 className="font-bold">Jake</h5>
              </div>
              <Button className="flex gap-2 bg-[#F4F4F5] text-black  hover:bg-[#e0e0e0]">
                Edit page
              </Button>
            </div>
            <div className="border-t border-[#E4E4E7] w-full my-4"></div>
            <h5 className="font-semibold">About Jake</h5>
            <p className="text-[14px]">
              I’m a typical person who enjoys exploring different things. I also
              make music art as a hobby. Follow me along.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-[#F4F4F5]">
            <h5 className="font-semibold">Social media URL</h5>
            <p className="text-[14px]">https://buymeacoffee.com/spacerulz44</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-[#F4F4F5] flex flex-col gap-3">
            <h5 className="font-semibold">Recent Supporters</h5>
            <div className="h-[140px] w-full flex flex-col gap-1 justify-center items-center border border-[#F4F4F5] rounded-lg">
              <HeartIcon />
              <p className="font-semibold">Be the first one to support Jake</p>
            </div>
          </div>
        </div>
        <Donation />
      </div>
    </div>
  );
}
