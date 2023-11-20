import { createClient } from "./server";

export async function getItems() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("items")
    .select("*, purchaserecord(*), salesrecord(*)")
    .order("name");
  if (error) throw error;
  return data;
}

export async function deleteItem(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase.from("items").delete().eq("id", id);
  if (error) throw error;
  return data;
}
