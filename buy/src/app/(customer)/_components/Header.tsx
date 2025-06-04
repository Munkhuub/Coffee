import { CoffeeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { HeaderLogOut } from "./HeaderLogOut";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-20 py-2">
      <Link href={"/"}>
        <div className="flex items-center gap-2">
          <CoffeeIcon className="size-5" />
          <p className="text-xl font-bold">Buy Me Coffee</p>
        </div>
      </Link>

      <HeaderLogOut />
    </div>
  );
};

export default Header;
