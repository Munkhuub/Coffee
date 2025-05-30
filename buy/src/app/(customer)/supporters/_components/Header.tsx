import { Button } from "@/components/ui/button";
import { CoffeeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-20 py-2">
      <Link href={"/"}>
        <div className="flex items-center gap-2">
          <CoffeeIcon className="size-5" />
          <p className="text-xl font-bold">Buy Me Coffee</p>
        </div>
      </Link>

      <Button className="bg-[#F4F4F5] text-black h-10">Log out</Button>
    </div>
  );
};

export default Header;
