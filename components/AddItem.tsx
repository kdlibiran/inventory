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
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setLoading(true);
    try {
      const { data, error } = await supabase.from("items").insert([
        {
          name,
          quantity: 0,
          sales: 0,
          price,
          user_id: user?.id,
        },
      ]);
      if (error) throw error;
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
          required
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
          required
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-2 items-center pt-3">
        <button
          type="submit"
          className="border border-gray-300 rounded-md p-2 text-slate-600"
          disabled={loading}
        >
          {loading ? "Loading ..." : "Add Item"}
        </button>
      </div>
    </form>
  );
}
