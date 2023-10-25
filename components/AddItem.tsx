"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function AddItem() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const supabase = createClient();
    try {
      setLoading(true);
      const { data, error } = await supabase.from("items").insert([
        {
          name,
          quantity: 0,
          sales: 0,
          price,
        },
      ]);
      if (error) throw error;
      alert("Item added successfully!");
      setName("");
      setPrice("");
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
        <label htmlFor="name">Name</label>
        <input
          className="border border-gray-300 rounded-md h-11"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="price">Price</label>
        <input
          className="border border-gray-300 rounded-md h-11"
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-2 items-center pt-3">
        <input
          type="submit"
          value="Add Item"
          className="border border-gray-300 rounded-md p-2 text-slate-600"
        />
      </div>
    </form>
  );
}
