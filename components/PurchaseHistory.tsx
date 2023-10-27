import { Table, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Database } from "@/types/supabase";

type purchaseData = Database["public"]["Tables"]["purchaserecord"]["Row"];

export default function PurchaseHistory({
  purchaseData,
}: {
  purchaseData: purchaseData[];
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
