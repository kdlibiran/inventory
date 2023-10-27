import { createClient } from "./server";

export async function getItems() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .order("name");
  if (error) throw error;
  return data;
}

export async function getPurchaseData() {
  const supabase = createClient();
  const { data, error } = await supabase.from("purchaserecord").select("*");
  if (error) throw error;
  return data;
}

export async function getSalesData() {
  const supabase = createClient();
  const { data, error } = await supabase.from("salesrecord").select("*");
  if (error) throw error;
  return data;
}
