import Link from "next/link";

const links = [
  { href: "/", label: "Overview" },
  { href: "/cache-components", label: "Cache Components" },
  { href: "/async-apis/hello-world", label: "Async APIs" },
  { href: "/react-features", label: "React 19.2" },
  { href: "/admin", label: "proxy.ts" },
];

export default function Nav() {
  return (
    <header className="border-b border-black/10 dark:border-white/15">
      <nav className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4 text-sm">
        <Link href="/" className="font-semibold tracking-tight">
          Next.js 16 ▲ Demo
        </Link>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-neutral-600 dark:text-neutral-300">
          {links.slice(1).map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-foreground hover:underline">
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
