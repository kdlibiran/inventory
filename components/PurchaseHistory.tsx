import { Table, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Database } from "@/types/supabase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RemoveStock from "./RemoveStock";
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
        <TableHead className="text-center">Actions</TableHead>
      </TableRow>
      {purchaseData?.map((data) => (
        <TableRow key={data.id}>
          <TableCell>{data.quantity}</TableCell>
          <TableCell>{data.expiry}</TableCell>
          <TableCell>{data.date}</TableCell>
          <TableCell>
            <Dialog>
              <DialogTrigger className="text-red-500">Remove</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Remove Stock</DialogTitle>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
}
