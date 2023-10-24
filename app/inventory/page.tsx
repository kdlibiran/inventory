import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import InvTable from "@/components/InvTable";
export const dynamic = "force-dynamic";
import Link from "next/link";

const canInitSupabaseClient = () => {
  try {
    createClient();
    return true;
  } catch (e) {
    return false;
  }
};

export default async function Index() {
  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <div className="space-x-4">
            <Link href="/">Home</Link>
            <Link href="/inventory">Inventory</Link>
          </div>
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>
      {isSupabaseConnected && <InvTable />}
    </div>
  );
}
