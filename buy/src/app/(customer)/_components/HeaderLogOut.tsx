"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/app/_providers/AuthProvider";

export function HeaderLogOut() {
  const { user, signOut } = useAuth();
  return (
    <Select
      onValueChange={(value) => {
        if (value === "logout") {
          signOut();
        }
      }}
    >
      <SelectTrigger className="w-[180px] border-none shadow-none">
        <div className="flex gap-2 items-center">
          <img src={user?.profile?.avatarImage} className="size-10 rounded" />
          <p className="text-black">{user?.profile?.name}</p>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="logout">Log out</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
