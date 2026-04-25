"use client";
import { MobileMenuProps } from "../layout/marketing-header";

function MobileBtn({ isMobileMenuOpen, setIsMobileMenuOpen }: MobileMenuProps) {
  return (
    <button
      className="p-2 text-slate-600 transition hover:text-[var(--primary)] md:hidden"
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      aria-label="Toggle mobile menu"
    >
      {isMobileMenuOpen ? (
        // Close Icon (X)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        // Hamburger Icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      )}
    </button>
  );
}

export default MobileBtn;
