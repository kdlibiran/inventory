"use client";
import { useState, useEffect } from "react";
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

export default function InvTable() {
  const [addOpen, setAddOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  interface Item {
    id: number;
    name: string;
    quantity: number;
    sales: number;
    expiry: string;
    price: number;
  }

  const fetchItems = async () => {
    const supabase = createClient();
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("items")
        .select()
        .ilike("name", `${name}%`)
        .order("name", { ascending: true });

      if (error) throw error;
      setItems(data);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [name, addOpen]);

  return (
    <div className="w-full max-w-5xl flex flex-col gap-20 items-center">
      <div className="flex justify-between w-full">
        <input
          type="text"
          className="w-5/6 border border-gray-300 rounded-md p-2"
          placeholder="Search"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
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
            <TableHead>Quantity</TableHead>
            <TableHead>Sales</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!loading &&
            items?.map((item) => (
              <TableRow key={item.id}>
                <Dialog>
                  <TableCell className="font-medium">
                    <DialogTrigger>{item.name}</DialogTrigger>
                  </TableCell>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{item.name}</DialogTitle>
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
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.sales}</TableCell>
                <TableCell>{item.expiry}</TableCell>
                <TableCell>Php {item.price}</TableCell>
                <TableCell className="space-x-4 text-right">
                  <Dialog>
                    <DialogTrigger className="text-blue-500">
                      Purchase
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
