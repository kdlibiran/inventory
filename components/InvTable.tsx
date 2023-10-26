import { createClient } from "@/utils/supabase/server";
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

interface Item {
  id: number;
  name: string;
  quantity: number;
  sales: number;
  expiry: string;
  price: number;
}

export default function InvTable({ items }: { items: Item[] }) {
  return (
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
  );
}
