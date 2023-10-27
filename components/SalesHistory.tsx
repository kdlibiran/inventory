import { Table, TableCell, TableHead, TableRow } from "@/components/ui/table";

interface SaleData {
  id: number;
  itemid: number;
  quantity: number;
  date: string;
}

export default function SalesHistory({ salesData }: { salesData: SaleData[] }) {
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
