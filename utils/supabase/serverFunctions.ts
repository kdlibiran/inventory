import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
  sales: number;
  expiry: string;
}

export async function getLowStock(): Promise<Item[]> {
  const { data: lowStock, error: lowStockError } = await supabase
    .from("items")
    .select()
    .order("quantity", { ascending: true })
    .gte("quantity", 0)
    .limit(5);

  if (lowStockError) throw lowStockError;
  return lowStock as Item[];
}

export async function getNearExpiry(): Promise<Item[]> {
  const { data: nearExpiry, error: nearExpiryError } = await supabase
    .from("items")
    .select()
    .order("expiry", { ascending: true })
    .limit(5);

  if (nearExpiryError) throw nearExpiryError;
  return nearExpiry as Item[];
}

export async function getTopSales(): Promise<Item[]> {
  const { data: topSales, error: topSalesError } = await supabase
    .from("items")
    .select()
    .order("sales", { ascending: false })
    .gte("sales", 0)
    .limit(5);

  if (topSalesError) throw topSalesError;
  return topSales as Item[];
}
