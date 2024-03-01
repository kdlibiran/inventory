import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const store = String(formData.get("store"));
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
      data: {
        store: store,
      },
    },
  });

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=Could not authenticate user`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      },
    );
  }

  const { data, error: storeError } = await supabase
    .from("stores")
    .insert([{ name: store }])
    .select("id");
  if (storeError) {
    console.log(storeError);
  }
  if (data) {
    const { data: userData, error: userError } = await supabase.auth.updateUser(
      {
        data: { store_id: data[0]?.id },
      },
    );
    if (userError) {
      console.log(userError);
    }
  }
  return NextResponse.redirect(`${requestUrl.origin}/home`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
