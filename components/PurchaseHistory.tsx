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

interface PurchaseData {
  id: number;
  itemId: number;
  quantity: number;
  currentQuantity: number;
  expiry: string;
  date: string;
}

export default function PurchaseHistory({ id }: { id: number }) {
  const supabase = createClient();
  const [purchaseData, setPurchaseData] = useState<PurchaseData[]>([]);

  const fetchPurchase = async () => {
    try {
      const { data, error } = await supabase
        .from("purchaserecord")
        .select()
        .eq("itemid", id);
      if (error) throw error;
      setPurchaseData(data || []);
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchPurchase();
  }, []);

  return (
    <Table>
      <TableRow>
        <TableHead>Quantity</TableHead>
        <TableHead>Expiry</TableHead>
        <TableHead>Date of Purchase</TableHead>
      </TableRow>
      {purchaseData.map((data) => (
        <TableRow key={data.id}>
          <TableCell>{data.quantity}</TableCell>
          <TableCell>{data.expiry}</TableCell>
          <TableCell>{data.date}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
}
