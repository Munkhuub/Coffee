import React from "react";
import countries from "world-countries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";

type Country = {
  cca2: string; // 2-letter country code
  cca3: string; // 3-letter country code
  name: {
    common: string;
    official: string;
  };
};

const SelectCountry = () => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          {countries.map((country, i) => (
            <SelectItem value={country.cca2} key={i}>
              {country.name.common}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectCountry;
