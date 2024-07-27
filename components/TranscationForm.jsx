"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { deposit, transfer, withdraw } from "@/lib/features/bank/bankSlice";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";

const TranscationForm = ({ text, isIban = false }) => {
  const [amount, setAmount] = useState(0);
  const [iban, setIban] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const validateIBAN = (iban) => {
    if (iban.length >= 15 && iban.length <= 34) {
      return true;
    } else {
      setError(true);
      return false;
    }
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const today = new Date();
  const date = formatDate(today);

  const handleTransaction = (text) => {
    console.log(text.toLowerCase());
    if (amount > 0 && text.toLowerCase() === "deposit") {
      const type = "deposit";
      const newTransaction = { date, type, amount };
      console.log("s", newTransaction);
      dispatch(deposit(newTransaction));
      setAmount(0);
      router.push("/");
    } else if (amount > 0 && text.toLowerCase() === "withdraw") {
      const type = "withdraw";
      const newTransaction = { date, type, amount };
      console.log("s", newTransaction);
      dispatch(withdraw(newTransaction));
      setAmount(0);
      router.push("/");
    } else if (
      amount > 0 &&
      text.toLowerCase() === "transfer" &&
      validateIBAN(iban)
    ) {
      const type = "transfer";
      const newTransaction = { date, type, amount, iban };
      console.log("s", newTransaction);
      dispatch(transfer(newTransaction));
      setAmount(0);
      setIban("");
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col justify-evenly items-center px-20 max-w-2xl mx-auto mt-28 shadow-2xl bg-white rounded-md  min-h-52">
      <h1 className="text-lg font-semibold">{text}</h1>
      <Input
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        type="number"
        required
        value={amount}
        placeholder="Enter Amount"
      />
      {isIban && (
        <Input
          onChange={(e) => setIban(e.target.value)}
          type="number"
          required
          value={iban}
          placeholder="Enter iban account number"
        />
      )}
      <Button onClick={() => handleTransaction(text)}>{text}</Button>
      {error && (
        <Alert className="m-2" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>InCorrect IBan no</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default TranscationForm;
