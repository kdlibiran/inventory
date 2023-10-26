import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import InvTable from "@/components/InvTable";
export const dynamic = "force-dynamic";
import Link from "next/link";
import Search from "@/components/Search";
import { ScrollArea } from "@/components/ui/scroll-area";
type searchParams = {
  search: string;
};
type Item = {
  id: number;
  name: string;
  quantity: number;
  sales: number;
  expiry: string;
  price: number;
};

export default async function inventoryPage({
  searchParams,
}: {
  searchParams: searchParams;
}) {
  const search = searchParams.search ?? "";
  const supabase = createClient();
  const { data: items, error } = await supabase
    .from("items")
    .select()
    .ilike("name", `${search}%`)
    .order("name", { ascending: true });

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
      <div className="w-full max-w-[70rem] flex flex-col gap-5 items-center pb-10">
        {supabase && <Search />}
        <ScrollArea className="w-full max-h-screen h-[525 px]">
          {supabase && <InvTable items={items as Item[]} />}
        </ScrollArea>
      </div>
    </div>
  );
}
