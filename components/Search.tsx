"use client";
import { startTransition, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import AddItem from "./AddItem";

export default function Search() {
  let { replace } = useRouter();
  let pathname = usePathname();
  let [isPending, startTransition] = useTransition();

  let handleSearch = (term: string) => {
    let params = new URLSearchParams(window.location.search);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    params.delete("page");

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="flex justify-between w-full">
      <input
        type="text"
        className="w-5/6 border border-gray-300 rounded-md p-2"
        placeholder="Search"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <Dialog>
        <DialogTrigger className="border border-gray-3000 rounded-md p-2 text-slate-600">
          Add Item
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Item</DialogTitle>
          </DialogHeader>
          <AddItem />
        </DialogContent>
      </Dialog>
    </div>
  );
}
