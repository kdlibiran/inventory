"use client";

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
  itemid: number;
  quantity: number;
  currentquantity: number;
  expiry: string;
  date: string;
}

export default function PurchaseHistory({
  purchaseData,
}: {
  purchaseData: PurchaseData[];
}) {
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
