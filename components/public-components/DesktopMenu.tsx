import Link from "next/link";
import { nav } from "../../lib/staticData";

async function DesktopMenu() {
  return (
    <nav className="hidden items-center gap-8 md:flex">
      {nav.map((item) => (
        <Link
          key={item.href}
          className="text-sm font-medium text-slate-700 transition hover:text-[var(--primary)]"
          href={item.href}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export default DesktopMenu;
