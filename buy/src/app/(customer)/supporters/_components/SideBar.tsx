"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink } from "lucide-react";

const SideBar = () => {
  const [selected, setSelected] = useState("Home");
  const router = useRouter();

  const menuItems = [
    { name: "Home", icon: null, path: "/" },
    {
      name: "View page",
      icon: <ExternalLink className="size-4" />,
      path: "/view-page",
    },
    { name: "Account settings", icon: null, path: "/account-settings" },
  ];

  const handleClick = (item: (typeof menuItems)[0]) => {
    setSelected(item.name);
    router.push(item.path);
  };

  return (
    <div className="flex flex-col gap-1 w-64 ml-20 py-11 h-screen">
      {menuItems.map((item) => (
        <button
          key={item.name}
          onClick={() => handleClick(item)}
          className={`flex items-center px-2 py-2 mr-auto rounded-md hover:bg-gray-200 ${
            selected === item.name ? "bg-gray-200" : ""
          }`}
        >
          <span>{item.name}</span>
          {item.icon && <span className="ml-2">{item.icon}</span>}
        </button>
      ))}
    </div>
  );
};

export default SideBar;
