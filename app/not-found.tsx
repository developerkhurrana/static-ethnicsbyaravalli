import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-6xl font-extrabold text-[#D9A8A0] mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold text-[#2E1B1B] mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.<br />
        Let&apos;s get you back to beautiful ethnic wear!
      </p>
      <Link href="/" className="inline-block">
        <button className="bg-[#D9A8A0] hover:bg-[#C08478] text-[#2E1B1B] font-semibold px-8 py-3 rounded-full text-lg shadow-lg transition">
          Go to Home
        </button>
      </Link>
    </main>
  );
} 