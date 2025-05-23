import { useState } from "react";
import { ExternalLink } from "lucide-react";

const SideBar = () => {
  const [selected, setSelected] = useState("Home");

  const menuItems = [
    { name: "Home", icon: null },
    { name: "Explore", icon: null },
    { name: "View page", icon: <ExternalLink className="size-4" /> },
    { name: "Account settings", icon: null },
  ];

  return (
    <div className="flex flex-col gap-1 w-64 ml-20 py-11 h-screen">
      {menuItems.map((item) => (
        <button
          key={item.name}
          onClick={() => setSelected(item.name)}
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
