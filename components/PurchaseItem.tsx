"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function PurchaseItem({ id }: { id: number }) {
  const [quantity, setQuantity] = useState("");
  const [expiry, setExpiry] = useState("");
  const [loading, setLoading] = useState(false);
  const date = new Date().toLocaleDateString();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    try {
      setLoading(true);
      const { data, error } = await supabase.from("purchaserecord").insert([
        {
          itemid: id,
          quantity,
          currentquantity: quantity,
          expiry,
          date,
          user_id: user?.id,
        },
      ]);

      if (error) throw error;

      const { data: earliestExpiryData, error: earliestExpiryError } =
        await supabase
          .from("purchaserecord")
          .select("expiry")
          .eq("itemid", id)
          .order("expiry", { ascending: true })
          .gt("currentquantity", 0)
          .limit(1)
          .single();

      if (earliestExpiryError) throw earliestExpiryError;

      const { data: itemData, error: itemError } = await supabase
        .from("items")
        .select("quantity")
        .eq("id", id)
        .single();

      if (itemError) throw itemError;
      const newExpiry = earliestExpiryData?.expiry ?? "";
      const newQuantity = (itemData?.quantity ?? 0) + parseInt(quantity);

      const { data: update, error: updateError } = await supabase
        .from("items")
        .update({
          expiry: newExpiry,
          quantity: newQuantity,
        })
        .eq("id", id);

      if (updateError) throw updateError;

      window.location.reload();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-2">
        <label htmlFor="quantity">Quantity</label>
        <input
          className="border border-gray-300 rounded-md h-11"
          required
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="expiry">Expiry</label>
        <input
          className="border border-gray-300 rounded-md h-11"
          required
          type="date"
          id="expiry"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-2 pt-3 items-center">
        <button
          className="bg-blue-500 text-white rounded-md h-11"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Add Purchase Record"}
        </button>
      </div>
    </form>
  );
}
