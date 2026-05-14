import Link from "next/link";

export function Header() {
  return (
    <header className="bg-white border-b border-slate-200 h-24 flex items-center justify-center px-4 sm:px-6 md:px-8">
      <Link href="/" className="inline-flex items-center" aria-label="Southbank Investment Research — Home">
        <img
          src="/sir-logo.png"
          alt="Southbank Investment Research"
          className="h-14 w-auto block"
        />
      </Link>
    </header>
  );
}
