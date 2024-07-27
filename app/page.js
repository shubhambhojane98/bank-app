import TransactionList from "@/components/TransactionList";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 bg-blue-400">
      <div className="bg-white max-w-5xl py-20 mx-auto mt-20 rounded-md  shadow-md">
        <h1 className="text-center mb-10 font-semibold text-xl text-blue-600 ">
          Banking App
        </h1>
        <div className="flex flex-row justify-evenly">
          <Button>
            <Link href="/deposit">Deposit</Link>
          </Button>
          <Button>
            <Link href="/withdraw">Withdraw</Link>
          </Button>
          <Button>
            <Link href="/transfer">Transfer</Link>
          </Button>
        </div>
      </div>
      <div className="mx-auto max-w-5xl mt-10 bg-white">
        <TransactionList />
      </div>
    </main>
  );
}
