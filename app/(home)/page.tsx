import Dashboard from "@/components/Dashboard";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
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
    <div className="flex h-screen w-full flex-1 flex-col items-center">
      <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b">
        <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
          <div className="space-x-4">
            <Link href="/">Inventory System</Link>
          </div>
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>
      <div className="flex h-full items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Inventory Management</h1>
          <p className="mb-6 text-lg text-gray-600">
            Streamline your business operations with our Inventory Management
            System. Keep track of products, know when to restock, know when to
            order more, and know when products will expire.
          </p>
        </div>
      </div>
    </div>
  );
}
