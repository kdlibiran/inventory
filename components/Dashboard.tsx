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

  const { data: lowStock, error: lowStockError } = await supabase
    .from("items")
    .select()
    .gte("quantity", 0)
    .order("quantity", { ascending: true })
    .limit(5);

  const { data: nearExpiry, error: nearExpiryError } = await supabase
    .from("items")
    .select()
    .order("expiry", { ascending: true })
    .limit(5);

  const { data: topSales, error: topSalesError } = await supabase
    .from("items")
    .select()
    .gte("sales", 0)
    .order("sales", { ascending: false })
    .limit(5);

  return (
    <div className="grid grid-cols-6 gap-4 w-max">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Low Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lowStock?.map((item: Item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Near Expiry</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Expiry</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nearExpiry?.map((item: Item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.expiry}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Top Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Sales</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topSales?.map((item: Item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.sales}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
