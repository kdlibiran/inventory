import Link from "next/link";
import Messages from "./messages";

export default function Login() {
  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <Link
        href="/"
        className="text-foreground bg-btn-background hover:bg-btn-background-hover group absolute left-8 top-8 flex items-center rounded-md px-4 py-2 text-sm no-underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      <form
        className="text-foreground flex w-full flex-1 flex-col justify-center gap-2"
        action="/auth/sign-up"
        method="post"
      >
        <label className="text-md" htmlFor="store">
          Store Name
        </label>
        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          name="store"
          placeholder="Example Store"
          required
        />
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button className="text-foreground mb-2 rounded-md border px-4 py-2">
          Sign Up
        </button>
        <span className="text-center font-thin">
          {" "}
          Do you have an account?{" "}
          <Link href="/login" className="font-extrabold">
            Login
          </Link>
        </span>
        <Messages />
      </form>
    </div>
  );
}
