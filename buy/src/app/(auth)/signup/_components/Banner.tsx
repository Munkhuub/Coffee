import { CoffeeIcon } from "lucide-react";
import React from "react";

const Banner = () => {
  return (
    <div className="w-[50%] bg-[#FBBF24] h-screen px-20">
      <div className="flex items-center gap-2 mt-8">
        <CoffeeIcon className="size-5" />
        <p className="text-xl font-bold">Buy Me Coffee</p>
      </div>

      <div className="h-full flex flex-col items-center justify-center gap-10">
        <img src="./images/coffee.png" className="size-60" />
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-2xl font-bold">Fund your creative work</h2>
          <p>
            Accept support. Start a membership. Setup a shop. It’s easier than
            you think.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
