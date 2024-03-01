"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function AddItem() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const supabase = createClient();
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    try {
      const { data, error } = await supabase.from("items").insert([
        {
          name,
          category,
          quantity: 0,
          sales: 0,
          price,
          store_id: user?.user_metadata?.store_id,
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
          className="h-11 rounded-md border border-gray-300"
          required
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="name">Category</label>
        <input
          className="h-11 rounded-md border border-gray-300"
          required
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="price">Price</label>
        <input
          className="h-11 rounded-md border border-gray-300"
          required
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-center space-y-2 pt-3">
        <button
          type="submit"
          className="rounded-md border border-gray-300 p-2 text-slate-600"
          disabled={loading}
        >
          {loading ? "Loading ..." : "Add Item"}
        </button>
      </div>
    </form>
  );
}
