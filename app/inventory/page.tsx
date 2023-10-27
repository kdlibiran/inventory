import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import InvTable from "@/components/InvTable";
export const dynamic = "force-dynamic";
import Link from "next/link";

type Item = {
  id: number;
  name: string;
  quantity: number;
  sales: number;
  expiry: string;
  price: number;
};

export default async function inventoryPage() {
  const supabase = createClient();
  const { data, error } = await supabase.from("items").select().order("name");

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <div className="space-x-4">
            <Link href="/">Home</Link>
            <Link href="/inventory">Inventory</Link>
          </div>
          {supabase && <AuthButton />}
        </div>
      </nav>
      {supabase && <InvTable data={data as Item[]} />}
    </div>
  );
}
