import { createClient } from "@/utils/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
  sales: number;
  expiry: string;
}

export default async function Dashboard() {
  const supabase = createClient();

  const { data, error } = await supabase.from("items").select();
  const lowStock = data
    ?.filter((item: Item) => item.quantity >= 0)
    .sort((a: Item, b: Item) => a.quantity - b.quantity)
    .slice(0, 8);
  const nearExpiry = data
    ?.filter((item: Item) => item.expiry)
    .sort((a: Item, b: Item) => a.expiry.localeCompare(b.expiry))
    .slice(0, 8);
  const topSales = data
    ?.filter((item: Item) => item.sales > 0)
    .sort((a: Item, b: Item) => b.sales - a.sales)
    .slice(0, 8);

  return (
    <div className="flex flex-col gap-4 w-max md:flex-row">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Low Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lowStock?.map((item: Item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Near Expiry</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-center">Expiry</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nearExpiry?.map((item: Item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-center">{item.expiry}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Top Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-center">Sales</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topSales?.map((item: Item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-center">{item.sales}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
