"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
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
export default function Dashboard() {
  const supabase = createClient();
  const [lowStock, setLowStock] = useState<Item[]>([]);
  const [nearExpiry, setNearExpiry] = useState<Item[]>([]);
  const [topSales, setTopSales] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data: lowStockData, error: lowStockError } = await supabase
        .from("items")
        .select()
        .order("quantity", { ascending: true })
        .limit(5);

      if (lowStockError) throw lowStockError;
      setLowStock(lowStockData);

      const { data: nearExpiryData, error: nearExpiryError } = await supabase
        .from("items")
        .select()
        .order("expiry", { ascending: true })
        .limit(5);

      if (nearExpiryError) throw nearExpiryError;
      setNearExpiry(nearExpiryData);

      const { data: topSalesData, error: topSalesError } = await supabase
        .from("items")
        .select()
        .order("sales", { ascending: false })
        .limit(5);

      if (topSalesError) throw topSalesError;
      setTopSales(topSalesData);

      setLoading(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <div>Loading...</div>;

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
              {lowStock.map((item) => (
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
              {nearExpiry.map((item) => (
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
              {topSales.map((item) => (
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
