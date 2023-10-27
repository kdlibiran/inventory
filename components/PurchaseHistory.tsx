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

interface PurchaseData {
  id: number;
  itemId: number;
  quantity: number;
  currentQuantity: number;
  expiry: string;
  date: string;
}

export default async function PurchaseHistory({ id }: { id: number }) {
  const supabase = createClient();
  const { data: purchaseData, error } = await supabase
    .from("purchaserecord")
    .select()
    .eq("itemid", id);

  return (
    <Table>
      <TableRow>
        <TableHead>Quantity</TableHead>
        <TableHead>Expiry</TableHead>
        <TableHead>Date of Purchase</TableHead>
      </TableRow>
      {purchaseData?.map((data) => (
        <TableRow key={data.id}>
          <TableCell>{data.quantity}</TableCell>
          <TableCell>{data.expiry}</TableCell>
          <TableCell>{data.date}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
}
