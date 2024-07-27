"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { Input } from "./ui/input";
import { ChevronDown, ChevronUp } from "lucide-react";
import PaginationList from "./PaginationList";

const TransactionList = () => {
  const transactions = useSelector((state) => state.bank.bankStatement);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactions?.slice(indexOfFirstItem, indexOfLastItem);

  function convertDateFormat(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  }

  // Testing
  //   const myData = [
  //     { id: 1, date: "2024-07-26", amount: 10 },
  //     { id: 2, date: "2024-07-24", amount: 20 },
  //     { id: 3, date: "2024-07-28", amount: 30 },
  //   ];

  return (
    <div className="py-4">
      <Input
        className="border-2 border-slate-800 mx-5 my-5 pt-2 max-w-2xl"
        placeholder="Search Result" // Filter result by type
        type="text"
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <Table className="">
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={() =>
                sortOrder === "desc"
                  ? setSortOrder("asce")
                  : setSortOrder("desc")
              }
              className="flex items-center"
            >
              {sortOrder === "desc" ? <ChevronUp /> : <ChevronDown />}
              Date
            </TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems
            ?.filter((value) => {
              if (value === "") {
                console.log("v", value);
                return value;
              } else if (
                value.type?.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                console.log("enter", value);
                return value;
              }
            })
            .sort((a, b) =>
              sortOrder === "desc"
                ? new Date(b.date) - new Date(a.date) // Sort the data based  by date
                : new Date(a.date) - new Date(b.date)
            )
            .map((transaction, i) => (
              <TableRow key={i}>
                <TableCell className="">
                  {convertDateFormat(transaction.date)}
                </TableCell>
                <TableCell>
                  {transaction.type === "deposit" ? "+" : "-"}{" "}
                  {transaction.amount}
                </TableCell>
                <TableCell>{transaction.balance}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <PaginationList
        itemsPerPage={itemsPerPage}
        totalItems={transactions?.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default TransactionList;
