import { createClient } from "@/utils/supabase/client";
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

export default async function SalesHistory({ id }: { id: number }) {
  const supabase = createClient();
  const { data: salesData, error } = await supabase
    .from("salesrecord")
    .select()
    .eq("itemid", id);

  return (
    <Table>
      <TableRow>
        <TableHead>Sale Quantity</TableHead>
        <TableHead>Date of Sale</TableHead>
      </TableRow>
      {salesData?.map((data) => (
        <TableRow key={data.id}>
          <TableCell>{data.quantity}</TableCell>
          <TableCell>{data.date}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
}
