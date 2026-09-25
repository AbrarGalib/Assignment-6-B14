import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-40 text-center px-4">
      <h1 className="text-9xl font-oswald font-bold text-accent mb-4">404</h1>
      <h2 className="text-3xl font-bold uppercase mb-4">Page Not Found</h2>
      <p className="text-gray-400 mb-8 max-w-md">Looks like you lifted a bit too heavy and ended up in unknown territory. Let's get you back to the gym.</p>
      <Link href="/" className="btn bg-accent text-black border-none hover:bg-[#aacc00] px-8 font-bold">
        Back to Home
      </Link>
    </div>
  );
}