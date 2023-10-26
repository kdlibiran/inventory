"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { parse } from "path";

export default function SellItem({ id }: { id: number }) {
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const date = new Date().toLocaleDateString();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: Quantity, error: QuantityError } = await supabase
      .from("items")
      .select("quantity")
      .eq("id", id)
      .single();

    if (QuantityError) throw QuantityError;

    if (parseInt(quantity) > Quantity?.quantity) {
      alert("Not enough stock!");
      return;
    }
    try {
      setLoading(true);
      const { data, error } = await supabase.from("salesrecord").insert([
        {
          itemid: id,
          quantity,
          date,
          user_id: user?.id,
        },
      ]);

      if (error) throw error;

      const { data: itemData, error: itemError } = await supabase
        .from("items")
        .select()
        .eq("id", id)
        .single();

      if (itemError) throw itemError;
      const newQuantity = (itemData?.quantity ?? 0) - parseInt(quantity);
      const newSales = (itemData?.sales ?? 0) + parseInt(quantity);

      //get earliest expiry date from purchase record and its current quantity

      let buffer = parseInt(quantity);
      do {
        let { data: earliestExpiryData, error: earliestExpiryError } =
          await supabase
            .from("purchaserecord")
            .select("id, expiry, currentquantity")
            .eq("itemid", id)
            .order("expiry", { ascending: true })
            .gt("currentquantity", 0)
            .limit(1)
            .single();

        if (earliestExpiryError) throw earliestExpiryError;
        let newCurrentQuantity = 0;

        if (earliestExpiryData?.currentquantity > buffer) {
          newCurrentQuantity = earliestExpiryData?.currentquantity - buffer;
          buffer = 0;
        } else {
          buffer = parseInt(quantity) - earliestExpiryData?.currentquantity;
        }
        console.log(supabase);
        const { error: updatePurchaseError } = await supabase
          .from("purchaserecord")
          .update({
            currentquantity: newCurrentQuantity,
          })
          .eq("id", parseInt(earliestExpiryData?.id));

        if (updatePurchaseError) throw updatePurchaseError;
        console.log(newCurrentQuantity);
      } while (buffer !== 0);

      const { data: earliestExpiryData, error: earliestExpiryError } =
        await supabase
          .from("purchaserecord")
          .select("expiry, currentquantity")
          .eq("itemid", id)
          .order("expiry", { ascending: true })
          .gt("currentquantity", 0)
          .limit(1)
          .single();

      const newExpiry = earliestExpiryData?.expiry ?? null;

      const { error: updateError } = await supabase
        .from("items")
        .update({
          quantity: newQuantity,
          sales: newSales,
          expiry: newExpiry,
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
      <div className="flex flex-col space-y-2 pt-3 items-center">
        <button
          className="bg-red-500 text-white rounded-md py-2 px-4"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Add Sales Record"}
        </button>
      </div>
    </form>
  );
}
