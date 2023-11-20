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
    <div className="flex-1 w-full flex flex-col items-center h-screen">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <div className="space-x-4">
            <Link href="/">Inventory System</Link>
          </div>
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>
      <div className="bg-gray-100 h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Inventory Management</h1>
          <p className="text-gray-600 mb-6 text-lg">
            Streamline your business operations with our Inventory Management
            System. Keep track of products, manage categories, and generate
            insightful reports seamlessly.
          </p>
        </div>
      </div>
    </div>
  );
}
