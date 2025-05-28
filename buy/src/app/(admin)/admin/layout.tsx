import SideBar from "../_components/SideBar";

export default function LaAdminyout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex lg:w-[1440px] m-auto min-h-[100vh]">
      <SideBar />
      {children}
    </div>
  );
}
