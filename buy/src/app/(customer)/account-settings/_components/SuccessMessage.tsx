import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const SuccessMessage = () => {
  return (
    <div className="w-[650px] flex flex-col gap-6  rounded-lg border border-[#E4E4E7] p-6">
      <h4>SuccessMessage</h4>
      <div>
        <p>Confirmation message</p>
        <Textarea />
      </div>
      <Button>Save changes</Button>
    </div>
  );
};

export default SuccessMessage;
