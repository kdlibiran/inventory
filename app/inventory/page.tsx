import AuthButton from "@/components/AuthButton";
import InvTable from "@/components/InvTable";
export const dynamic = "force-dynamic";
import Link from "next/link";
import { Database } from "@/types/supabase";
import { getItems } from "@/utils/supabase/supabase-server";

type Item = Database["public"]["Tables"]["items"]["Row"];
type purchaseData = Database["public"]["Tables"]["purchaserecord"]["Row"];
type salesData = Database["public"]["Tables"]["salesrecord"]["Row"];

export default async function inventoryPage() {
  const data = await getItems();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <div className="space-x-4">
            <Link href="/">Home</Link>
            <Link href="/inventory">Inventory</Link>
          </div>
          {data && <AuthButton />}
        </div>
      </nav>
      {data && <InvTable data={data as Item[]} />}
    </div>
  );
}
