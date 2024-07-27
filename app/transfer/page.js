import TranscationForm from "@/components/TranscationForm";
import React from "react";

const Transfer = () => {
  const isIban = true;
  return (
    <div className="bg-blue-400 min-h-screen">
      <TranscationForm isIban={isIban} text="Transfer" />
    </div>
  );
};

export default Transfer;
