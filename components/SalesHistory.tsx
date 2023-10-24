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

interface SaleData {
  id: number;
  itemId: number;
  quantity: number;
  date: string;
}

export default function SalesHistory({ id }: { id: number }) {
  const supabase = createClient();
  const [salesData, setSalesData] = useState<SaleData[]>([]);

  const fetchSales = async () => {
    try {
      const { data, error } = await supabase
        .from("salesrecord")
        .select()
        .eq("itemid", id);
      if (error) throw error;
      setSalesData(data || []);
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <Table>
      <TableRow>
        <TableHead>Sale Quantity</TableHead>
        <TableHead>Date of Sale</TableHead>
      </TableRow>
      {salesData.map((data) => (
        <TableRow key={data.id}>
          <TableCell>{data.quantity}</TableCell>
          <TableCell>{data.date}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
}
