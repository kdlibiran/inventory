"use client";
import { createClient } from "@/utils/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalesHistory from "./SalesHistory";
import PurchaseHistory from "./PurchaseHistory";
import AddItem from "./AddItem";
import PurchaseItem from "./PurchaseItem";
import SellItem from "./SellItem";
import { use, useEffect, useState } from "react";
interface Item {
  id: number;
  name: string;
  quantity: number;
  sales: number;
  expiry: string;
  price: number;
}

export default function InvTable() {
  const [name, setName] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const getItems = async () => {
    const supabase = createClient();
    const { data: items, error } = await supabase
      .from("items")
      .select()
      .ilike("name", `%${name}%`)
      .order("name", { ascending: true });
    if (error) {
      console.error(error);
    } else {
      setItems(items || []);
    }
  };

  useEffect(() => {
    getItems();
  }, [name]);

  return (
    <div className="flex-1 flex flex-col gap-5 items-center max-w-5xl w-full">
      <div className="flex justify-between w-full">
        <input
          type="text"
          className="w-5/6 border border-gray-300 rounded-md p-2"
          placeholder="Search"
          onChange={(e) => {
            setName(e.target.value);
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-center">Sales</TableHead>
            <TableHead className="text-center">Expiry Date</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items &&
            items?.map((item) => (
              <TableRow key={item.id}>
                <Dialog>
                  <TableCell className="font-medium">
                    <DialogTrigger className="text-left">
                      {item.name}
                    </DialogTrigger>
                  </TableCell>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{item.name} History</DialogTitle>
                    </DialogHeader>
                    <Tabs defaultValue="Purchase" className="w-[400px]">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="Purchase">Purchase</TabsTrigger>
                        <TabsTrigger value="Sales">Sales</TabsTrigger>
                      </TabsList>
                      <TabsContent value="Purchase">
                        <Card>
                          <CardHeader>
                            <CardTitle>Purchase History</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <PurchaseHistory id={item.id} />
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="Sales">
                        <Card>
                          <CardHeader>
                            <CardTitle>Sales History</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <SalesHistory id={item.id} />
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
                <TableCell className="text-center">{item.quantity}</TableCell>
                <TableCell className="text-center">{item.sales}</TableCell>
                <TableCell className="text-center">
                  {item.expiry ? item.expiry : "N/A"}
                </TableCell>
                <TableCell className="text-center">Php {item.price}</TableCell>
                <TableCell className="space-x-4 text-right">
                  <Dialog>
                    <DialogTrigger className="text-blue-500">
                      Restock
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Purchase Item</DialogTitle>
                      </DialogHeader>
                      <DialogDescription>Item: {item.name}</DialogDescription>
                      <PurchaseItem id={item.id} />
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger className="text-red-500">Sell</DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Sell Item</DialogTitle>
                      </DialogHeader>
                      <DialogDescription>Item: {item.name}</DialogDescription>
                      <SellItem id={item.id} />
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
